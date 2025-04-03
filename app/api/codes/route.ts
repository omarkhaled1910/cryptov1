import { NextRequest, NextResponse } from "next/server";
import { decodeToken } from "@/lib/server-utils";
import connectMongo from "../db";
import DiscountCode, { IDiscountCode } from "@/models/discount-codes";
import { HttpStatusCode } from "axios";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams; // Default page and limit
    await connectMongo();
    const searchQuery = query.get("search");
    const paginationObj = {
      limit: Number(query.get("limit")),
      skip: Number(query.get("skip")),
      sort: { createdAt: -1 }, // Sorts by createdAt field in descending order
    };
    let discountCodes, discountCodesCount;
    if (searchQuery) {
      const searchRegex = searchQuery ? new RegExp(searchQuery, "i") : null; // Create a regex for case-insensitive search

      discountCodes = await DiscountCode.find(
        { name: searchRegex },
        null,
        paginationObj
      ).exec();
      discountCodesCount = await DiscountCode.countDocuments({
        name: searchRegex,
      }).exec();
      // console.log(discountCode, " searchQuery", searchQuery);
    } else {
      discountCodes = await DiscountCode.find({}, null, paginationObj);
      discountCodesCount = await DiscountCode.countDocuments({});
    }

    if (discountCodes) {
      return NextResponse.json({ discountCodes, discountCodesCount });
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
// Adjust the import based on your structure

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization") || "";
    console.log(req.headers, "post req headers");
    const { isValid, user } = decodeToken(token);
    console.log(token, user);

    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }

    await connectMongo();

    const body: IDiscountCode = await req.json();
    console.log(body, "body right before post");

    if (body.code) {
      const discountCode = await DiscountCode.create({
        ...body,
        createdBy: user.email, // Assuming you want to track who created the discount code
      });
      console.log(discountCode, "discount code after create");

      return NextResponse.json(
        { message: "Your discount code has been created", discountCode },
        { status: HttpStatusCode.Created }
      );
    }

    return NextResponse.json(
      { message: "Discount code is missing" },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
