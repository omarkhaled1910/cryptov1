"use client";
import React, { useState } from "react";
import OrderSummary from "./OrderSummary";
import DiscountCodeHandler from "./DiscountCodeHandler";
import DeliveryDetails from "./DeliveryDetails";
import CheckOutAuth from "./CheckOutAuth";
import { useAuthContext } from "@/providers/auth-provider";
import { createOrder } from "@/app/actions/order";
import { useCartContext } from "@/providers/cart-provider";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import PaymentMethodSelector from "./PaymentMethodSelector";

const CheckOutView = ({ shippingDetails }: any) => {
  const [ddDetails, setDdDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { state } = useCartContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

  const handleCreateOrder = async () => {
    try {
      setIsLoading(true);
      const cartItems = state.cart || [];
      const total = cartItems.reduce(
        (sum: number, item: any) => sum + item.price * item.count,
        0
      );

      const order = await createOrder({
        userId: state.user_id,
        shippingDetails: ddDetails,
        paymentMethod,
        items: cartItems,
        total,
      });

      toast({
        title: "Order created successfully",
        description: `Order ${order.id} created successfully`,
      });
      navigate.push(`/client-orders/${order.id}`);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white px-8 py-8 antialiased dark:bg-gray-900 md:py-16 md:px-16">
      <CheckOutAuth />

      <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
        <div className="min-w-0 flex-1 space-y-8">
          <div className="space-y-8">
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            {/* Delivery Details Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <DeliveryDetails
                currentShippingAdress={ddDetails}
                handleChooseShippingAdress={setDdDetails}
              />
            </div>

            {/* Payment Methods Section */}
          </div>
        </div>

        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
          <OrderSummary
            shippingDetails={ddDetails}
            paymentMethod={paymentMethod}
            onCreateOrder={handleCreateOrder}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default CheckOutView;
