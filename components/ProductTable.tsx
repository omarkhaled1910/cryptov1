"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPaginaton from "./CustomPaginaton";
import { useEffect, useState } from "react";
import { ROWS_PER_PAGE } from "@/constants";
import { getProducts } from "@/app/actions/product";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  fetcher: (quer: string) => Promise<any>;
  accssKey: string;
  count?: number;
  searchQuery?: string;
  classNames?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  count,
  searchQuery,
  classNames,
  fetcher = getProducts,
  accssKey = "product",
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<TData[]>(data);
  console.log(data, "from tableee", count);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ROWS_PER_PAGE,
  });
  useEffect(() => {
    setItems(data);
    setCurrentPage(0);
  }, [data]);

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: ROWS_PER_PAGE,
      },
    },
    manualPagination: true,
    pageCount: Number(count) / ROWS_PER_PAGE,
  });
  useEffect(() => {
    console.log(pagination);
    setCurrentPage(pagination.pageIndex);
    const selectedPage = pagination.pageIndex;
    const fetchPaginatedData = async () => {
      if (pagination.pageIndex === 0) {
        setItems(data);
        return;
      }
      const fetchedData = await fetcher(
        `limit=${ROWS_PER_PAGE}&skip=${
          Math.ceil(selectedPage) * ROWS_PER_PAGE
        }&search=${searchQuery}`
      );
      console.log(fetchedData);
      setItems(fetchedData?.[accssKey]);
    };
    fetchPaginatedData();
  }, [pagination.pageIndex]);

  return (
    <div className="rounded-md border w-full">
      <Table className={classNames}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CustomPaginaton
        count={Number(count) || 0}
        currentPage={currentPage}
        table={table}
        classNames={classNames || ""}
      />
    </div>
  );
}
