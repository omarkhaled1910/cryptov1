import { getProduct } from "@/app/actions/product";
import { Button } from "@/components/ui/button";
import React from "react";
import ProductDetailsWrapper from "../ProductDetailsWrapper";

const ProductDeatilsPage = async ({ params }: { params: { id: string } }) => {
  const { product } = await getProduct(params.id);

  return <ProductDetailsWrapper product={product} />;
};

export default ProductDeatilsPage;
