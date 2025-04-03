"use client";

import { getAllDiscountCodes } from "@/app/actions/codes";
import { getProducts } from "@/app/actions/product";
import { DataTable } from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import { ROWS_PER_PAGE } from "@/constants";
import { columns } from "@/constants/discountCodesTable";
import React, { useState } from "react";

const CodesWrapper = ({ initialData }: { initialData: any }) => {
  const [products, setProducts] = useState(initialData);
  const [searchQuery, setsearchQuery] = useState("");
  const queryProducts = async (formData: FormData) => {
    console.log(formData.get("productQuery"));
    const search = formData.get("productQuery");
    if (!search) {
      setProducts(initialData);
      return;
    }
    const data = await getAllDiscountCodes(
      `limit=${ROWS_PER_PAGE}&search=${search}`
    );
    console.log(data);
    setProducts(data);
  };
  console.log(products, initialData);
  return (
    <>
      <SearchBar
        name="productQuery"
        onSubmit={queryProducts}
        classNames="pb-6 h-[80px] w-3/4"
        onChange={setsearchQuery}
      />
      <div
        style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
        className=" rounded-md   bg-zinc-100 dark:bg-zinc-900 space-x-4"
      >
        <DataTable
          fetcher={getAllDiscountCodes}
          accssKey={"discountCodes"}
          count={products.discountCodesCount}
          columns={columns}
          data={products.discountCodes || []}
          searchQuery={searchQuery}
          classNames="dark:bg-[#000012]  rounded-lg"
        />
      </div>
    </>
  );
};

export default CodesWrapper;
