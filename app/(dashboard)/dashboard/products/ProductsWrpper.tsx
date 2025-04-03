"use client";

import { getProducts } from "@/app/actions/product";
import { DataTable } from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import { ROWS_PER_PAGE } from "@/constants";
import { columns } from "@/constants/productTable";
import React, { useState } from "react";

const ProductsWrpper = ({ initialData }: { initialData: any }) => {
  const [products, setProducts] = useState(initialData);
  const [searchQuery, setsearchQuery] = useState("");
  const queryProducts = async (formData: FormData) => {
    console.log(formData.get("productQuery"));
    const search = formData.get("productQuery");
    if (!search) {
      setProducts(initialData);
      return;
    }
    const data = await getProducts(`limit=${ROWS_PER_PAGE}&search=${search}`);
    console.log(data);
    setProducts(data);
  };
  console.log(products);
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
          fetcher={getProducts}
          accssKey={"product"}
          count={products?.productsCount}
          columns={columns}
          data={products?.product}
          searchQuery={searchQuery}
          classNames="dark:bg-[#000012]  rounded-lg"
        />
      </div>
    </>
  );
};

export default ProductsWrpper;
