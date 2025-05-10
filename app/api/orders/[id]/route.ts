import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import { decodeToken } from "@/lib/server-utils";
import connectMongo from "@/app/api/db";
import Order from "@/models/order";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization") || "";

  const { isValid, user } = decodeToken(token);

  console.log(isValid, user, " USER", params.id);
  if (!isValid) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongo();
    const order = await Order.findById(params.id);
    console.log(order, " ORDERS");

    if (user.id !== order?.userId && !user.is_Admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (order) {
      return NextResponse.json({ order });
    }
    return NextResponse.json(
      { message: `Order ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization") || "";
  const { isValid, user } = decodeToken(token);
  console.log(isValid, user, " USER", params.id);
  if (!isValid || !user.is_Admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongo();
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { message: "Status is required" },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order });
  } catch (error) {
    // console.error("Error updating order:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}   