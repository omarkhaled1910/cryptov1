import AddToCartUserButtons from "@/components/AddToCartUserButtons";
import ProducImagesViewer from "@/components/ProducImagesViewer";
import { Button } from "@/components/ui/button";
import { Product } from "@/constants/productTable";
import React from "react";
import Comments from "@/components/Comments";
import RatingStars from "@/components/RatingStars";
import RelatedProducts from "@/components/RelatedProducts";
import { categories } from "@/constants";
import Link from "next/link";
import { ArrowBigRightDash } from "lucide-react";

const ProductDetailsWrapper = ({ product }: { product: Product }) => {
  const generateRandomRating = () => {
    return Math.floor(Math.random() * 4) + 3;
  };
  console.log(product, "product");
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <Link
        href="/products"
        className="fixed bottom-6 flex text-xs items-center right-6 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md shadow-lg transition-all duration-200 z-50"
      >
        Continue Shopping
        <ArrowBigRightDash />
      </Link>
      <div className="flex flex-wrap -mx-4">
        <ProducImagesViewer images={product?.images || []} />

        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">
            Category:{" "}
            {categories.find((category) => category.value === product.category)
              ?.label || "NA"}
          </p>
          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">
              {product.price || "$39.99"} EGPs
            </span>
            <span className="text-gray-500 line-through">
              {product.oldPrice || "$399.99"} EGP
            </span>
          </div>
          <div className="mb-4">
            <RatingStars rating={generateRandomRating()} />
          </div>
          <p className="text-gray-700 mb-6">
            {product.description ||
              " Experience premium sound quality and industry-leading noisecancellation with these wireless headphones. Perfect for musiclovers and frequent travelers."}
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Colors:</h3>
            <div className="flex space-x-2">
              {product?.colors?.map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-full  "
                ></button>
              ))}
            </div>
          </div>

          {/* <div className="mb-6">
          <label for="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
          <input type="number" id="quantity" name="quantity" min="1" value="1"
                        className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        </div> */}

          <AddToCartUserButtons product={product} />
          <div>
            <h3 className="text-lg font-semibold mb-2">Key Tags:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {product?.tags?.map((tag) => (
                <li key={tag}>
                  {tag || "Industry-leading noise cancellation"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <RelatedProducts
        tags={product.tags || []}
        currentProductId={product.id}
      />
      <Comments productId={product.id} comments={product?.comments || []} />
    </div>
  );
};

export default ProductDetailsWrapper;
