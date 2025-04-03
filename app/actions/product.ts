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
    const response = await api.get(`/api/product?${query}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      // Axios does not have a built-in revalidate option; consider handling this with caching strategies if needed.
    });

    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
};

export const getProduct = async (id: string) => {
  try {
    const auth = cookies().get("auth")?.value || "";

    const response = await api.get(`/api/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const auth = cookies().get("auth")?.value || "";
    console.log(auth, "auth in action");

    const response = await api.delete(`/api/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
};