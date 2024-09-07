import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import connectMongo from "../db";
import Product from "@/models/product";

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
};

export type UpdateProductDto = {
  name: string;
  description: string;
  price: number;
};

export async function GET(req: NextRequest) {
  try {
    console.log(req.headers.get("authrization"), "auth headers");
    const query = req.nextUrl.searchParams; // Default page and limit
    await connectMongo();
    const searchQuery = query.get("search");
    const paginationObj = {
      limit: Number(query.get("limit")),
      skip: Number(query.get("skip")),
      sort: { createdAt: -1 }, // Sorts by createdAt field in descending order
    };
    let product, productsCount;
    if (searchQuery) {
      const searchRegex = searchQuery ? new RegExp(searchQuery, "i") : null; // Create a regex for case-insensitive search

      product = await Product.find(
        { name: searchRegex },
        null,
        paginationObj
      ).exec();
      productsCount = await Product.countDocuments({
        name: searchRegex,
      }).exec();
      console.log(product, " searchQuery", searchQuery);
    } else {
      product = await Product.find({}, null, paginationObj);
      productsCount = await Product.countDocuments({});
    }

    if (product) {
      return NextResponse.json({ product, productsCount });
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

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: CreateProductDto = await req.json();
    console.log(body, "boddyy", req.body);
    if (body.name) {
      const product = await Product.create(body);
      return NextResponse.json(
        { product, message: "Your product has been created" },
        { status: HttpStatusCode.Created }
      );
    }
    return NextResponse.json(
      { message: "Product name is missing" },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
