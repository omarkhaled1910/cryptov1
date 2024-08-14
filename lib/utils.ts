import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const productFields = ["name", "desc", "price"];
export function getFormData(data: FormData) {
  const payload: any = {};
  data.forEach((value, key) => (payload[key] = value));
  console.log(data);
  return payload;
}
