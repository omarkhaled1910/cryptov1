"use client";

import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
} from "react";

// Define the types for props
interface MultiSelectDropdownProps {
  formFieldName: string;
  options: string[];
  onChange?: (selectedOptions: string[]) => void;
  prompt?: string;
  isColors?: boolean;
  defualtValues?: string[];
}

export default function MultiSelectDropdown({
  formFieldName,
  options,
  onChange,
  prompt = "Select one or more options",
  isColors,
  defualtValues,
}: MultiSelectDropdownProps) {
  const [isJsEnabled, setIsJsEnabled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    defualtValues || []
  );
  const optionsListRef = useRef<HTMLUListElement>(null);
  const dropdownRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    setIsJsEnabled(true);

    const optionsInputs = optionsListRef.current?.querySelectorAll("input");
    optionsInputs?.forEach((input) => {
      if (defualtValues?.includes(input.value))
        (input as HTMLInputElement).checked = true;
    });
    const handleClickOutside = (event: MouseEvent<Document>) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const option = e.target.value;

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleSelectAllClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current?.querySelectorAll("input");
    optionsInputs?.forEach((input) => {
      (input as HTMLInputElement).checked = true;
    });

    setSelectedOptions([...options]);
    onChange?.([...options]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const optionsInputs = optionsListRef.current?.querySelectorAll("input");
    optionsInputs?.forEach((input) => {
      (input as HTMLInputElement).checked = false;
    });

    setSelectedOptions([]);
    onChange?.([]);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <label className="relative w-full  " ref={dropdownRef}>
      <input type="checkbox" className="hidden peer" />

      <div
        className="w-full cursor-pointer peer-checked:after:-rotate-180 after:transition-transform inline-flex  p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border  "
        onClick={toggleDropdown}
      >
        {prompt}
        {isJsEnabled && selectedOptions.length > 0 && (
          <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
        )}
        {isOpen ? (
          <ChevronUp className="absolute right-4 h-4 w-4 opacity-50 top-2" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50 absolute right-4 top-2" />
        )}
      </div>

      {isOpen && (
        <div className="absolute bg-primary-foreground border transition-opacity opacity-100 pointer-events-auto w-full max-h-60 overflow-y-scroll">
          {isJsEnabled && (
            <ul>
              <li>
                <button
                  onClick={handleSelectAllClick}
                  disabled={!isSelectAllEnabled}
                  className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
                >
                  {"Select All"}
                </button>
              </li>
              <li>
                <button
                  onClick={handleClearSelectionClick}
                  disabled={!isClearSelectionEnabled}
                  className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50"
                >
                  {"Clear selection"}
                </button>
              </li>
            </ul>
          )}
          <ul ref={optionsListRef}>
            {options.map((option) => (
              <li key={option}>
                <label
                  style={{ color: isColors ? option : "" }}
                  className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                >
                  <input
                    type="checkbox"
                    name={formFieldName}
                    value={option}
                    className="cursor-pointer"
                    onChange={handleChange}
                  />
                  <span className="ml-1">{option}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </label>
  );
}
