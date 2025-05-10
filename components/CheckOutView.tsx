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
            {/* Delivery Details Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <DeliveryDetails
                currentShippingAdress={ddDetails}
                handleChooseShippingAdress={setDdDetails}
              />
            </div>

            {/* Payment Methods Section */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                Payment Method
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        aria-describedby="credit-card-text"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === "credit-card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-900 dark:text-white">
                        Credit Card
                      </label>
                      <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Pay with your credit card
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="pay-on-delivery"
                        aria-describedby="pay-on-delivery-text"
                        type="radio"
                        name="payment-method"
                        value="pay-on-delivery"
                        checked={paymentMethod === "pay-on-delivery"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-900 dark:text-white">
                        Payment on delivery
                      </label>
                      <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        +$15 payment processing fee
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="paypal"
                        aria-describedby="paypal-text"
                        type="radio"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                    </div>
                    <div className="ms-4 text-sm">
                      <label className="font-medium leading-none text-gray-900 dark:text-white">
                        Paypal account
                      </label>
                      <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Connect to your account
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
          <OrderSummary
            shippingDetails={ddDetails}
            paymentMethod={paymentMethod}
            onCreateOrder={handleCreateOrder}
            isLoading={isLoading}
          />
          <DiscountCodeHandler />
        </div>
      </div>
    </section>
  );
};

export default CheckOutView;
