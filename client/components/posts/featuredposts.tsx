"use client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Link from "next/link";
import Section from "../shared/section";
import { PostCard } from "./postcard";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Card } from "../ui/card";
import api from "@/lib/api";
import { FeaturedPostResponse, Post } from "@/lib/types";

const { postService } = api;
const FeaturedPosts = ({ bgGray }: { bgGray?: boolean }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => postService.searchPosts({ isFeatured: true }),
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
