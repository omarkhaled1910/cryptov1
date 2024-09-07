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
