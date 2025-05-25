import { getPaginatedPosts } from "@/lib/api";
import PaginatedPostGrid from "@/components/posts/PaginatedPostGrid";
import Section from "@/components/shared/section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const PostListingPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const queryClient = new QueryClient();

  const term = searchParams.term || "";
  const pageIndex = parseInt(searchParams.pageIndex || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");

  await queryClient.prefetchQuery({
    queryKey: ["posts", pageIndex, pageSize, term],
    queryFn: () => getPaginatedPosts({ term, pageIndex, pageSize, tags: [] }),
  });

  return (
    <Section title="All Posts">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaginatedPostGrid />
      </HydrationBoundary>
    </Section>
  );
};

export default PostListingPage;
