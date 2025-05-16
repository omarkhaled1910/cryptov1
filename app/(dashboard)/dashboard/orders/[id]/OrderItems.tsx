"use client";

import { Product } from "@/constants/productTable";
import { IOrder } from "@/models/order";
import { use, useEffect, useState } from "react";

interface OrderItem extends Product {
  id: string;
  count: number;
}

interface OrderItemsProps {
  items: IOrder["items"];
  itemsStckCountPromise: Promise<OrderItem[]>;
}

export function OrderItems({ items, itemsStckCountPromise }: OrderItemsProps) {
  const stockCounts = use(itemsStckCountPromise);

  console.log(
    itemsStckCountPromise,
    "itemsStckCountPromiseitemsStckCountPromise",

    stockCounts
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Items</h2>
      <div className="space-y-2">
        {items.map((item, index: number) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-2"
          >
            <span className="text-sm">Item ID: {item.name}</span>
            <div className="flex gap-4">
              <span className="text-sm font-medium">Count: {item.count}</span>
              <span className="text-sm font-medium">
                Left Stock: {stockCounts[index].count ?? "Loading..."}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
