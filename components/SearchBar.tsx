import { cn, debounce } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const SearchBar = ({
  classNames,
  onSubmit,
  name = "",
  onChange,
}: {
  classNames?: string;
  onSubmit: (formData: FormData) => Promise<void>;
  name: string;
  onChange: any;
}) => {
  return (
    <form
      action={onSubmit}
      className={cn("flex items-center   space-x-6 w-full  ", classNames)}
    >
      <div className="flex bg-secondary p-4  space-x-4 rounded-lg w-full">
        <SearchIcon className=" bg-transparent text-primary" />
        <input
          className="bg-secondary outline-none w-full"
          type="text"
          placeholder="Article name or keyword..."
          name={name}
          onChange={(e) => {
            onChange(e.target.value);
            debounce(() => e.target.form?.requestSubmit(), 2000)();
            if (!e.target.value) {
              e.target.form?.requestSubmit();
            }
          }}
        />
      </div>

      <Button type="submit" className="h-full" variant={"outline"}>
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
