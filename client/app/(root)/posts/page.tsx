import PaginatedPostGrid from "@/components/posts/PaginatedPostGrid";
import Section from "@/components/shared/section";
import api from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const PostListingPage = async ({
  searchParams: sParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const searchParams = await sParams;
  const queryClient = new QueryClient();

  const term = searchParams.term || "";
  const pageIndex = parseInt(searchParams.pageIndex || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");

  await queryClient.prefetchQuery({
    queryKey: ["posts", pageIndex, pageSize, term],
    queryFn: () =>
      api.postService.searchPosts({
        term,
        pageIndex,
        pageSize,
        tags: [],
      }),
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
