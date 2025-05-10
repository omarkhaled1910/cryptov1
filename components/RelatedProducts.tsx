"use client";

import React, { useState } from "react";
import { Product } from "@/constants/productTable";
import { getProductsByTags } from "@/app/actions/product";
import Link from "next/link";
import Image from "next/image";
import RatingStars from "./RatingStars";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface RelatedProductsProps {
  tags: string[];
  currentProductId: string;
}

const ITEMS_PER_PAGE = 4;

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  tags,
  currentProductId,
}) => {
  const [start, setStart] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["relatedProducts", tags, currentProductId, start],
    queryFn: async () => {
      const data = await getProductsByTags(tags, start, ITEMS_PER_PAGE);
      return data.filter((product: Product) => product.id !== currentProductId);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  console.log(products, "products", displayedProducts);
  // Update displayed products when new data is fetched
  React.useEffect(() => {
    if (products.length > 0) {
      setDisplayedProducts((prev) => [...prev, ...products]);
    }
  }, [products]);

  const handleShowMore = () => {
    setStart((prev) => prev + ITEMS_PER_PAGE);
  };

  if (isLoading && displayedProducts.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg h-64"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load related products</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (displayedProducts.length === 0) {
    return <></>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedProducts.map((product: Product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-gray-500 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <RatingStars rating={Math.random() * 2 + 3} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {products.length === ITEMS_PER_PAGE && (
        <div className="text-center mt-8">
          <Button
            onClick={handleShowMore}
            disabled={isLoading}
            className="px-6 py-2"
          >
            {isLoading ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
