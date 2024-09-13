import { cookies } from "next/headers";

export const getTags = async (query = "") => {
  console.log("get action", query, cookies().get("auth"));
  const auth = cookies().get("auth")?.value || "";

  try {
    const response = await fetch(`${process.env.BASE_URL}/api/tag?${query}`, {
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
    console.log(res, "action", res.tags); // Do something with the response data
    return res?.tags?.[0].tags;
  } catch (error) {
    console.error("Fetch error:", error);
    return;
  }
  //   redirect("/dashboard/products");
};
