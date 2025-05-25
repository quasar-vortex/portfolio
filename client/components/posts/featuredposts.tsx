"use client";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";
import { Button } from "../ui/button";
import Link from "next/link";
import Section from "../shared/section";
import { PostCard } from "./postcard";
import { getFeaturedPosts } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Spinner from "../shared/Spinner";
import { Card } from "../ui/card";

export type PostTag = {
  postId: string;
  tagId: string;
  tag: {
    id: string;
    name: string;
  };
};

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  avatarFile: {
    id: string;
    url: string;
  };
};

export type CoverImage = {
  id: string;
  url: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishDate: string;
  PostTag: PostTag[];
  author: Author;
  coverImage: CoverImage;
};

export type PostMeta = {
  pageSize: number;
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  isFeatured: boolean;
};

export type FeaturedPostResponse = {
  data: Post[];
  message: string;
  meta: PostMeta;
};

const FeaturedPosts = ({ bgGray }: { bgGray?: boolean }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: getFeaturedPosts,
  });

  return (
    <Section bgGray={bgGray} title="Featured Posts">
      {error && (
        <Alert className="mb-6 text-red-600 font-bold shadow-md">
          <AlertTitle>
            <h4 className="font-bold text-lg sm:text-xl">
              Unable to Load Posts
            </h4>
          </AlertTitle>
          {error?.message && (
            <AlertDescription>{error.message}</AlertDescription>
          )}
        </Alert>
      )}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isPending &&
          !data &&
          Array(3)
            .fill(null)
            .map((item, idx) => (
              <li key={idx}>
                <Card className="min-h-[max(500px,calc(1/3*100vh))] skeleton-card">
                  <div></div>
                </Card>
              </li>
            ))}
        {(data as FeaturedPostResponse)?.data?.slice(0, 3).map((post: Post) => (
          <li key={post.id}>
            <PostCard {...post} />
          </li>
        ))}
      </ul>
      <div className="text-center mt-10">
        <Button asChild variant="outline">
          <Link href="/posts">View All Posts</Link>
        </Button>
      </div>
    </Section>
  );
};

export { FeaturedPosts };
