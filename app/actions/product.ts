"use server";
import { getFormData } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

const auth = cookies().get("auth")?.value || "";
export const addProduct = async (data: any, images: string[] = []) => {
  try {
    const formData = getFormData(data);

    // Append each item in the array to FormData

    console.log({ ...formData, images }, images, " before post ");
    const response = await fetch(`${process.env.BASE_URL}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authrization: auth,
      },
      body: JSON.stringify({ ...formData, images }),
    });

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }
    const res = await response.json();
    console.log(res);
    // Do something with the response data
    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    return undefined;
  }
  console.log("server action berfor redirect");
  // redirect("/dashboard/products");
};

export const editProduct = async (data: any, id: string, images: string[]) => {
  try {
    const payload = getFormData(data);

    const response = await fetch(`${process.env.BASE_URL}/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authrization: auth,
      },
      body: JSON.stringify({ ...payload, images }),
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
  // redirect("/dashboard/products");
};

export const getProducts = async (query = "") => {
  console.log("get ", query, cookies().get("auth"));
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/api/product?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authrization: auth,
        },
        next: { revalidate: 1 },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    // console.log(res); // Do something with the response data
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
        authrization: auth,
      },
      next: { revalidate: 1 },
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

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authrization: auth,
      },
    });
    console.log(response); // Do something with the response data

    const res = await response.json();
    console.log(res); // Do something with the response data

    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};