import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import connectMongo from "../db";
import Product from "@/models/product";
import { decodeToken } from "@/lib/server-utils";
import Tags from "@/models/tags";

export type CreateProductDto = {
  name: string;
  description: string;
  price: number;
  tags: string[];
};

export type UpdateProductDto = {
  name: string;
  description: string;
  price: number;
};

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams; // Default page and limit
    await connectMongo();
    const searchQuery = query.get("search");
    const categories = query.get("categories");
    const priceRange = query.get("priceRange");
    console.log(categories, "categories");
    console.log(priceRange, "priceRange", query);
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
      // console.log(product, " searchQuery", searchQuery);
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
    console.error("Fetch error:", error);

    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization") || "";
    console.log(req.headers, "pest req headers");
    const { isValid, user } = decodeToken(token);
    console.log(token, user);
    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    await connectMongo();

    const body: CreateProductDto = await req.json();
console.log(body, "boddy right before posgt");
    if (body.name) {
      const newTags = Array.isArray(body.tags) ? body.tags : [body.tags];
      const product = await Product.create({
        ...body,
        createdBy: user.email,
        tags: newTags,
        lastModifiedBy: user.email,
      });
      await Tags.updateOne(
        { _id: "66e48de8385d5fa3e9086f26" },
        { $addToSet: { tags: { $each: newTags } } },
        { upsert: true }
      );
      console.log(product, "product after create");
      return NextResponse.json(
        { message: "Your product has been created" },
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
