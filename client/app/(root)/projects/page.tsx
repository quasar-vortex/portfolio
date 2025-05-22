import { getPaginatedPosts, getPaginatedProjects } from "@/lib/api";
import PaginatedPostGrid from "@/components/posts/PaginatedPostGrid";
import PaginatedProjectsGrid from "@/components/projects/PaginatedProjects";
import Section from "@/components/shared/section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ProjectListPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["projects"],
    queryFn: () =>
      getPaginatedProjects({ term: "", pageIndex: 1, pageSize: 10, tags: [] }),
  });

  return (
    <Section title="All Projects">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaginatedProjectsGrid />
      </HydrationBoundary>
    </Section>
  );
};

export default ProjectListPage;
