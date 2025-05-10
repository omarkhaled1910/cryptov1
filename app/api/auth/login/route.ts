import User from "@/models/user";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongo from "../../db";

export type UserLogDto = {
  email: string;
  password: string;
};

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"; // Replace with your secret key

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body: UserLogDto = await req.json();
    console.log(body, "body", req.body);

    if (body.email && body.password) {
      // Find the user by email
      const user = await User.findOne({ email: body.email });

      if (user) {
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(body.password, user.password);

        if (isMatch) {
          // Generate a JWT token
          const access_token = jwt.sign(
            {
              name: user.name,
              id: user._id,
              email: user.email,
              phone_number: user.phoneNumber,
              is_Admin: user.is_Admin,
            }, // Payload
            JWT_SECRET, // Secret key
            { expiresIn: "30d" } // Token expiration time
          );

          // Return the user details and token
          return NextResponse.json(
            {
              user: {
                name: user.name,
                email: user.email,
                id: user._id,
              },
              access_token,
              message: "Login successful",
            },
            { status: HttpStatusCode.Ok }
          );
        } else {
          return NextResponse.json(
            { message: "Invalid password" },
            { status: HttpStatusCode.Unauthorized }
          );
        }
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: HttpStatusCode.NotFound }
        );
      }
    }

    return NextResponse.json(
      { message: "Email or password is missing" },
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
