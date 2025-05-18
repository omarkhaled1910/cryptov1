"use client";
import React from "react";
import { Button } from "./ui/button";
import { useCartContext } from "@/providers/cart-provider";
import { CircleMinus, PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AddToCartUserButtons = ({ product }: any) => {
  const { state, dispatch } = useCartContext();
  const { toast } = useToast();
  const isInCart = state?.cart?.find((item: any) => item.id === product?.id);
  const productCount = product.count ?? 0;

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  const handleAddToCart = () => {
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
    <div className="flex items-center space-x-4 mb-6">
      {isInCart ? (
        <>
          <Button
            onClick={handleRemoveFromCart}
            variant="outline"
            className="h-12 w-12 p-0 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <CircleMinus className="w-6 h-6" />
          </Button>
          <div className="mx-4 text-lg font-medium text-slate-900 dark:text-white">
            {isInCart.count}
          </div>
          <Button
            onClick={handleAddToCart}
            className="h-12 w-12 p-0 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={isInCart.count >= productCount}
          >
            <PlusCircle className="w-6 h-6" />
          </Button>
        </>
      ) : (
        <Button
          onClick={handleAddToCart}
          variant="default"
          disabled={productCount === 0}
          className="flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          {productCount === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartUserButtons;
