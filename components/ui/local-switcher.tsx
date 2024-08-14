"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function Switch() {
  // Uncomment to preserve the search params. Don't forget to also uncomment the Suspense in the layout
  // const changeLocale = useChangeLocale(/* { preserveSearchParams: true } */);
  // const locale = useCurrentLocale();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {/* {locale.toUpperCase()} <span className="sr-only">Toggle theme</span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <DropdownMenuItem onClick={() => changeLocale("en")}>
            EN
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLocale("ar")}>
            AR
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
