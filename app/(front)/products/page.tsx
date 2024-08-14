import { getProducts } from "@/app/actions/product";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { PlusSquare } from "lucide-react";
import React, { ReactElement } from "react";

const Products = async ({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) => {
  const data = await getProducts();

  return (
    <main className="flex min-h-screen flex-col   p-20 ">
      <div className="flex justify-between w-full ">
        <h2 className=" text-xl text-center">Our Products</h2>
        <a href="product/add">
          <PlusSquare className=" h-9 w-9 cursor-pointer" />
        </a>
      </div>
      <br />
      <div className=" rounded-md   bg-zinc-100 dark:bg-zinc-900 space-x-4">
        <HoverEffect
          className="p-4 py-24"
          items={data.product.map((item: any) => ({
            title: item.name,
            description: item.name,
            link: `/dashboard/product/${item.id}`,
          }))}
        />
      </div>
    </main>
  );
};

export default Products;
