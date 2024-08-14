import { UpdateProductDto } from "@/app/api/product/route";
import RadioButtons from "@/components/RadioButtons";
import { Label } from "@/components/ui/label";
import { Product } from "@/constants/productTable";
import React from "react";

const ProductForm = ({ initialVlaues }: { initialVlaues?: Product }) => {
  return (
    <>
      <div className="mb-4 md:mr-2 md:mb-0">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Product Name
        </label>
        <input
          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="firstName"
          type="text"
          placeholder="First Name"
          name="name"
          defaultValue={initialVlaues?.name}
        />
      </div>
      <br />
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Product Desc
        </label>
        <textarea
          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="Desc"
          rows={6}
          name="description"
          defaultValue={initialVlaues?.description}
        />
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Price Before
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="oldPrice"
            placeholder="250"
            name="oldPrice"
          />
          {/* <p className="text-xs italic text-red-700  dark:text-red-400">
            Please choose a price.
          </p> */}
        </div>
        <div className="md:ml-2">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Price After
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="price_after"
            placeholder="180"
            name="price"
            defaultValue={initialVlaues?.price}
          />
        </div>
        <div className="md:ml-2">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Count
          </label>
          <input
            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="price_after"
            placeholder="180"
            name="price"
            defaultValue={initialVlaues?.count}
          />
        </div>
        <div className="md:ml-2">
          <Label>Status</Label>
          <RadioButtons
            defaultValue={initialVlaues?.status}
            options={[
              { label: "In Stock", value: "inStock" },
              { label: "Out OF Stock", value: "outStock" },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default ProductForm;
