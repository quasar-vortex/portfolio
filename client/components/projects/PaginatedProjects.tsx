"use client";

import React from "react";

import { ProjectCard } from "./projectcard";
import PaginatedGrid from "../shared/PaginatedGrid";
import api from "@/lib/api";

const PaginatedProjectsGrid = () => {
  return (
    <PaginatedGrid
      renderItem={(item) => {
        return <ProjectCard key={item.id} {...item} />;
      }}
      errorTitle="Unable to load projects!"
      queryFn={async (p) => api.postService.searchPosts(p)}
      queryKey="projects"
    />
  );
};

export default PaginatedProjectsGrid;
