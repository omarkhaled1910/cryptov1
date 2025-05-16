import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import Order from "@/models/order";
import { decodeToken } from "@/lib/server-utils";
import connectMongo from "@/app/api/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get("Authorization") || "";
  const { isValid, user } = decodeToken(token);

  console.log(isValid, user, " USER");
  if (!isValid || user.id !== params.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectMongo();
    const orders = await Order.find({ userId: params.id }, null, {
      sort: { createdAt: -1 },
    });

    if (orders) {
      return NextResponse.json({ orders });
    }
    return NextResponse.json(
      { message: `Order ${params.id} not found` },
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
