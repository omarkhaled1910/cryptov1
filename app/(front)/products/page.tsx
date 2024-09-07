import { getProducts } from "@/app/actions/product";
import InfiniteViewer from "@/components/InfiniteViewr";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { PlusSquare } from "lucide-react";
import React, { ReactElement } from "react";
import ProductSearchWrapper from "./ProductSearchWrapper";

const Products = async ({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) => {
  const data = await getProducts(`limit=${10}`);

  return (
    <main className="   p-4  ">
      <br />
      <ProductSearchWrapper data={data} />
    </main>
  );
};

export default Products;
