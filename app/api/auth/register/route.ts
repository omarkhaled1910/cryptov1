import User from "@/models/user";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongo from "../../db";
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
};

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"; // Replace with your secret key

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: CreateUserDto = await req.json();
    console.log(body, "boddyy", req.body);

    if (body.name && body.password) {
      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(body.password, 10);

      // Create the user with the hashed password
      const full_user = await User.create({
        ...body,
        password: hashedPassword,
      });

      // Generate a JWT token
      const access_token = jwt.sign(
        {
          id: full_user._doc._id,
          email: full_user._doc.email,
          phone_number: full_user._doc.phoneNumber,
          name: full_user._doc.name,
        }, // Payload
        JWT_SECRET || "", // Secret key
        { expiresIn: "30d" } // Token expiration time
      );
      const user = {
        name: full_user._doc.name,
        email: full_user._doc.email,
        id: full_user._doc._id,
      };
      return NextResponse.json(
        { user, access_token, message: "Your User has been created" },
        { status: HttpStatusCode.Created }
      );
    }

    return NextResponse.json(
      { message: "Product name or password is missing" },
      { status: HttpStatusCode.BadRequest }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred: " + error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
