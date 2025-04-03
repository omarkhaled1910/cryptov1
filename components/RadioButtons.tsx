import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const RadioButtons = ({
  options,
  defaultValue,
}: {
  options: { label: string; value: string }[];
  defaultValue?: string;
}) => {
  return (
    <RadioGroup defaultValue={defaultValue}>
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center space-x-2">
          <RadioGroupItem value={opt.value} id={opt.value} />
          <Label htmlFor={opt.value}>{opt.label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default RadioButtons;
