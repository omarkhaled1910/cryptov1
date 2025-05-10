import React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IOrder } from "@/models/order";
import Link from "next/link";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }: { row: Row<IOrder> }) => {
      return (
        <Link
          href={`/dashboard/orders/${row.original.id}`}
          className="font-medium hover:underline"
        >
          {row.original.id}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<IOrder> }) => {
      const status = row.original.status;
      let variant: "default" | "destructive" | "outline" | "secondary" =
        "default";

      switch (status) {
        case "pending":
          variant = "outline";
          break;
        case "processing":
          variant = "secondary";
          break;
        case "shipped":
          variant = "default";
          break;
        case "delivered":
          variant = "default";
          break;
        case "cancelled":
          variant = "destructive";
          break;
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }: { row: Row<IOrder> }) => {
      return (
        <div className="font-medium">${row.original.total.toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }: { row: Row<IOrder> }) => {
      return <div>{row.original.items.length} items</div>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }: { row: Row<IOrder> }) => {
      return <div className="capitalize">{row.original.paymentMethod}</div>;
    },
  },
  {
    accessorKey: "shippingDetails",
    header: "Shipping Details",
    cell: ({ row }: { row: Row<IOrder> }) => {
      const details = row.original.shippingDetails;
      return (
        <div className="space-y-1">
          <div>{details.street}</div>
          <div className="text-sm text-muted-foreground">
            {details.city}, {details.country}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }: { row: Row<IOrder> }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </div>
      );
    },
  },
];
