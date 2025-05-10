import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import connectMongo from "../../db";
import Product from "@/models/product";

export async function GET(request: NextRequest) {
  try {
    await connectMongo();

    const { searchParams } = new URL(request.url);

    console.log(searchParams, "get by tags");

    const tagsParam = searchParams.get("tags");
    const start = parseInt(searchParams.get("start") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");

    if (!tagsParam) {
      return NextResponse.json(
        { message: "Tags query parameter is required." },
        { status: HttpStatusCode.BadRequest }
      );
    }

    const tagsArray = tagsParam.split(",");

    const products = await Product.find({ tags: { $in: tagsArray } })
      .skip(start)
      .limit(limit);

    console.log(products, "products by tags");

    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
