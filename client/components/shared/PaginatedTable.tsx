"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useDebouncedValue from "@/app/hooks/useDebouncedValue";

import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Spinner from "../shared/Spinner";

export type TableColumn<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type PaginatedTableProps<T> = {
  simpleKey?: boolean;
  queryKey: string;
  queryFn: (params: {
    term?: string;
    pageIndex: number;
    pageSize: number;
  }) => Promise<{
    data: T[];
    meta: { totalPages: number };
  }>;
  columns: TableColumn<T>[];
  actions?: (row: T) => React.ReactNode;
  searchPlaceholder?: string;
  displaySearch?: boolean;
};

function PaginatedTable<T>({
  queryKey,
  queryFn,
  columns,
  actions,
  searchPlaceholder = "Search...",
  simpleKey,
  displaySearch = true,
}: PaginatedTableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();

  const [hasInitialized] = useState(false);
  const [term, setTerm] = useState("");
  const [storedTerm, setStoredTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedTerm = useDebouncedValue(storedTerm, 500);

  const { data, error, isPending } = useQuery({
    queryKey: simpleKey ? [queryKey] : [queryKey, pageIndex, pageSize, term],
    queryFn: () => queryFn({ term, pageIndex, pageSize }),
  });

  useEffect(() => {
    if (debouncedTerm !== term) {
      setTerm(debouncedTerm);
      setPageIndex(1);
    }
  }, [debouncedTerm, term]);

  useEffect(() => {
    if (data && data?.meta.totalPages !== totalPages) {
      setTotalPages(data.meta.totalPages);
    }
  }, [data, totalPages]);

  useEffect(() => {
    if (!hasInitialized) return;

    const newUrl = `${pathname}?${new URLSearchParams({
      pageIndex: String(pageIndex),
      pageSize: String(pageSize),
      term,
      tags: [],
    } as unknown as Record<string, string>)}`;
    const currentUrl = window.location.pathname + window.location.search;
    if (newUrl !== currentUrl) {
      router.replace(newUrl);
    }
  }, [term, pageIndex, pageSize, hasInitialized, pathname, router]);

  return (
    <>
      {data && data?.data.length === 0 ? (
        <Alert className="mb-6 text-gray-800 font-bold shadow-md">
          <AlertTitle>
            <h4 className="font-bold text-lg sm:text-xl">
              There currently aren&rsquo;t any items to display.
            </h4>
          </AlertTitle>
          <AlertDescription>No data to display</AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {displaySearch && (
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={storedTerm}
              onChange={(e) => setStoredTerm(e.target.value)}
              className="w-full border border-gray-300 focus:border-gray-500 outline-none p-2 text-lg rounded"
            />
          )}

          {error && (
            <Alert>
              <AlertTitle>Failed to load data</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {isPending ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-gray-300">
                    {columns.map((col) => (
                      <th key={String(col.key)} className="p-2 font-semibold">
                        {col.header}
                      </th>
                    ))}
                    {actions && <th className="p-2 font-semibold">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {data?.data.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      {columns.map((col) => (
                        <td key={String(col.key)} className="p-2">
                          {col.render
                            ? col.render(row[col.key], row)
                            : String(row[col.key])}
                        </td>
                      ))}
                      {actions && <td className="p-2">{actions(row)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  variant="ghost"
                  className="gap-1 px-2.5 cursor-pointer"
                  onClick={() => setPageIndex((prev) => Math.max(1, prev - 1))}
                >
                  <span className="hidden sm:block">Prev</span>
                  <ChevronLeftIcon />
                </Button>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>

              {pageIndex < totalPages && (
                <PaginationItem>
                  <Button
                    variant="ghost"
                    className="gap-1 px-2.5 cursor-pointer"
                    onClick={() => setPageIndex((prev) => prev + 1)}
                  >
                    <span className="hidden sm:block">Next</span>
                    <ChevronRightIcon />
                  </Button>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}

export default PaginatedTable;
