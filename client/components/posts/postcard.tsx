import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "./featuredposts";
import Image from "next/image";
import { Button } from "../ui/button";

type PostCardProps = Post & {};
const PostCard = (post: PostCardProps) => {
  return (
    <Card className="h-full flex flex-col justify-between border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        {post.coverImage?.url && (
          <div className="h-40 md:h-56 w-full relative">
            <Image
              src={post.coverImage.url}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-5">
          <CardTitle>
            <h3 className="text-xl hover:text-gray-500 duration-200 underline font-semibold text-gray-700 mb-2">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h3>
            <div className="flex gap-3 items-center mb-2">
              <Avatar>
                <AvatarImage src={post.author?.avatarFile?.url} />
                <AvatarFallback />
              </Avatar>
              <p className=" text-gray-500  font-bold text-sm">
                {post.author.firstName} {post.author.lastName}
              </p>
            </div>
          </CardTitle>
          <CardDescription>
            <ul className="flex flex-wrap gap-2">
              {post.PostTag?.map(({ tag }) => (
                <li
                  key={tag.id}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 font-semibold rounded-md"
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5 text-sm text-gray-600">
        <p>{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-5 pt-0 mt-auto flex justify-end">
        <Button asChild>
          <Link href={`/posts/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { PostCard };
