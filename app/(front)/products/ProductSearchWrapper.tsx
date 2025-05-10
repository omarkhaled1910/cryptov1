"use client";
import { getProducts } from "@/app/actions/product";
import InfiniteViewer from "@/components/InfiniteViewr";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ProductSearchWrapper = ({ data }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState("");
  const [currentItems, setcurrentItems] = useState(data);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
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
    const newCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];
    setCategories(newCategories);
    updateSearchParams(newCategories, debouncedPriceRange);
  };

  const handlePriceChange = (value: number[]) => {
    const newRange = [value[0], value[1]] as [number, number];
    setPriceRange(newRange);
  };

  // Debounce the price range updates
  useEffect(() => {
    const timer = setTimeout(() => {
      /// call ur api here
      setDebouncedPriceRange(priceRange);
      updateSearchParams(categories, priceRange);
    }, 1000);

    return () => clearTimeout(timer);
  }, [priceRange, categories]);

  const updateSearchParams = (
    selectedCategories: string[],
    priceRange: [number, number]
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    params.set("minPrice", priceRange[0].toString());
    params.set("maxPrice", priceRange[1].toString());

    router.push(`/products?${params.toString()}`);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl container ">
        <div className="relative isolate overflow-hidden dark:bg-slate-900 bg-white  text-center sm:shadow-sm rounded-md">
          {/* <form action={handleSearch}>
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
          </form> */}
          <div className="p-4 space-y-6 flex flex-col  w-full">
            <div className="space-y-4 w-full">
              <h3 className="text-lg font-semibold">Categories</h3>
              <div className="space-y-2 flex items-end gap-2 justify-center">
                {["wooden", "plastic", "glass"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={categories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={category} className="capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 w-full">
              <h3 className="text-lg font-semibold">Price Range</h3>
              <div className="px-4">
                <Slider
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
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
        categories={categories}
        priceRange={priceRange}
      />
    </>
  );
};

export default ProductSearchWrapper;
