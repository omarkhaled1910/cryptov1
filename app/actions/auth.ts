"use server";
import { getFormData } from "@/lib/utils";
import { cookies } from "next/headers";

export const register = async (data: any) => {
  try {
    const formData = getFormData(data);
    const cookieStore = cookies();

    // Append each item in the array to FormData

    console.log(
      { ...formData },
      " before register ",
      `${process.env.BASE_URL}/api/auth/regitser`
    );
    const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    const res = await response.json();
    console.log(res, " after register ");
    // Do something with the response data
    cookieStore.set("auth", res.access_token);
    return res;
  } catch (error) {
    console.error("Register Error", error);
    return undefined;
  }
};

export const login = async (data: any) => {
  try {
    const formData = getFormData(data);
    const cookieStore = cookies();

    // Append each item in the array to FormData

    console.log(
      { ...formData },
      " before register ",
      `${process.env.BASE_URL}/api/auth/login`
    );
    const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    const res = await response.json();
    cookieStore.set("auth", res.access_token);
    console.log(res, " after login ");

    // Do something with the response data
    return res;
  } catch (error) {
    console.error("login Error", error);
    return undefined;
  }
};

export const logout = async () => {
  const cookieStore = cookies();

  cookieStore.delete("auth");
};

export const clientLogout = async () => {
  const cookieStore = cookies();

  cookieStore.delete("clientAuth");
};
