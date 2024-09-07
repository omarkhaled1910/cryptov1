import { useEffect, useRef, RefObject } from "react";

const useClickAway = <T extends HTMLElement>(
  handler: () => void
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export default useClickAway;
