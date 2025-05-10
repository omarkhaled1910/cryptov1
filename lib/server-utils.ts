"server-only";
import { ADMIN_AUTH_KEY, CLIENT_AUTH_KEY } from "@/constants";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"; // Replace with your secret key

export const decodeToken = (
  token?: string
): { isValid: boolean; user: any } => {
  if (!token) return { isValid: false, user: undefined };
  try {
    // Verify the token and decode the payload

    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    console.error("Token verification sucess:", decoded);

    return { isValid: true, user: decoded };
  } catch (error) {
    // Handle errors (e.g., invalid token, token expired)
    console.error("Token verification failed:", error);
    return { isValid: false, user: undefined };
  }
};

export const setToken = (token: string, key: "admin" | "client") => {
  cookies().set(key === "admin" ? ADMIN_AUTH_KEY : CLIENT_AUTH_KEY, token);
};
