import { UpdateProductDto } from "@/app/api/product/route";
import ImageSortableView from "@/components/ImageSortableView";
import ImageUploader from "@/components/ImageUploader";
import MultiSelectDropdown from "@/components/MultiSelect";
import RadioButtons from "@/components/RadioButtons";
import ReactColorsMultiSelect from "@/components/ReactColorsMultiSelect";
import ReactCreatableMultiSelect from "@/components/ReactCreatableMultiSelect";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileUpload } from "@/components/ui/file-upload";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { majorColors } from "@/constants";
import { Product } from "@/constants/productTable";
import { UseUploadImagesResult } from "@/hooks/useUploadImages";
import { mapStringToValue } from "@/lib/react-select-utils";
import { cn } from "@/lib/utils";

import React from "react";
const className =
  " w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const ProductForm = ({
  imageUploadUtilities,
  initialVlaues,
  tags,
}: {
  initialVlaues?: Product;
  imageUploadUtilities: UseUploadImagesResult;
  tags: string[];
}) => {
  console.log(
    imageUploadUtilities,
    "product form",
    initialVlaues,
    tags,
    "tagsss"
  );
  const slectablaTags = tags.map((tag) => ({ label: tag, value: tag }));
  const tagsDeafultValues = mapStringToValue(
    initialVlaues?.tags || [],
    slectablaTags
  );
  console.log(
    initialVlaues,
    initialVlaues?.tags,
    tagsDeafultValues,
    slectablaTags
  );
  return (
    <div className="md:flex-row  flex-col-reverse flex  md:space-x-16">
      <div className=" flex flex-col w-full md:w-2/3  bg-gray-200 dark:bg-gray-800   bg-cover rounded-lg">
        <FileUpload
          files={imageUploadUtilities.files}
          setFiles={imageUploadUtilities.setFiles}
          onChange={imageUploadUtilities.setItems}
          images={imageUploadUtilities.items}
        />
        {/* <ImageSortableView
          handleDeleteImage={imageUploadUtilities.handleDeleteImage}
          images={imageUploadUtilities.items}
          onDragEnd={imageUploadUtilities.handleDrag}
        /> */}
      </div>
      <div className="">
        <div className="mb-4 md:mr-2 md:mb-0 ">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Product Name
          </label>
          <input
            className={className}
            id="firstName"
            type="text"
            placeholder="Flower With Golden Touch"
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
            className={className}
            id="desc"
            placeholder="Desc..."
            rows={4}
            name="description"
            defaultValue={initialVlaues?.description}
          />
        </div>
        <div className=" mb-2 relative">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Category
          </label>

          <Select defaultValue={initialVlaues?.category} name="category">
            <SelectTrigger className={cn(className, "py-7")}>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="glass">Glass</SelectItem>
              <SelectItem value="metal">Metal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className=" mb-2 relative">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Tags
          </label>
          <ReactCreatableMultiSelect
            defaultValue={tagsDeafultValues}
            options={slectablaTags}
            name="tags"
          />
        </div>

        <div className=" mb-2 relative w-full">
          <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
            Colors
          </label>
          {/* <MultiSelectDropdown
            isColors
            formFieldName={"colors"}
            options={majorColors}
            defualtValues={initialVlaues?.colors}
          /> */}
          <ReactColorsMultiSelect
            name="colors"
            defualtValues={initialVlaues?.colors}
            onChange={(e) => console.log(e)}
          />
        </div>
        <div className="mb-4 md:flex md:justify-between">
          <div className="mb-4 md:mr-2 md:mb-0">
            <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
              Price Before
            </label>
            <input
              className={className}
              id="oldPrice"
              placeholder="250"
              name="oldPrice"
              defaultValue={initialVlaues?.oldPrice}
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
              className={className}
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
              className={className}
              id="count"
              placeholder="0"
              name="count"
              defaultValue={initialVlaues?.count}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
