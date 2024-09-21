"use client";
import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "@/providers/cart-provider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const CartIcon = () => {
  const [open, setOpen] = useState(false);
  const { state } = useCartContext();
  console.log(state?.cart);
  return (
    <>
      <Drawer open={open}>
        <DrawerTrigger
          onClick={() => setOpen(true)}
          className=" border p-2 rounded-md relative"
        >
          <ShoppingCart className=" text-slate-600  dark:text-slate-200 " />
          {state?.totalCount && (
            <span className="absolute dark:bg-red-950 bg-rose-300  w-5 p-1 text-center rounded-full text-xs  bottom-[-12px] left-0 flex flex-col">
              {state?.totalCount}
            </span>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Your Items So Far</DrawerTitle>
          </DrawerHeader>
          <div className=" flex flex-col items-center  gap-8 max-h-[50vh] overflow-auto ">
            {state?.cart.length &&
              state?.cart.map((item: any) => (
                <div className="flex gap-4 bg-secondary  px-4 py-6 rounded-md  shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                  <div className="flex gap-4">
                    <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                      <img
                        src={
                          item.images[0] ||
                          "https://readymadeui.com/images/watch1.webp"
                        }
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Color:{" "}
                          <span
                            style={{ backgroundColor: item?.colors?.[0] }}
                            className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]"
                          ></span>
                        </p>
                        <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Price:{" "}
                          <span
                            style={{ backgroundColor: item?.colors?.[0] }}
                            className="inline-block w-5 h-5 rounded-md "
                          >
                            {item.price}$
                          </span>
                        </p>
                      </div>

                      <div className="mt-auto flex items-center gap-3">
                        <div className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 124 124"
                          >
                            <path
                              d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </div>
                        <span className="font-bold text-sm leading-[18px]">
                          {item.count}
                        </span>
                        <div className="flex items-center justify-center w-5 h-5 bg-gray-400 outline-none rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-2 fill-white"
                            viewBox="0 0 42 42"
                          >
                            <path
                              d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                              data-original="#000000"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <DrawerFooter className=" flex flex-col items-center justify-center">
            {state?.cart.length && (
              <Link onClick={() => setOpen(false)} href={"/cart"}>
                <Button className=" w-80 max-w-80" variant="default">
                  View Full cart
                </Button>
              </Link>
            )}
            <DrawerClose>
              <Button
                onClick={() => setOpen(false)}
                className="  w-80   max-w-96 "
                variant="secondary"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartIcon;
