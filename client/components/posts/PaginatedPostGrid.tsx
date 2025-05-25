"use client";

import React from "react";
import { getPaginatedPosts } from "@/lib/api";

import PaginatedGrid from "../shared/PaginatedGrid";
import { PostCard } from "./postcard";

const PaginatedProjectsGrid = () => {
  return (
    <PaginatedGrid
      renderItem={(item) => {
        return <PostCard key={item.id} {...item} />;
      }}
      errorTitle="Unable to load posts!"
      queryFn={getPaginatedPosts}
      queryKey="posts"
    />
  );
};

export default PaginatedProjectsGrid;
