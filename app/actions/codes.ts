"use server";
import { getFormData } from "@/lib/utils";
import { api } from "./axios";
import { cookies } from "next/headers";
import { ADMIN_AUTH_KEY } from "@/constants";

// Add a new discount code
export const addDiscountCode = async (data: any) => {
  try {
    const formData = getFormData(data);
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

    const response = await api.post(
      `/api/codes`,
      { ...formData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error adding discount code:", error?.response?.status);
    return undefined;
  }
};

// Edit an existing discount code
export const editDiscountCode = async (id: string, data: any) => {
  try {
    const formData = getFormData(data);
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

    const response = await api.put(
      `/api/codes/${id}`,
      { ...formData },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error editing discount code:", error?.response?.status);
    return undefined;
  }
};

// Verify a discount code
export const verifyDiscountCode = async (code: string) => {
  try {
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

    const response = await api.get(`/api/codes/verify/${code}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error verifying discount code:", error?.response?.status);
    return undefined;
  }
};

// Delete a discount code
export const deleteDiscountCode = async (id: string) => {
  try {
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

    const response = await api.delete(`/api/codes/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error deleting discount code:", error?.response?.status);
    return undefined;
  }
};

// Get all discount codes
export const getAllDiscountCodes = async (query = "") => {
  try {
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

    const response = await api.get(`/api/codes?${query}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching discount codes:", error?.response?.status);
    return undefined;
  }
};

export const getSingleDiscountCode = async (id = "") => {
  try {
    const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

    const response = await api.get(`/api/codes/${id}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Error fetching discount codes:", error?.response?.status);
    return undefined;
  }
};
