import React from "react";
import { ColourOption } from "./ReactColorsMultiSelect";
import CreatableSelect from "react-select/creatable";

export const colourOptions: ColourOption[] = [
  { value: "red", label: "Red", color: "#FF0000" },
  { value: "green", label: "Green", color: "#00FF00" },
  { value: "blue", label: "Blue", color: "#0000FF" },
  { value: "yellow", label: "Yellow", color: "#FFFF00" },
  { value: "purple", label: "Purple", color: "#800080" },
  // Add more options here if needed
];
const ReactCreatableMultiSelect = () => {
  return <CreatableSelect isMulti options={colourOptions} />;
};

export default ReactCreatableMultiSelect;
