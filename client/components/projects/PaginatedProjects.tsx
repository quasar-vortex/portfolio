"use client";

import React from "react";

import { Project, ProjectCard } from "./projectcard";
import PaginatedGrid from "../shared/PaginatedGrid";
import api from "@/lib/api";

const PaginatedProjectsGrid = () => {
  return (
    <PaginatedGrid
      renderItem={(item) => {
        const projectItem = item as unknown as Project;
        return <ProjectCard key={item.id} {...projectItem} />;
      }}
      errorTitle="Unable to load projects!"
      queryFn={async (p) => api.projectService.getManyProjects(p)}
      queryKey="projects"
    />
  );
};

export default PaginatedProjectsGrid;
