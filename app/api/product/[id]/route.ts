import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import connectMongo from "../../db";
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
  category?: string;
};

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const product = await Product.findById(params.id);
    if (product) {
      return NextResponse.json({ product });
    }
    return NextResponse.json(
      { message: `Product ${params.id} not found` },
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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const product = await Product.findById(params.id);
    if (product) {
      const body: UpdateProductDto = await req.json();

      Object.entries(body).map(([key, val]) => {
        console.log(key);
        product[key] = val;
      });
      product.category = body.category;
      console.log(product, "right before save", body);
      product.save();
      return NextResponse.json({ product });
    }
    return NextResponse.json(
      { message: `Product ${params.id} not found` },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const product = await Product.findById(params.id);
    console.log(product, "server before db delete");
    if (product) {
      await Product.findByIdAndDelete(product._id);
      return NextResponse.json({
        message: `Product ${params.id} has been deleted`,
        status: HttpStatusCode.Ok,
      });
    }
    return NextResponse.json(
      {
        message: `Product ${params.id} not found`,
        status: HttpStatusCode.NotFound,
      },
      { status: HttpStatusCode.NotFound }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
