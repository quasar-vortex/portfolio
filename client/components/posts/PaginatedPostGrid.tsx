"use client";

import React from "react";

import PaginatedGrid from "../shared/PaginatedGrid";
import { PostCard } from "./postcard";
import api from "@/lib/api";
import { Post } from "@/lib/types";

const PaginatedPostsGrid = () => {
  return (
    <>
      <PaginatedGrid
        renderItem={(item) => {
          const postItem = item as unknown as Post;
          return <PostCard key={item.id} {...postItem} />;
        }}
        errorTitle="Unable to load posts!"
        queryFn={async (p) => api.postService.searchPosts(p)}
        queryKey="posts"
      />
    </>
  );
};

export default PaginatedPostsGrid;
