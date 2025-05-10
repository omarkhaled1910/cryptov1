import React from "react";
import { ColourOption } from "./ReactColorsMultiSelect";
import CreatableSelect from "react-select/creatable";
import chroma from "chroma-js";
import Select, { StylesConfig, MultiValue } from "react-select";
import { mapStringToValue } from "@/lib/react-select-utils";
export const tagOptions: ColourOption[] = [
  { value: "laptop", label: "Laptop" },
  { value: "headphones", label: "Headphones" },
  { value: "smartphone", label: "Smartphone" },
  { value: "camera", label: "Camera" },
  { value: "tablet", label: "Tablet" },
];

const colourStyles: StylesConfig<ColourOption, true> = {
  control: (styles, { isFocused }) => ({
    ...styles,
    // Tailwind styles
    padding: "0.5rem", // Equivalent to p-4
    borderRadius: "0.75rem", // Equivalent to rounded-lg
    borderWidth: "1px", // Equivalent to border
    border: "none", // Equivalent to border-gray-300 and focus:ring-blue-500
    backgroundColor: "rgb(75 85 99 / 1)", // Tailwind bg-gray-50
    color: "white", // Equivalent to text-gray-900
    fontSize: "1rem", // Equivalent to text-base
    boxShadow: isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.3)" : undefined, // Equivalent to focus:ring-blue-500
    "&:hover": {
      borderColor: "#3b82f6", // Equivalent to focus:border-blue-500
    },
    // Dark mode styling
    "@media (prefers-color-scheme: dark)": {
      backgroundColor: "bg-gray-700 !important", // Tailwind dark:bg-gray-700
      borderColor: "#4b5563", // Equivalent to dark:border-gray-600
      color: "#f9fafb", // Equivalent to dark:text-white
      boxShadow: isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.3)" : undefined,
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color || "000");
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: "#000",
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color || "#000");
    return {
      ...styles,
      backgroundColor: "rgb(75 85 99 / 1)",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white",
    },
  }),
};
const ReactCreatableMultiSelect = ({
  name = "",
  options,
  defaultValue = [],
}: any) => {
  return (
    <CreatableSelect
      // defaultMenuIsOpen={true}
      styles={colourStyles}
      isMulti
      options={options || tagOptions}
      name={name}
      closeMenuOnSelect={false}
      defaultValue={defaultValue}
      className=" bg-white rounded-xl"
    />
  );
};

export default ReactCreatableMultiSelect;
