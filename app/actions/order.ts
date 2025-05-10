"use server";
import { cookies } from "next/headers";
import { api } from "./axios";
import { revalidatePath } from "next/cache";
import { ADMIN_AUTH_KEY, CLIENT_AUTH_KEY } from "@/constants";
import { redirect } from "next/navigation";

export const createOrder = async (orderData: {
  userId: string;
  shippingDetails: any;
  paymentMethod: string;
  items: any[];
  total: number;
}) => {
  const auth = cookies().get(CLIENT_AUTH_KEY)?.value || "";
  console.log(auth, " AUTHHHHHH");
  try {
    const { data } = await api.post("/api/orders", orderData, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });

    console.log(data, " DATA");
    // redirect(`/client-orders/${data.id}`);
    return data;
  } catch (error) {
    console.error("Error creating order ACTION:", error);
    // throw error;
  }
};

export const getAllOrders = async (queryParams = "") => {
  const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";
  try {
    const { data } = await api.get(`/api/orders?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching orders:");
    return { orders: [], ordersCount: 0 };
  }
};

export const getOrders = async () => {
  const auth = cookies().get(CLIENT_AUTH_KEY)?.value || "";
  console.log(auth, " AUTHHHHHH");
  try {
    const { data } = await api.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

export const getOrdersByUser = async (userId: string) => {
  const auth = cookies().get(CLIENT_AUTH_KEY)?.value || "";
  console.log(auth, " AUTHHHHHH");
  try {
    const { data } = await api.get(`/api/orders/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    return data?.orders;
  } catch (error) {
    console.error("Error fetching user orders:");
  }
};

export const getOrderById = async (orderId: string) => {
  const auth = cookies().get(CLIENT_AUTH_KEY)?.value || "";
  console.log(auth, " AUTHHHHHH");
  try {
    const { data } = await api.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    return data?.order;
  } catch (error) {
    console.error("Error fetching order by ID:");
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";
  try {
    const { data } = await api.patch(
      `/api/orders/${orderId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      }
    );
    revalidatePath("/dashboard/orders");
    return data;
  } catch (error) {
    // console.error("Error updating order status:", error);
    // throw error;
  }
};