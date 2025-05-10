"use server";
import { revalidatePath } from "next/cache";
import { api } from "./axios";

export const addShippingAddress = async (userId: string, address: any) => {
  try {
    const { data } = await api.put(
      `/api/client/${userId}/shipping-address`,
      address
    );
    revalidatePath("/profile");
    return data;
  } catch (error) {
    console.error("Error adding shipping address:", error);
    throw error;
  }
};

export const deleteShippingAddress = async (
  userId: string,
  addressId: string
) => {
  try {
    const { data } = await api.delete(
      `/api/client/${userId}/shipping-address/${addressId}`
    );
    revalidatePath("/profile");
    return data;
  } catch (error) {
    console.error("Error deleting shipping address:", error);
    throw error;
  }
};
