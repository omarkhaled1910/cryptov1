"use server";

import { cookies } from "next/headers";

const auth = cookies().get("auth")?.value || "";

export const getUsers = async (query = "") => {
  console.log("get ", query, cookies().get("auth"));
  try {
    const response = await fetch(`${process.env.BASE_URL}/api/user?${query}`, {
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
    // console.log(res); // Do something with the response data
    return res;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};
