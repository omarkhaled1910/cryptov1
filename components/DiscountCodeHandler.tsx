"use client";

import React from "react";

const DiscountCodeHandler = ({ onDiscountCodeSubmit }: any) => {
  const handleDiscountCode = async () => {};
  return (
    <>
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <form action={handleDiscountCode} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Do you have a voucher or gift card?
            </label>
            <input
              type="text"
              id="voucher"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              placeholder=""
              required
              name="code"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default DiscountCodeHandler;
