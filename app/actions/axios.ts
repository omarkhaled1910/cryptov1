"use server";
import axios, { AxiosInstance } from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "./auth";

const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    function (response) {
      // Handle responses here
      // console.log(response, "Response");
      return response;
    },
    function (error) {
      if (error.response?.status === 403) {
        logout();
        // Handle redirection based on the environment
        if (typeof window !== "undefined") {
          redirect("/login");
        }
      }
      return Promise.reject(error);
    }
  );
};

// Initialize interceptors for the default `api` instance
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});
setupInterceptors(api);

// export const createAuthorizedAxiosInstance = (token = "") => {
//   const newApi = axios.create({
//     baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//     headers: {
//       Authorization: `Bearer ${cookies().get(ADMIN_AUTH_KEY)?.value || token || ""}`,
//     },
//   });

//   // Setup interceptors for the new instance
//   setupInterceptors(newApi);

//   return newApi;
// };

// Add a request interceptor
// api.interceptors.request.use(
//   function (config) {
//     const auth = cookies().get(ADMIN_AUTH_KEY)?.value || "";
//     config.headers.Authorization = `Bearer ${auth}`;
//     console.log(config, "config ", auth, "interceptor config");

//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     // console.log(error, "error");

//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
