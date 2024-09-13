"use server";
import { getFormData } from "@/lib/utils";
import { api } from "./axios";
import { cookies } from "next/headers";

export const addProduct = async (data: any, images: string[] = []) => {
  try {
    const formData = getFormData(data);
    const auth = cookies().get("auth")?.value || "";
    // Append each item in the array to FormData

    const response = await api.post(
      `/api/product`,
      { ...formData, images },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.status === "403") {
      console.error("Forribeden:", error?.response?.status);
    } else {
      console.error("Fetch error:", error?.response?.status);
    }
    return undefined;
  }
};

export const editProduct = async (data: any, id: string, images: string[]) => {
  try {
    const payload = getFormData(data);
    const auth = cookies().get("auth")?.value || "";

    const response = await api.put(
      `/api/product/${id}`,
      { ...payload, images },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Fetch error:", error);
    return;
  }
};

export const getProducts = async (query = "") => {
  console.log("get action", query, cookies().get("auth"));
  const auth = cookies().get("auth")?.value || "";

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
    const auth = cookies().get("auth")?.value || "";

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
    const auth = cookies().get("auth")?.value || "";

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