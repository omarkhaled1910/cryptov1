import { getProducts } from "@/app/actions/product";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Plus, PlusSquare } from "lucide-react";
import React, { ReactElement } from "react";
import { columns } from "@/constants/productTable";
import { DataTable } from "@/components/ProductTable";
import { ROWS_PER_PAGE } from "@/constants";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import CodesWrapper from "./CodesWrapper";
import { getAllDiscountCodes } from "@/app/actions/codes";
import Link from "next/link";

const DiscountCodesPage = async ({
  children,
  params: { locale },
  searchParams,
}: {
  children: ReactElement;
  params: { locale: string };
  searchParams: any;
}) => {
  const data = await getAllDiscountCodes(`limit=${ROWS_PER_PAGE}`);
  return (
    <main className="flex  flex-col py-4   ">
      <div className="flex justify-between w-full ">
        <h2 className=" text-xl text-center">Our Discount Codes</h2>
        <Link href="codes/add">
          <Button variant={"outline"}>
            <Plus />
          </Button>
        </Link>
      </div>
      <br />
      <CodesWrapper initialData={data} />
    </main>
  );
};

export default DiscountCodesPage;