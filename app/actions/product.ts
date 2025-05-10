"use server";
import { getFormData } from "@/lib/utils";
import { api } from "./axios";
import { cookies } from "next/headers";
import { ADMIN_AUTH_KEY, CLIENT_AUTH_KEY } from "@/constants";
import { revalidatePath } from "next/cache";

export const addProduct = async (data: any, images: string[] = []) => {
  try {
    const formData = getFormData(data);
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";
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
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

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
  console.log("get action", query, cookies().get(ADMIN_AUTH_KEY));
  const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

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
    // console.error("Fetch error:", error);
    return;
  }
};

export const getProduct = async (id: string) => {
  try {
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

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
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";
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

export const addCommentToProduct = async (
  productId: string,
  content: string
) => {
  try {
    const auth = cookies().get(CLIENT_AUTH_KEY)?.value || "";
    const { data } = await api.post(
      `/api/product/${productId}/comments`,
      {
        content,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    // revalidatePath(`/product/${productId}`);
    return data;
  } catch (error) {
    // console.error("Error adding comment:", error);
  }
};

export const getProductsByTags = async (
  tags: string[],
  start = 0,
  limit = 4
) => {
  try {
    const { data } = await api.get(
      `/api/product/tag?tags=${tags.join(",")}&start=${start}&limit=${limit}`
    );
    return data?.products || [];
  } catch (error) {
    console.error("Error fetching products by tags:", error);
    return [];
  }
};