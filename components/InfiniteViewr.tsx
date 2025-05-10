"use client";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HoverEffect } from "./ui/card-hover-effect";
import DotsLoader from "./ui/dost-loader";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProductItem from "./ProductItem";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const InfiniteViewer = ({
  initialData = [],
  totalCount,
  loadMoreCount = 20,
  fetchFn,
  searchSlug,
  categories,
  priceRange,
}: {
  initialData: any[];
  totalCount: number;
  loadMoreCount?: number;
  fetchFn: (query: string) => Promise<any>;
  searchSlug?: string;
  categories?: string[];
  priceRange?: [number, number];
}) => {
  const [items, setItems] = useState<Array<any>>(initialData);
  const [totalItemsCount, setTotalItemsCount] = useState(totalCount);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMoreData = async () => {
    if (items.length >= totalItemsCount) {
      setHasMore(false);
      return;
    }
    // Simulate a fake async API call
    const moreData = await fetchFn(
      `skip=${items.length}&limit=${loadMoreCount}&search=${searchSlug}`
    );

    setTimeout(() => {
      setItems((prevItems) => prevItems.concat(moreData.product));
    }, 100);
  };
  useEffect(() => {
    if (!searchSlug) return;
    const handleSearch = async () => {
      const moreData = await fetchFn(
        `skip=${0}&limit=${loadMoreCount}&search=${searchSlug}&categories=${categories}&minPrice=${
          priceRange?.[0]
        }&maxPrice=${priceRange?.[1]}`
      );
      console.log(moreData, " useefect search");
      const newItems = [...items, ...moreData.product];
      newItems.length === moreData.productsCount
        ? setHasMore(false)
        : setHasMore(true);
      setItems(moreData.product);
      setTotalItemsCount(moreData.productsCount);
    };

    handleSearch();
  }, [searchSlug]);

  console.log(items, totalItemsCount);
  return (
    <div className="pb-20">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<DotsLoader />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* <HoverEffect
          className="p-4 "
          items={items.map((item: any) => ({
            title: item.name,
            description: item.name,
            link: `/product/${item.id}`,
          }))}
        /> */}
        <div
          className={cn(
            "container grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4  py-10  overflow-x-hidden"
          )}
        >
          {items.map((item, idx) => (
            <div
              // href={`/product/${item.id}`}
              key={item?.id}
              className="relative group  block p-2 h-full w-full"
            >
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteViewer;
