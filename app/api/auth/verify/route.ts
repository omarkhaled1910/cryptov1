import { HttpStatusCode } from "axios";
import twilio from "twilio";

import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../db";
import Client from "@/models/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { ADMIN_AUTH_KEY, CLIENT_AUTH_KEY } from "@/constants";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID || "";
const verifyServiceId = process.env.TWILIO_VERIFY_SERVICE_ID || "";

// const twilioClient = twilio(accountSid, authToken);

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"; // Replace with your secret key

const verification = { sid: "dummy try", status: "pending" };

const verificationCheck = { sid: "dummy try", status: "approved" };
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body, "boddyy", req.body);

    // const verification = await twilioClient.verify.v2
    //   .services(serviceId)
    //   .verifications.create({
    //     channel: "sms",
    //     to: body.phone,
    //   });

    console.log(verification.sid, "TWELLOO OID", body.phone);

    return NextResponse.json({
      message: "Verification code sent",
      status: verification.status,
      verificationSid: verification.sid,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred: " + error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();

    // const verificationCheck = await twilioClient.verify.v2
    //   .services(verifyServiceId)
    //   .verificationChecks.create({
    //     code: body.code,
    //     to: body.phone,
    //   });
    const existingUser = await Client.findOne({ phone_Number: body.phone });

    console.log(
      verificationCheck.sid,
      "TWELLOO CHECK",
      body.phone,
      body.code,
      existingUser
    );
    let full_user, client_access_token;
    if (existingUser) {
      client_access_token = jwt.sign(
        {
          name: body.name,
          phone_number: body.phone,
          id: existingUser._id,
        }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "90d" } // Token expiration time
      );
      full_user = await Client.findOneAndUpdate(
        { phone_Number: body.phone },
        { lastVisited: new Date() }, // set to the current date and time
        { new: true } // return the updated document
      );
      const cookieStore = cookies();
      cookieStore.set(CLIENT_AUTH_KEY, client_access_token);
      cookieStore.set(ADMIN_AUTH_KEY, "");
      return NextResponse.json({
        message: "Verification code Verfied",
        status: verificationCheck.status,
        verificationSid: verificationCheck.sid,
        full_user: full_user?._doc,
        client_access_token,
      });
    } else {
      full_user = await Client.create({
        name: body.name,
        phone_Number: body.phone,
        is_Verfied: true,
        lastVisited: new Date(), // set it to the current date and time
      });
      client_access_token = jwt.sign(
        {
          name: body.name,
          phone_number: body.phone,
          id: full_user._id,
        }, // Payload
        JWT_SECRET, // Secret key
        { expiresIn: "90d" } // Token expiration time
      );
      const cookieStore = cookies();
      cookieStore.set(CLIENT_AUTH_KEY, client_access_token);
      cookieStore.set(ADMIN_AUTH_KEY, "");

      return NextResponse.json({
        message: "Verification code Verfied",
        status: verificationCheck.status,
        verificationSid: verificationCheck.sid,
        full_user: full_user?._doc,
        client_access_token,
      });
    }

    // If the phone number does not exist, create a new user
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An error occurred: " + error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
