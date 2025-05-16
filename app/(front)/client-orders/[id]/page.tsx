"use client";
import React from "react";
import { getOrderById } from "@/app/actions/order";
import { useAuthContext } from "@/providers/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  count: number;
  image: string;
}

interface ShippingDetails {
  country: string;
  city: string;
  street: string;
  id: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
  shippingDetails: ShippingDetails;
  paymentMethod: string;
}

const OrderDetails = ({ order }: { order: Order }) => {
  return (
    <div className="space-y-8 ">
      {/* Order Status */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Order Status
          </h2>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              order.status === "pending"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                : order.status === "processing"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : order.status === "shipped"
                ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                : order.status === "delivered"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
        <div className="flex items-start  justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Order #{order.id.slice(0, 8)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Order Items
        </h2>
        <div className="space-y-4 max-h-[50vh] overflow-auto">
          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    width={64}
                    height={64}
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Qty: {item.count}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {(item.price * item.count).toFixed(2)}{" "}
                <span className="text-xs">EGP</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Details */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Shipping Details
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {order.shippingDetails.street}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {order.shippingDetails.city}, {order.shippingDetails.country}
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Payment Method
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {order.paymentMethod.charAt(0).toUpperCase() +
            order.paymentMethod.slice(1)}
        </p>
      </div>

      {/* Order Total */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Order Total
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Total
          </span>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {order.total.toFixed(2)} <span className="text-xs"> EGP</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderDetailsPage = ({ params }: { params: { id: string } }) => {
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", params.id],
    queryFn: () => getOrderById(params.id),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400">
            Order not found or you dont have permission to view this order.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex items-start justify-between">
        <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          Order Details
        </h1>
        <Button>
          <Link href="/client-orders">See all order </Link>
        </Button>
      </div>
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderDetailsPage;
