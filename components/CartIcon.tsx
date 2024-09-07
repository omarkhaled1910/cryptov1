"use client";
import React, { useContext } from "react";
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
  const { state } = useCartContext();

  return (
    <>
      <Drawer>
        <DrawerTrigger className=" border p-2 rounded-md relative">
          <ShoppingCart className=" text-slate-600  dark:text-slate-200 " />
          {state?.totalCount && (
            <span className="absolute dark:bg-red-950 bg-rose-300  w-5 p-1 text-center rounded-full text-xs  bottom-[-12px] left-0 flex flex-col">
              {state?.totalCount}
            </span>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className=" flex flex-col items-center justify-center">
            <Link href={"/cart"}>
              <Button className=" w-80 max-w-80" variant="default">
                View Full cart
              </Button>
            </Link>
            <DrawerClose>
              <Button className="  w-80   max-w-96 " variant="secondary">
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
