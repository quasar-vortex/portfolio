import { getPaginatedPosts } from "@/lib/api";
import PaginatedPostGrid from "@/components/posts/PaginatedPostGrid";
import Section from "@/components/shared/section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const PostListingPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () =>
      getPaginatedPosts({ term: "", pageIndex: 1, pageSize: 10, tags: [] }),
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
