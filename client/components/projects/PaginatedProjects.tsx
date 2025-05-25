"use client";

import React from "react";
import { getPaginatedProjects } from "@/lib/api";
import { ProjectCard } from "./projectcard";
import PaginatedGrid from "../shared/PaginatedGrid";

const PaginatedProjectsGrid = () => {
  return (
    <PaginatedGrid
      renderItem={(item) => {
        return <ProjectCard key={item.id} {...item} />;
      }}
      errorTitle="Unable to load projects!"
      queryFn={getPaginatedProjects}
      queryKey="projects"
    />
  );
};

export default PaginatedProjectsGrid;
