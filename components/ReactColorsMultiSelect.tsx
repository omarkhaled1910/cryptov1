import React, { useState } from "react";
import chroma from "chroma-js";
import Select, { StylesConfig, MultiValue } from "react-select";
import { mapStringToValue } from "@/lib/react-select-utils";

// TypeScript type definition for options
export type ColourOption = {
  readonly value: string;
  readonly label: string;
  readonly color?: string;
};

// Define the options array
export const colourOptions: ColourOption[] = [
  { value: "red", label: "Red", color: "#FF0000" },
  { value: "green", label: "Green", color: "#00FF00" },
  { value: "blue", label: "Blue", color: "#0000FF" },
  { value: "yellow", label: "Yellow", color: "#FFFF00" },
  { value: "purple", label: "Purple", color: "#800080" },
  // Add more options here if needed
];

// Define styles for the select component
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
    const color = chroma(data.color || "fff");
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
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
    const color = chroma(data.color || "#fff");
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
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

// Define TypeScript interface for the component props
interface ColourSelectProps {
  value?: ColourOption[]; // Controlled value
  onChange?: (selectedOptions: MultiValue<ColourOption>) => void; // Change handler
  error?: string; // Validation error message
  isMulti?: boolean;
  options?: ColourOption[];
  styles?: StylesConfig<ColourOption, true>;
  name: string;
  defualtValues?: string[];
}

// Default props values
const defaultProps = {
  isMulti: true,
  options: colourOptions,
  styles: colourStyles,
};

// Component definition
const ReactColorsMultiSelect = ({
  value,
  onChange,
  error,
  isMulti = defaultProps.isMulti,
  options = defaultProps.options,
  styles = defaultProps.styles,
  name = "",
  defualtValues,
}: ColourSelectProps) => {
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        value={value}
        onChange={onChange}
        isMulti={true}
        options={options}
        styles={styles}
        name={name}
        defaultInputValue={""}
        defaultValue={mapStringToValue(defualtValues || [], options)}
        className=" bg-white rounded-xl"
      />
      {error && <span style={{ color: "red" }}>{error}</span>}{" "}
      {/* Validation message */}
    </div>
  );
};

export default ReactColorsMultiSelect;
