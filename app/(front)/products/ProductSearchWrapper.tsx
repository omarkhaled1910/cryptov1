"use client";
import { getProducts } from "@/app/actions/product";
import InfiniteViewer from "@/components/InfiniteViewr";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { priceRanges, categories, size, sortBy } from "@/constants";
const ProductSearchWrapper = ({ data }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState("");
  const [currentItems, setcurrentItems] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [debouncedPriceRange, setDebouncedPriceRange] = useState<
    [number, number]
  >([0, 1000]);

  const handleSearch = (search: FormData) => {
    const q = search.get("q") as string;
    if (q) {
      // setCurrentProducts(getProductsByTitle(products, q));
    } else {
      // setCurrentProducts(products);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateSearchParams(category, debouncedPriceRange);
  };

  const handlePriceChange = (value: string) => {
    const newRange = [0, parseInt(value)] as [number, number];
    setPriceRange(newRange);
  };

  // Debounce the price range updates
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
      updateSearchParams(selectedCategory, priceRange);
    }, 1000);

    return () => clearTimeout(timer);
  }, [priceRange, selectedCategory]);

  const updateSearchParams = (
    category: string,
    priceRange: [number, number]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleSortByChange = (value: string) => {
    setSelectedSortBy(value);
    // updateSearchParams(selectedCategory, priceRange, value);
  };

  const handleSizeChange = (value: string) => {
    setSelectedSize(value);
    // updateSearchParams(selectedCategory, priceRange, value);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl sm:container">
        <div className="relative isolate overflow-hidden dark:bg-slate-900 bg-white text-center sm:shadow-sm rounded-md">
          <div className="p-4 space-y-6 flex flex-col w-full">
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2 text-start">
                  <label className="text-sm text-start font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <Select
                    value={selectedCategory || "DEFAULT"}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full text-start">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value || "DEFAULT"}
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 text-start">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price Range
                  </label>
                  <Select
                    value={priceRange[1].toString() || "DEFAULT"}
                    onValueChange={handlePriceChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem
                          key={range.value}
                          value={range.value || "DEFAULT"}
                        >
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 text-start">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort By
                  </label>
                  <Select
                    value={selectedSortBy || "DEFAULT"}
                    onValueChange={handleSortByChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortBy.map((sortBy) => (
                        <SelectItem
                          key={sortBy.value}
                          value={sortBy.value || "DEFAULT"}
                        >
                          {sortBy.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 text-start">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Size
                  </label>
                  <Select value={selectedSize} onValueChange={handleSizeChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {size.map((sizeOpt) => (
                        <SelectItem
                          key={sizeOpt.value}
                          value={sizeOpt.value || "DEFAULT"}
                        >
                          {sizeOpt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

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
        categories={selectedCategory ? [selectedCategory] : []}
        priceRange={priceRange}
      />
    </>
  );
};

export default ProductSearchWrapper;
