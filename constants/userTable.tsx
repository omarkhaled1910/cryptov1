import { IClient } from "@/models/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type User = {
  id: string;
  email: string;
  name: string;
  phone_number?: string;
  createdAt?: string;
  updatedAt?: string;
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }: any) => {
      const count = row.original.count;
      return (
        <Link
          href={`/dashboard/product/edit/${row.original.id}`}
          className=" rounded-lg w-fit"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];

export const clientColumns: ColumnDef<IClient>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }: any) => {
      const count = row.original.count;
      return (
        <Link
          href={`/dashboard/product/edit/${row.original.id}`}
          className=" rounded-lg w-fit"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "phone_Number",
    header: "Number",
  },
  {
    accessorKey: "shipping_Details",
    header: "Shipping Addresses",
    cell: ({ getValue, row }: any) => {
      const count = row.original.shipping_Details.length;
      return <div className="text-center">{count}</div>;
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
  },
];
