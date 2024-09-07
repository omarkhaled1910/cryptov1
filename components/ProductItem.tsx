"use client";
import React from "react";
import { Button } from "./ui/button";
import { Product } from "@/constants/productTable";
import { useCartContext } from "@/providers/cart-provider";
import { CircleMinus, PlusCircle } from "lucide-react";
import Link from "next/link";

const ProductItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useCartContext();
  const isInCart = state?.cart?.find((item: any) => item.id === product?.id);

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };
  const handleAddToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <article className="max-w-sm  relative   w-full  bg-primary-foreground rounded-lg shadow-lg overflow-hidden  ">
      <Link href={`/product/${product.id}`}>
        <div>
          <img
            className="object-cover h-64 w-full"
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxzbmVha2Vyc3xlbnwwfDB8fHwxNzEyMjIzNDAyfDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Converse sneakers"
          />
        </div>

        <div className="flex flex-col h-full gap-1 mt-4 px-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
            {product.name}
          </h2>
          <span className="font-normal text-gray-600 dark:text-gray-300">
            High Top (Lemon Yellow)
          </span>
          <span className="font-semibold text-gray-800 dark:text-gray-50">
            {product.price} $
          </span>
        </div>

        <div className="flex gap-4 mt-4 px-4 h-full">
          <span className="sr-only">Colors available</span>
          {product.colors?.map((color) => (
            <button
              style={{ backgroundColor: color }}
              className="p-3 border rounded-full"
            ></button>
          ))}
        </div>
      </Link>

      <div className=" flex items-center justify-between ">
        {isInCart && (
          <>
            <Button
              className="w-[100px] text-center relative bottom-0 h-16 mt-3  font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50 hover:scale-105  duration-500 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromCart();
              }}
              variant={"outline"}
            >
              <CircleMinus className="w-8 h-8" />
            </Button>
            <div className=" text-primary mt-1 mx-4">{isInCart?.count}</div>
          </>
        )}

        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          variant={"outline"}
          style={{ width: isInCart ? 100 : "100%" }}
          className="  relative bottom-0 h-16 mt-3  font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50 hover:scale-105  duration-500 rounded-lg"
        >
          <PlusCircle className="w-8 h-8" />
        </Button>
      </div>
    </article>
  );
};

export default ProductItem;
