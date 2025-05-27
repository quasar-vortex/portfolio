"use client";

import React from "react";

import PaginatedGrid from "../shared/PaginatedGrid";
import { PostCard } from "./postcard";
import api from "@/lib/api";

const PaginatedProjectsGrid = () => {
  return (
    <PaginatedGrid
      renderItem={(item) => {
        return <PostCard key={item.id} {...item} />;
      }}
      errorTitle="Unable to load posts!"
      queryFn={async (p) => api.postService.searchPosts(p)}
      queryKey="posts"
    />
  );
};

export default PaginatedProjectsGrid;
