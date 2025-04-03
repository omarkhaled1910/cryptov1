import AddToCartUserButtons from "@/components/AddToCartUserButtons";
import ProducImagesViewer from "@/components/ProducImagesViewer";
import { Button } from "@/components/ui/button";
import { Product } from "@/constants/productTable";
import React from "react";

const ProductDetailsWrapper = ({ product }: { product: Product }) => {
  console.log(product);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <ProducImagesViewer images={product?.images || []} />

        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">SKU: WH1000XM4</p>
          <div className="mb-4">
            <span className="text-2xl font-bold mr-2">
              {product.price || "$39.99"}
            </span>
            <span className="text-gray-500 line-through">
              {product.oldPrice || "$399.99"}
            </span>
          </div>
          <div className="flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-yellow-500"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-yellow-500"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-yellow-500"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-yellow-500"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 text-yellow-500"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
          </div>
          <p className="text-gray-700 mb-6">
            Experience premium sound quality and industry-leading noise
            cancellation with these wireless headphones. Perfect for music
            lovers and frequent travelers.
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
    </div>
  );
};

export default ProductDetailsWrapper;
