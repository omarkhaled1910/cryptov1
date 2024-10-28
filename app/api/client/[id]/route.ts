import { decodeToken } from "@/lib/server-utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../db";
import Client from "@/models/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.headers.get("Authorization") || "";
    console.log(req.headers, "put headers");
    const { isValid, user } = decodeToken(token);
    if (!isValid && user.id !== params.id) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    await connectMongo();
    const client = await Client.findById(params.id);
    if (Client) {
      return NextResponse.json({ client });
    }
    return NextResponse.json(
      { message: `Client ${params.id} not found` },
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
    const token = req.headers.get("Authorization") || "";
    const { isValid, user } = decodeToken(token);
    console.log(req.headers, "put headers", user);

    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    await connectMongo();
    const client = await Client.findById(params.id);
    if (client) {
      console.log(client, "client saved", params.id);
      const body = await req.json();

      Object.entries(body).map(([key, val]) => {
        console.log(key);
        client[key] = val;
      });

      console.log(client, "right before save", body);
      client.save();
      return NextResponse.json({ client });
    }
    return NextResponse.json(
      { message: `Client ${params.id} not found` },
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
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token =
      req.headers.get("Authorization") ||
      req.headers.get("authorization") ||
      "";
    console.log(token, "delete token");
    const { isValid, user } = decodeToken(token);
    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    await connectMongo();
    const client = await Client.findById(params.id);
    console.log(client, "server before db delete");
    if (client) {
      await Client.findByIdAndDelete(client._id);
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
