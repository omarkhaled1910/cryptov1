"use client";
import { getProducts } from "@/app/actions/product";
import InfiniteViewer from "@/components/InfiniteViewr";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState } from "react";

const ProductSearchWrapper = ({ data }: any) => {
  const [slug, setSlug] = useState("");
  const [currentItems, setcurrentItems] = useState(data);
  const handleSearch = (search: FormData) => {
    const q = search.get("q") as string;
    if (q) {
      // setCurrentProducts(getProductsByTitle(products, q));
    } else {
      // setCurrentProducts(products);
    }
  };

  const handlePriceSort = async (e: FormData) => {
    //   if (slug) {
    //     setCurrentProducts(
    //       sortProductsByPrice(
    //         currentProducts,
    //         e.get("priceFilter") as "asc" | "desc"
    //       )
    //     );
    //     return;
    //   }
    //   const soretedProducts = await getProductsByPrice(
    //     e.get("priceFilter") as "asc" | "desc"
    //   );
    //   setCurrentProducts(soretedProducts);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl container ">
        <div className="relative isolate overflow-hidden dark:bg-slate-900 bg-white  px-6 py-10 text-center sm:px-16 sm:shadow-sm rounded-md">
          <p className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-400 sm:text-4xl">
            Didnt find Product you were looking for?
          </p>

          <form action={handleSearch}>
            <label className="mx-auto mt-8 relative dark:bg-slate-500 bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
              <input
                id="search-bar"
                placeholder="your keyword here"
                name="q"
                className="px-6 py-2 w-full rounded-md flex-1 outline-none dark:bg-slate-500 bg-white"
                onChange={(e) => {
                  e.target.form?.requestSubmit();
                  setSlug(e.target.value);
                }}
              />
            </label>
          </form>
          {/* <div className="mt-4 "> Sort By Price</div>
          <div className="flex items-center justify-center mt-1 py-3 space-y-2">
            <form className=" gap-2" action={handlePriceSort}>
              <Button
                name="priceFilter"
                value={"asc"}
                className="relative"
                type="submit"
                variant="outline"
              >
                Asc <ArrowUp />
              </Button>
              <Button
                name="priceFilter"
                value={"desc"}
                className="relative"
                type="submit"
                variant="outline"
              >
                Desc <ArrowDown />
              </Button>
            </form>
          </div> */}

          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx="512"
              cy="512"
              r="512"
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            ></circle>
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#3b82f6"></stop>
                <stop offset="1" stopColor="#1d4ed8"></stop>
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <InfiniteViewer
        fetchFn={getProducts}
        initialData={currentItems?.product}
        loadMoreCount={10}
        totalCount={currentItems?.productsCount}
        searchSlug={slug}
      />
    </>
  );
};

export default ProductSearchWrapper;
