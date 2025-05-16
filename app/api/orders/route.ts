import Order from "@/models/order";
import Product from "@/models/product"; // Make sure this path is correct
import connectMongo from "../db";
import { decodeToken } from "@/lib/server-utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = req.headers.get("Authorization") || "";
  try {
    const { isValid, user } = decodeToken(token);
    if (!isValid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { shippingDetails, paymentMethod, items, total } = body;

    if (!shippingDetails || !paymentMethod || !items || !total) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectMongo();

    // Create new order
    const order = await Order.create({
      userId: user.id,
      shippingDetails,
      paymentMethod,
      items: items.map((item: any) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        count: item.count,
        image: item.images[0],
      })),
      total,
      status: "pending",
    });

    // Update product stock based on order items
    for (const item of items) {
      const res = await Product.findByIdAndUpdate(
        item.id,
        { $inc: { count: -item.count } }, // adjust "stock" to your actual field name
        { new: true }
      );
      console.log(res, "res");
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization") || "";
  try {
    const { isValid, user } = decodeToken(token);
    if (!isValid || !user.is_Admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const query = req.nextUrl.searchParams; // Default page and limit

    await connectMongo();
    const searchQuery = query.get("search");
    console.log(searchQuery, "searchQuery");
    const paginationObj = {
      limit: Number(query.get("limit")),
      skip: Number(query.get("skip")),
      sort: { createdAt: -1 }, // Sorts by createdAt field in descending order
    };
    let orders, ordersCount;
    if (searchQuery) {
      const searchRegex = searchQuery ? new RegExp(searchQuery, "i") : null; // Create a regex for case-insensitive search
      orders = await Order.find(
        {
          $or: [{ userId: searchRegex }],
        },
        null,
        paginationObj
      ).exec();
      ordersCount = await Order.countDocuments({
        $or: [{ userId: searchRegex }],
      }).exec();
      // console.log(Order, " searchQuery", searchQuery);
    } else {
      orders = await Order.find({}, null, paginationObj);
      ordersCount = await Order.countDocuments({});
    }

    if (orders) {
      return NextResponse.json({ orders, ordersCount });
    }
    return NextResponse.json(
      { message: `Error` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
