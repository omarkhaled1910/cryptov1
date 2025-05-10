"use client";

import { getAllOrders } from "@/app/actions/order";
import { DataTable } from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import { ROWS_PER_PAGE } from "@/constants";
import { columns } from "@/constants/ordersTable";
import { IOrder } from "@/models/order";
import React, { useState } from "react";

interface OrdersData {
  orders: IOrder[];
  ordersCount: number;
}

const OrdersWrapper = ({ initialData }: { initialData: OrdersData }) => {
  const [orders, setOrders] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const queryOrders = async (formData: FormData) => {
    const search = formData.get("orderQuery");
    if (!search) {
      setOrders(initialData);
      return;
    }
    const data = await getAllOrders(
      `limit=${ROWS_PER_PAGE}&search=${searchQuery}`
    );
    setOrders(data);
  };

  return (
    <>
      <SearchBar
        name="orderQuery"
        onSubmit={queryOrders}
        classNames="pb-6 h-[80px] w-3/4"
        onChange={setSearchQuery}
      />
      <div
        style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
        className="rounded-md bg-zinc-100 dark:bg-zinc-900 space-x-4"
      >
        <DataTable
          fetcher={getAllOrders}
          accssKey={"orders"}
          count={orders.ordersCount}
          columns={columns}
          data={orders.orders || []}
          searchQuery={searchQuery}
          classNames="dark:bg-[#000012] rounded-lg"
        />
      </div>
    </>
  );
};

export default OrdersWrapper;
