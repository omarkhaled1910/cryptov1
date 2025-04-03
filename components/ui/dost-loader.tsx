import { cn } from "@/lib/utils";
import React from "react";

const DotsLoader = ({ classNames = "" }) => {
  return (
    <div
      className={cn(
        "flex items-center  space-x-2 h-32 justify-center items-cente bg-transparent",
        classNames
      )}
    >
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default DotsLoader;
