import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/firebase";
import {
  cartLocalStorageAcessKey,
  emptyCart,
  emptyUser,
  userStorageAcessKey,
} from "@/constants";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const productFields = ["name", "desc", "price", "category", ""];
export function getFormData(data: FormData) {
  const payload: any = {};
  data?.forEach((value, key) => {
    if (payload[key]) {
      payload[key] = Array.isArray(payload[key])
        ? [...payload[key], value]
        : [payload[key], value];

      return;
    }

    payload[key] = value;
  });
  console.log(data, "get form data output", payload);
  return payload;
}

export const uploadImageToStorage = async (
  file: any,
  cb: (url: string) => void
) => {
  // const convertedFile = await convertHeicToJpeg(file);
  // console.log(convertedFile, "converted file");
  const storageRef = ref(storage, `Next14Coomerce/${file.name}`);

  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  cb(downloadURL);
  console.log("Download URL", downloadURL);
};

export const deleteUploadedImage = async (src: string) => {
  const urlParts = src?.split("?alt=media");

  // Extract the path to the file
  const pathToFile = decodeURIComponent(urlParts[0].split("/o/")[1]);

  // Now, you have the path to the file

  const desertRef = ref(storage, pathToFile);
  // Delete the file
  deleteObject(desertRef);
};

// Debounce function
export function debounce(func: () => void, delay: number) {
  let timeoutId: any;
  return function (...args: any) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(), delay);
  };
}

export const setUpdatedCartToLocalStorage = (state: any) => {
  if (typeof window !== "undefined")
    localStorage.setItem(cartLocalStorageAcessKey, JSON.stringify(state));
};
export const getUpdatedCartFromLocalStorage = () => {
  if (typeof window !== "undefined")
    return (
      JSON.parse(
        localStorage.getItem(cartLocalStorageAcessKey || "") ||
          JSON.stringify(emptyCart)
      ) || emptyCart
    );
};

export const setUserToLocalStorage = (state: any) => {
  if (typeof window !== "undefined")
    localStorage.setItem(userStorageAcessKey, JSON.stringify(state));
};
export const getAcessTokenLocalStoarage = () => {
  if (typeof window !== "undefined")
    return JSON.parse(localStorage.getItem(userStorageAcessKey) || "")
      ?.access_token;
  return "";
};
export const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined")
    return (
      JSON.parse(
        localStorage.getItem(userStorageAcessKey || "") ||
          JSON.stringify(emptyUser)
      ) || emptyUser
    );
};

// Function to generate a unique ID
export const generateUniqueId = (length = 16) => {
  return crypto.randomBytes(length).toString("hex"); // Generates a hex string
};

// export async function convertHeicToJpeg(file: Blob): Promise<Blob> {
//   if (file.type === "image/heic" || file.type?.endsWith(".heic")) {
//     const jpegBlob = await heic2any({
//       blob: file,
//       toType: "image/jpeg",
//       quality: 0.8, // Adjust quality (0-1)
//     });
//     return jpegBlob as Blob;
//   }
//   return file; // Return as-is if not HEIC
// }