"use client";

import React from "react";
import { useCartContext } from "@/providers/cart-provider";
import { CircleMinus, PlusCircle, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/models/product";
import { Meow_Script } from "next/font/google";

const meow = Meow_Script({ weight: "400", subsets: ["latin-ext"] });

const ProductItem = ({ product }: { product: IProduct }) => {
  const { state, dispatch } = useCartContext();
  const { toast } = useToast();
  const isInCart = state?.cart?.find((item: any) => item.id === product?.id);
  const productCount = product.count ?? 0;
  const percentSale =
    product?.oldPrice &&
    Math.round(((product?.oldPrice - product.price) / product?.oldPrice) * 100);

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };
  const isLowOnStock = productCount < 5;
  const isOutOfStock = productCount === 0;

  const handleAddToCart = () => {
    if (!isInCart) {
    }
    if (productCount === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    const currentCartCount = isInCart?.count || 0;
    if (currentCartCount + 1 > productCount) {
      toast({
        title: "Stock Limit Reached",
        description: `You can only add up to ${productCount} items of this product.`,
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div className=" h-full justify-between hover:shadow-lg hover:scale-105 transition-all duration-400 relative flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 group">
      <Link
        href={`/product/${product.id}`}
        className="relative  flex h-80 overflow-hidden rounded-xl"
      >
        <Image
          className="object-contain"
          src={product?.images?.[0] || "/s.webp"}
          alt={product.name}
          fill
        />
        <div className="absolute top-0 flex gap-1 left-0 m-2 rounded-full text-sm font-medium text-white">
          {!!percentSale && (
            <span className="bg-black px-2 text-sm font-medium text-white rounded-full opacity-70 dark:bg-gray-900">
              {percentSale}% OFF
            </span>
          )}
          {!!isLowOnStock && !!productCount && (
            <span className="bg-black px-2 text-sm font-medium text-white rounded-full opacity-70 dark:bg-gray-900">
              Only {productCount} left
            </span>
          )}
          {!!isOutOfStock && (
            <span className="bg-black px-2 text-sm font-medium text-white rounded-full opacity-70 dark:bg-gray-900">
              Sold Out
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4 gap-2 px-2 pb-1 flex flex-col justify-end h-max">
        <div>
          <h5
            className={`text-3xl tracking-tight text-slate-900 dark:text-white ${meow.className}`}
          >
            {product.name}
          </h5>
          <div className="mt-1 2 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900 dark:text-white">
                {product.price || 100} <span className="text-xs"> EGP</span>
              </span>
              {product.oldPrice && (
                <span className="text-sm text-slate-900 line-through ml-2 dark:text-gray-400">
                  {Math.round(product.oldPrice || 0)}
                  <span className="text-xs"> EGP</span>
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-900">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            <span className="ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold dark:bg-yellow-900 dark:text-yellow-200">
              5.0
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {isInCart && (
            <>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromCart();
                }}
                variant="outline"
                className="h-12 w-12 p-0 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <CircleMinus className="w-6 h-6" />
              </Button>
              <div className="mx-4 text-lg font-medium text-slate-900 dark:text-white">
                {isInCart.count}
              </div>
            </>
          )}

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex-1 h-12 font-medium text-white bg-slate-900 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            disabled={productCount === 0}
          >
            {!!productCount && <PlusCircle className="w-5 h-5 mr-2" />}
            {productCount === 0
              ? "Out of Stock"
              : !!isInCart
              ? ""
              : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
