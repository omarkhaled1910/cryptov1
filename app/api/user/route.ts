import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../db";
import User from "@/models/user";
import { HttpStatusCode } from "axios";
import { decodeToken } from "@/lib/server-utils";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization") || "";
    console.log(token, "auth headers");
    const { isValid } = decodeToken(token);
    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    console.log(isValid, "decodedd tokennnnnn");
    const query = req.nextUrl.searchParams; // Default page and limit
    await connectMongo();
    const searchQuery = query.get("search");
    const paginationObj = {
      limit: Number(query.get("limit")),
      skip: Number(query.get("skip")),
      sort: { createdAt: -1 }, // Sorts by createdAt field in descending order
    };
    let user, usersCount;
    if (searchQuery) {
      const searchRegex = searchQuery ? new RegExp(searchQuery, "i") : null; // Create a regex for case-insensitive search

      // Find users whose name or email matches the search query
      user = await User.find(
        {
          $or: [{ name: searchRegex }, { email: searchRegex }],
        },
        null,
        paginationObj
      ).exec();

      // Count users whose name or email matches the search query
      usersCount = await User.countDocuments({
        $or: [{ name: searchRegex }, { email: searchRegex }],
      }).exec();
      console.log(user, " searchQuery", searchQuery);
    } else {
      user = await User.find({}, null, paginationObj);
      usersCount = await User.countDocuments({});
    }

    if (user) {
      return NextResponse.json({ user, usersCount });
    }
    return NextResponse.json(
      { message: `Error` },
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
