// client actions
import { api } from "./axios";

export const verifyNumber = async (phone: string) => {
  console.log(phone, api, "verufy bnimevr actioon");
  try {
    const response = await fetch(`/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};

export const verifyCode = async (phone: string, code: string, name: string) => {
  try {
    const response = await fetch(`/api/auth/verify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        code,
        name,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};
