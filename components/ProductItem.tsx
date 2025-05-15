"use client";

import React from "react";
import { Product } from "@/constants/productTable";
import { useCartContext } from "@/providers/cart-provider";
import { CircleMinus, PlusCircle, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const ProductItem = ({ product }: { product: Product }) => {
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
    if (productCount === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently out of stock.",
        variant: "destructive",
      });
      return;
    }

    // if (productCount < 5) {
    //   toast({
    //     title: "Low Stock Warning",
    //     description: "Limited stock available!",
    //     variant: "default",
    //   });
    // }

    dispatch({ type: "ADD_ITEM", payload: product });
  };
  console.log(percentSale, product);

  return (
    <div className="relative m-4 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white  shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
      >
        <Image
          className="object-cover"
          src={
            product?.images?.[0] ||
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=60"
          }
          alt={product.name}
          fill
        />
        <div className="absolute top-0 flex gap-1 left-0 m-2 rounded-full  text-sm font-medium text-white">
          {percentSale && (
            <span className="bg-black px-2 text-sm font-medium text-white rounded-full opacity-70">
              {percentSale}% OFF
            </span>
          )}
          {isLowOnStock && productCount && (
            <span className="bg-black px-2 text-sm font-medium text-white rounded-full opacity-70">
              Only {productCount} left
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-black px-2 text-sm font-medium text-white rounded-full opacity-70">
              Sold Out
            </span>
          )}
        </div>
      </Link>

      <div className="mt-4 px-5 pb-5 flex flex-col justify-between h-full">
        <div>
          <h5 className="text-xl tracking-tight text-slate-900">
            {product.name}
          </h5>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ${product.price}
              </span>
              <span className="text-sm text-slate-900 line-through ml-2">
                ${Math.round(product.price * 1.6)}
              </span>
            </p>
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              <span className="ml-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                5.0
              </span>
            </div>
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
                className="h-12 w-12 p-0"
              >
                <CircleMinus className="w-6 h-6" />
              </Button>
              <div className="mx-4 text-lg font-medium  text-black">
                {isInCart.count}
              </div>
            </>
          )}

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="flex-1 h-12 font-medium text-white bg-slate-900 hover:bg-gray-700"
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
