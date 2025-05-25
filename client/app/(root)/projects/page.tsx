import { getPaginatedProjects } from "@/lib/api";
import PaginatedProjectsGrid from "@/components/projects/PaginatedProjects";
import Section from "@/components/shared/section";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ProjectListPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const queryClient = new QueryClient();

  const term = searchParams.term || "";
  const pageIndex = parseInt(searchParams.pageIndex || "1");
  const pageSize = parseInt(searchParams.pageSize || "10");

  await queryClient.prefetchQuery({
    queryKey: ["projects", pageIndex, pageSize, term],
    queryFn: () =>
      getPaginatedProjects({ term, pageIndex, pageSize, tags: [] }),
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
