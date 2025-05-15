"use client";

import React from "react";
import { useAuthContext } from "@/providers/auth-provider";
import { Button } from "./ui/button";
import { useCartContext } from "@/providers/cart-provider";
import Image from "next/image";
import DiscountCodeHandler from "./DiscountCodeHandler";

interface OrderSummaryProps {
  shippingDetails: any;
  paymentMethod: string;
  onCreateOrder: () => Promise<void>;
  isLoading: boolean;
}

const OrderSummary = ({
  shippingDetails,
  paymentMethod,
  onCreateOrder,
  isLoading,
}: OrderSummaryProps) => {
  const { state } = useCartContext();
  const cartItems = state?.cart || [];

  const subtotal = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.count,
    0
  );

  console.log(cartItems, "cartItems");

  const shippingCost = shippingDetails?.id ? 15 : 0;
  const total = subtotal + shippingCost;

  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Order Summary
      </h3>

      <div className="space-y-4">
        {cartItems.map((item: any) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  width={100}
                  height={100}
                  src={item?.images?.[0] || ""}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Qty: {item.count}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              ${(item.price * item.count).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            Subtotal
          </span>
          <span className="text-base font-medium text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            Shipping
          </span>
          <span className="text-base font-medium text-gray-900 dark:text-white">
            ${shippingCost.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            Payment Method
          </span>
          <span className="text-base font-medium text-gray-900 dark:text-white">
            {paymentMethod || "Not selected"}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <span className="text-base font-bold text-gray-900 dark:text-white">
            Total
          </span>
          <span className="text-base font-bold text-gray-900 dark:text-white">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <DiscountCodeHandler />

      <Button
        isLoading={isLoading}
        onClick={onCreateOrder}
        disabled={!shippingDetails?.id || !paymentMethod}
        className="w-full"
      >
        {isLoading ? "Creating Order..." : "Create Order"}
      </Button>
    </div>
  );
};

export default OrderSummary;
