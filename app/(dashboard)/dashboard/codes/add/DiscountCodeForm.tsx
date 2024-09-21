import { CsutomDatePicker } from "@/components/CustomDatePicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { IDiscountCode } from "@/models/discount-codes";

import React, { useState } from "react";
const className =
  " w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
const DiscountCodeForm = ({
  initialVlaues,
}: {
  initialVlaues?: IDiscountCode;
}) => {
  const [validFromDate, setValidFromDate] = useState(
    initialVlaues?.validFrom ? new Date(initialVlaues?.validFrom) : new Date()
  );
  const [validToDate, setValidToDate] = useState(
    initialVlaues?.validTo ? new Date(initialVlaues?.validTo) : new Date()
  );

  return (
    <div className="">
      <div className="mb-4 md:mr-2 md:mb-0 ">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Code Name
        </label>
        <input
          className={className}
          id="firstName"
          type="text"
          placeholder="Chrismats Code"
          name="name"
          defaultValue={initialVlaues?.name}
        />
      </div>
      <br />

      <div className="mb-4 md:mr-2 md:mb-0 ">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Code
        </label>
        <input
          className={className}
          id="code"
          type="text"
          placeholder="AankAazv"
          name="code"
          defaultValue={initialVlaues?.code}
        />
      </div>
      <br />
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Code Desc
        </label>
        <textarea
          className={className}
          id="desc"
          placeholder="Desc..."
          rows={2}
          name="description"
          defaultValue={initialVlaues?.description}
        />
      </div>
      <div className=" mb-2 relative">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Status
        </label>

        <Select defaultValue={initialVlaues?.status} name="status">
          <SelectTrigger className={cn(className, "py-7")}>
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">In Active</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=" mb-2 relative">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Valid From
        </label>
        <CsutomDatePicker
          name="validFrom"
          date={validFromDate}
          setDate={setValidFromDate}
        />
        <input hidden value={validFromDate.toDateString()} name="validFrom" />
      </div>

      <div className=" mb-2 relative w-full">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Valid To
        </label>
        {/* <MultiSelectDropdown
            isColors
            formFieldName={"colors"}
            options={majorColors}
            defualtValues={initialVlaues?.colors}
          /> */}
        <CsutomDatePicker
          name="validToDate"
          date={validToDate}
          setDate={setValidToDate}
        />
        <input hidden value={validToDate.toDateString()} name="validTo" />
      </div>
      <div className="mb-4 md:mr-2 md:mb-0">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Dicount Percantage
        </label>
        <input
          className={className}
          id="discountPercentage"
          placeholder="50"
          name="discountPercentage"
          defaultValue={initialVlaues?.discountPercentage}
        />
        {/* <p className="text-xs italic text-red-700  dark:text-red-400">
            Please choose a price.
          </p> */}
      </div>
    </div>
  );
};

export default DiscountCodeForm;
