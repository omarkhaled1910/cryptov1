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
    const query = req.nextUrl.searchParams; // Default page and limit
    console.log(query);
    await connectMongo();
    const product = await Product.find({});
    if (product) {
      return NextResponse.json({ product });
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
    console.log("before post");
    await connectMongo();
    const body: CreateProductDto = await req.json();
    console.log(body, "boddyy", req.body, req);
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
