// type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// export const payments: Payment[] = [
//   {
//     id: "728ed52f",
//     amount: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   // ...
// ];

export type Product = {
  id: string;
  price: number;
  name: string;
  status: "inStock" | "outStock";
  count: number;
  oldPrice?: number;

  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export const products: Product[] = [
  {
    id: "728ed52f",
    price: 100,
    status: "inStock",
    name: "m@example.com",
    count: 20,
    description: "",

    createdAt: "",
  },
  {
    id: "489e1d42",
    price: 125,
    status: "outStock",
    name: "example@gmail.com",
    count: 20,
    description: "",
  },
  // ...
];

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "count",
    header: "Count",
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
