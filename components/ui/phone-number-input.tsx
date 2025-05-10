"use client";
import countries from "@/constants/countries";
import useClickAway from "@/hooks/useClickAway";
import React, { useState } from "react";

const PhoneNumberInput = ({ onChange, name, onNumberChange }: any) => {
  const [showMenu, setShowMenu] = useState(false);
  const [prefix, setPrefix] = useState(0);

  const ref = useClickAway<HTMLDivElement>(() => setShowMenu(false));

  return (
    <div>
      <div className=" relative flex items-center">
        <button
          id="dropdown-phone-button"
          data-dropdown-toggle="dropdown-phone"
          className="relative flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={() => setShowMenu(true)}
        >
          {countries[prefix].svg}
          {countries[prefix].dialCode}

          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {showMenu && (
          <div
            ref={ref}
            id="dropdown-phone"
            className="z-10 absolute top-12  bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-phone-button"
            >
              {countries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onChange(countries[index]);
                    setPrefix(index);
                    setShowMenu(false);
                  }}
                >
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <span className="inline-flex items-center">
                      {country.svg}
                      {country.name} ({country.dialCode})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Phone number:
        </label>
        <div className="relative w-full">
          <input
            type="text"
            id="phone-input"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="100391616"
            required
            name={name}
            onChange={(e) => onNumberChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
