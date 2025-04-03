export type ColourOption = {
  readonly value: string;
  readonly label: string;
  readonly color: string;
};
type HasKey = { key: string };

export const mapStringToValue = <
  T extends { label: string; value: string; color?: string }
>(
  values: string[],
  fullData: T[]
): any[] => {
  // Use the map function to iterate over each value in the values array
  return values.map((value) => {
    // Find the first element in fullData that matches the value
    const matchedElement = fullData.find((item) => item.value === value);
    // Return the matched element, or null if no match is found
    return matchedElement || { label: value, value };
  });
};
