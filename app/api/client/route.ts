import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../db";
import Client from "@/models/client";
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
    let client, clientsCount;
    if (searchQuery) {
      const searchRegex = searchQuery ? new RegExp(searchQuery, "i") : null; // Create a regex for case-insensitive search

      // Find clients whose name or email matches the search query
      client = await Client.find(
        {
          $or: [{ name: searchRegex }, { phone_Number: searchRegex }],
        },
        null,
        paginationObj
      ).exec();

      // Count clients whose name or email matches the search query
      clientsCount = await Client.countDocuments({
        $or: [{ name: searchRegex }, { email: searchRegex }],
      }).exec();
      console.log(client, " searchQuery", searchQuery);
    } else {
      client = await Client.find({}, null, paginationObj);
      clientsCount = await Client.countDocuments({});
    }

    if (client) {
      return NextResponse.json({ client, clientsCount });
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
