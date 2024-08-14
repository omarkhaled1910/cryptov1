"use server";
import { getFormData } from "@/lib/utils";
import { redirect, RedirectType } from "next/navigation";

export const addProduct = async (data: FormData) => {
  try {
    const formData = getFormData(data);

    // Append each item in the array to FormData

    console.log(formData);
    const response = await fetch(`${process.env.BASE_URL}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    const res = await response.json();
    console.log(res); // Do something with the response data
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  console.log("server action berfor redirect");
  redirect("/dashboard/products");
};

export const editProduct = async (data: any, id: string) => {
  try {
    console.log(data, "  edit product dataaaa");
    const payload: any = { ...data };

    console.log({ ...data }, payload); // Do something with the response data

    const response = await fetch(`${process.env.BASE_URL}/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log(res); // Do something with the response data
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  redirect("/dashboard/products");
};

export const getProducts = async (query = "") => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/product?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log(res); // Do something with the response data
    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};
export const getProduct = async (id: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log(res); // Do something with the response data
    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};
