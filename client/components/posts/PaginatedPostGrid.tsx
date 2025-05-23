"use client";

import React from "react";
import { Post } from "@/components/posts/featuredposts";
import { PostCard } from "@/components/posts/postcard";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPaginatedPosts, queryParamBuilder } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

const PaginatedPostGrid = () => {
  const router = useRouter();
  const [storedTerm, setStoredTerm] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initIndex = () => {
    const ind = searchParams.get("pageIndex");
    return (ind && parseInt(ind)) || 1;
  };
  const initSize = () => {
    const size = searchParams.get("pageSize");
    return (size && parseInt(size)) || 10;
  };
  const initTerm = () => {
    const term = searchParams.get("term");
    return term || "";
  };
  const [pageIndex, setPageIndex] = useState(initIndex);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(initSize);
  const [term, setTerm] = useState(initTerm);
  const { isPending, error, data } = useQuery({
    queryKey: ["posts", pageIndex, pageSize, term],
    queryFn: () => getPaginatedPosts({ term, pageIndex, pageSize, tags: [] }),
  });

  useEffect(() => {
    if (!data?.meta) return;

    const {
      pageIndex: metaIndex,
      pageSize: metaSize,
      totalPages: metaTotal,
    } = data.meta;

    if (metaIndex !== pageIndex) setPageIndex(metaIndex);
    if (metaSize !== pageSize) setPageSize(metaSize);
    if (metaTotal !== totalPages) setTotalPages(metaTotal);

    const newUrl = `${pathname}${queryParamBuilder({
      pageIndex: metaIndex,
      pageSize: metaSize,
      term,
    })}`;

    const currentUrl = window.location.pathname + window.location.search;
    if (newUrl !== currentUrl) {
      window.history.replaceState(null, "", newUrl);
    }
  }, [data]);
  useEffect(() => {
    const ind = searchParams.get("pageIndex");
    const index = (ind && parseInt(ind)) || 1;
    if (index !== pageIndex) {
      setPageIndex(index);
    }

    const size = searchParams.get("pageSize");
    const sizeVal = (size && parseInt(size)) || 10;
    if (sizeVal !== pageSize) {
      setPageSize(sizeVal);
    }
  }, [searchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (storedTerm !== term) {
        setTerm(storedTerm);
        setPageIndex(1);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [storedTerm]);

  useEffect(() => {
    router.replace(
      `${pathname}${queryParamBuilder({
        pageIndex,
        pageSize,
        term,
      })}`
    );
  }, [pageIndex, pageSize, term]);
  if (error) return "Error: " + error.message;
  return (
    <>
      <div className="mb-6 border-b-2 border-gray-300 pb-6">
        <input
          type="text"
          value={storedTerm}
          onChange={(e) => {
            setStoredTerm(e.target.value);
          }}
          className="outline-none rounded-sm text-lg border border-gray-300 focus:border-gray-500 duration-200 w-full p-2"
        />
      </div>
      <div className="mb-6 grid sm:grid-cols-2 gap-6 lg:grid-cols-3">
        {data &&
          data?.data.map((item: Post) => {
            return <PostCard key={item.id} {...item} />;
          })}
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
  );
};

export default PaginatedPostGrid;
