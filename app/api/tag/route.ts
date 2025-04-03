import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../db";
import Tag from "@/models/tags";
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
    let tags, productsCount;
    if (searchQuery) {
      const searchRegex = searchQuery ? new RegExp(searchQuery, "i") : null; // Create a regex for case-insensitive search

      tags = await Tag.find({ name: searchRegex }, null, paginationObj).exec();
    } else {
      tags = await Tag.find({}, null, paginationObj);
    }

    if (tags) {
      return NextResponse.json({ tags, tagsCount: 8 });
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
