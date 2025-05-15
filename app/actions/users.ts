"use server";

import { ADMIN_AUTH_KEY, CLIENT_AUTH_KEY } from "@/constants";
import { generateUniqueId, getFormData } from "@/lib/utils";
import { cookies } from "next/headers";
import { api } from "./axios";

export const getUsers = async (query = "") => {
  const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

  try {
    // const response = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?${query}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authrization: auth,
    //     },
    //     next: { revalidate: 1 },
    //   }
    // );

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    // const res = await response.json();
    const { data } = await api.get(`/api/user?${query}`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    });
    // console.log(res, "get Usersssss");
    // console.log(res); // Do something with the response data
    return data?.user;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};

export const saveShippedDetail = async (
  id: string,
  shippingDetail: any,
  previousShippingDetails = []
) => {
  const auth = cookies().get(CLIENT_AUTH_KEY)?.value || "";
  const formData = getFormData(shippingDetail);
  console.log(
    {
      shipping_Details: [
        ...previousShippingDetails,
        { ...formData, id: generateUniqueId() },
      ],
    },
    "save shipping body"
  );
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          shipping_Details: [
            ...previousShippingDetails,
            { ...formData, id: generateUniqueId() },
          ],
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
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

export const getClients = async (query = "") => {
  const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/client?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        next: { revalidate: 1 },
      }
    );

    // if (!response.ok) {
    //   throw new Error("Network response was not ok");
    // }

    const res = await response.json();
    console.log(res, "get Clientssss");
    // console.log(res); // Do something with the response data
    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};
