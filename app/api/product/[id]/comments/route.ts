import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import Product from "@/models/product";
import { decodeToken } from "@/lib/server-utils";
import mongoose from "mongoose";
import { CLIENT_AUTH_KEY } from "@/constants";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization") || "";
  const { user } = decodeToken(token);
  console.log(user, "userssas");
  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Comment content is required" },
        { status: 400 }
      );
    }

    const comment = {
      //   id: new mongoose.Types.ObjectId().toString(),
      createdBy: user.email,
      author: user.name || user.email,
      lastModifiedBy: user.id,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log(comment, "comment", params.id);

    const product = await Product.findOneAndUpdate(
      { _id: params.id },
      {
        $push: { comments: comment },
        $set: { lastModifiedBy: user.name || user.email },
      },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error adding comment:", error, user);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
