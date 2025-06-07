import PaginatedProjectsGrid from "@/components/projects/PaginatedProjects";
import Section from "@/components/shared/section";
import api from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const ProjectListPage = async ({
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
    queryKey: ["projects", pageIndex, pageSize, term],
    queryFn: () =>
      api.projectService.getManyProjects({
        term,
        pageIndex,
        pageSize,
        tags: [],
      }),
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
