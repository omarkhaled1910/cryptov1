import { ROWS_PER_PAGE } from "@/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const MAX_PAGINATED_ITEMS = 5;

export default function CustomPaginaton({
  count,
  currentPage,
  table,
  classNames,
}: {
  table: Table<any>;
  count: number;
  currentPage: number;
  classNames: string;
}) {
  const numberPages = count / ROWS_PER_PAGE;
  console.log("pag", currentPage);
  return (
    <div
      style={{}}
      className={cn(
        "flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6",
        classNames
      )}
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant={"outline"}
        >
          Previous
        </Button>
        <div> {currentPage + 1}</div>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant={"outline"}
        >
          Next
        </Button>
      </div>
      <div
        style={{ maxWidth: "100%", overflowX: "auto", scrollbarWidth: "none" }}
        className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between gap-2"
      >
        <div>
          <p className="text-sm text-gray-600 w-max">
            Showing Page{" "}
            <span className="font-medium">{Math.ceil(currentPage + 1)}</span> of{" "}
            <span className="font-medium">{Math.ceil(numberPages)}</span> Pages
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex space-x-2 rounded-md shadow-sm"
          >
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant={"outline"}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </Button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {new Array(Math.ceil(numberPages)).fill(1).map((_, i) => (
              <Button
                onClick={() => table.setPageIndex(i)}
                key={i}
                variant={"outline"}
                disabled={Math.ceil(currentPage) === i}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              variant={"outline"}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
