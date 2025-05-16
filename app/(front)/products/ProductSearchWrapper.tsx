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

const ProductSearchWrapper = ({ data }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState("");
  const [currentItems, setcurrentItems] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("");
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

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    router.push(`/products?${params.toString()}`);
  };

  const priceRanges = [
    { value: "0", label: "Any Price" },
    { value: "50", label: "Under $50" },
    { value: "100", label: "Under $100" },
    { value: "200", label: "Under $200" },
    { value: "500", label: "Under $500" },
    { value: "1000", label: "Under $1000" },
  ];

  const categories = [
    { value: "DEFAULT", label: "All Categories" },
    { value: "wooden", label: "Wooden" },
    { value: "plastic", label: "Plastic" },
    { value: "glass", label: "Glass" },
  ];

  const sortBy = [
    { value: "DEFAULT", label: "Default" },
    { value: "price", label: "Price" },
    { value: "name", label: "Name" },
  ];

  const size = [
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
  ];

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
      <div className="mx-auto max-w-7xl container">
        <div className="relative isolate overflow-hidden dark:bg-slate-900 bg-white text-center sm:shadow-sm rounded-md">
          <div className="p-4 space-y-6 flex flex-col w-full">
            <div className="space-y-4 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <Select
                    value={selectedCategory || "DEFAULT"}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger className="w-full">
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

                <div className="space-y-2">
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Sort By
                  </label>
                  <Select
                    value={selectedCategory || "DEFAULT"}
                    onValueChange={handleSortByChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortBy.map((category) => (
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Size
                  </label>
                  <Select
                    value={selectedCategory || "DEFAULT"}
                    onValueChange={handleSizeChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {size.map((category) => (
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
