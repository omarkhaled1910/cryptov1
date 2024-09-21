import { IDiscountCode } from "@/models/discount-codes";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<IDiscountCode>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }: any) => {
      const count = row.original.count;
      return (
        <Link
          href={`/dashboard/codes/${row.original.id}`}
          className=" rounded-lg w-fit"
        >
          {getValue()}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue, row }: any) => {
      let color: string;

      if (row.original.status === "active") {
        color = "green";
      } else {
        color = "red";
      }

      return (
        <div
          style={{
            color: color,
            padding: "4px",
            backgroundColor: color === "red" ? "#fdd" : "#ddf",
          }}
          className=" rounded-lg w-max"
        >
          {row.original.status}
        </div>
      );
    },
  },
  {
    accessorKey: "validFrom",
    header: " Valid From",
  },
  {
    accessorKey: "validTo",
    header: "Valid To",
  },

  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
    cell: ({ getValue, row }: any) => {
      const count = row.original.discountPercentage;
      return <div className=" rounded-lg w-fit">{count} %</div>;
    },
  },

  {
    accessorKey: "createdBy",
    header: "Created By",
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
