import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../db";
import DiscountCode, { IDiscountCode } from "@/models/discount-codes";
import { HttpStatusCode } from "axios";
import { decodeToken } from "@/lib/server-utils";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongo();
    const discountCode = await DiscountCode.findById(params.id);
    if (discountCode) {
      return NextResponse.json({ discountCode });
    }
    return NextResponse.json(
      { message: `Discount Code ${params.id} not found` },
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
    console.log(req.headers, "put headers");
    const { isValid, user } = decodeToken(token);
    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    await connectMongo();
    const discountCode = await DiscountCode.findById(params.id);
    if (discountCode) {
      const body: IDiscountCode = await req.json();

      Object.entries(body).map(([key, val]) => {
        console.log(key);
        discountCode[key] = val;
      });
      discountCode.lastModifiedBy = user.email;

      console.log(discountCode, "right before save", body);
      discountCode.save();
      return NextResponse.json({ discountCode });
    }
    return NextResponse.json(
      { message: `Discount Code ${params.id} not found` },
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
    const token = req.headers.get("Authorization") || "";

    const { isValid, user } = decodeToken(token);
    if (!isValid) {
      return NextResponse.json(
        { message: "Not A Valid Token" },
        { status: HttpStatusCode.Forbidden }
      );
    }
    await connectMongo();
    const discountCode = await DiscountCode.findById(params.id);
    console.log(discountCode, "server before db delete");
    if (discountCode) {
      await DiscountCode.findByIdAndDelete(discountCode._id);
      return NextResponse.json({
        message: `Discount Code ${params.id} has been deleted`,
        status: HttpStatusCode.Ok,
      });
    }
    return NextResponse.json(
      {
        message: `Discount Code ${params.id} not found`,
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
