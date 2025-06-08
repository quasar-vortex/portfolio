"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import useDebouncedValue from "@/app/hooks/useDebouncedValue";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PostMeta } from "@/lib/types";

type PaginatedGridProps = {
  queryFn: (params: {
    tags?: string[];
    isFeatured?: boolean;
    term?: string | undefined;
    pageIndex?: number;
    pageSize?: number;
    sortOrder?: "asc" | "desc";
    sortKey?: "title" | "publishDate";
  }) => Promise<{ data: Record<string, string>[]; meta: PostMeta }>;
  queryKey: string;
  errorTitle: string;
  renderItem: (p: Record<string, string>) => React.JSX.Element;
};
const PaginatedGrid = ({
  queryFn,
  queryKey,
  errorTitle,
  renderItem,
}: PaginatedGridProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [hasInitialized, setHasInitialized] = useState(false);
  const [term, setTerm] = useState("");
  const [storedTerm, setStoredTerm] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const { isPending, error, data } = useQuery({
    queryKey: [queryKey, pageIndex, pageSize, term],
    queryFn: () => queryFn({ term, pageIndex, pageSize, tags: [] }),
  });

  const debouncedTerm = useDebouncedValue(storedTerm, 500);

  useEffect(() => {
    if (debouncedTerm !== term) {
      setTerm(debouncedTerm);
      setPageIndex(1);
    }
  }, [debouncedTerm, term]);

  useEffect(() => {
    if (!data?.meta) return;

    const { totalPages: metaTotal } = data.meta;
    if (metaTotal !== totalPages) setTotalPages(metaTotal);
  }, [data, totalPages]);

  useEffect(() => {
    if (!hasInitialized) return;

    const newUrl = `${pathname}?${new URLSearchParams({
      pageIndex,
      pageSize,
      term,
      tags: [],
    } as unknown as Record<string, string>)}`;

    const currentUrl = window.location.pathname + window.location.search;
    if (newUrl !== currentUrl) {
      router.replace(newUrl);
    }
  }, [pageIndex, pageSize, term, hasInitialized, router, pathname]);

  useEffect(() => {
    if (hasInitialized) return;

    const t = searchParams.get("term") || "";
    const ind = parseInt(searchParams.get("pageIndex") || "1");
    const size = parseInt(searchParams.get("pageSize") || "10");

    setTerm(t);
    setStoredTerm(t);
    setPageIndex(ind);
    setPageSize(size);

    setHasInitialized(true);
  }, [searchParams, hasInitialized]);

  return (
    <>
      {!isPending && data && data?.data.length === 0 ? (
        <>
          <div className="mb-6 border-b-2 border-gray-300 pb-6">
            <input
              placeholder="Enter search term..."
              type="text"
              value={storedTerm}
              onChange={(e) => {
                setStoredTerm(e.target.value);
              }}
              className="outline-none rounded-sm text-lg border border-gray-300 focus:border-gray-500 duration-200 w-full p-2"
            />
          </div>
          <Alert className="mb-6 text-gray-800 font-bold shadow-md">
            <AlertTitle>
              <h4 className="font-bold text-lg sm:text-xl">
                There currently aren&apos;t any items to display.
              </h4>
            </AlertTitle>
            <AlertDescription>No data to display</AlertDescription>
          </Alert>
        </>
      ) : (
        <>
          <div className="mb-6 border-b-2 border-gray-300 pb-6">
            <input
              placeholder="Enter search term..."
              type="text"
              value={storedTerm}
              onChange={(e) => {
                setStoredTerm(e.target.value);
              }}
              className="outline-none rounded-sm text-lg border border-gray-300 focus:border-gray-500 duration-200 w-full p-2"
            />
          </div>
          {error && (
            <Alert className="mb-6 text-red-600 font-bold shadow-md">
              <AlertTitle>
                <h4 className="font-bold text-lg sm:text-xl">{errorTitle}</h4>
              </AlertTitle>
              {error?.message && (
                <AlertDescription>{error.message}</AlertDescription>
              )}
            </Alert>
          )}
          <div className="mb-6 grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
            {data && data?.data.map(renderItem)}
            {isPending &&
              !data &&
              Array(10)
                .fill(null)
                .map((item, idx) => (
                  <Card
                    key={idx}
                    className="min-h-[max(500px,calc(1/3*100vh))] skeleton-card"
                  >
                    <div></div>
                  </Card>
                ))}
          </div>
          {data && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    className="gap-1 px-2.5 sm:pr-2.5 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setPageIndex((prev) => Math.max(1, prev - 1));
                      window.scrollTo({ top: 0, behavior: "instant" });
                    }}
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
                      className="gap-1 px-2.5 sm:pr-2.5 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();

                        window.scrollTo({ top: 0, behavior: "instant" });
                        setPageIndex((prev) => {
                          return Math.max(1, prev + 1);
                        });
                      }}
                    >
                      <span className="hidden sm:block">Next</span>
                      <ChevronRightIcon />
                    </Button>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </>
  );
};

export default PaginatedGrid;
