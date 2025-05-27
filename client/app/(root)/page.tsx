import { About } from "@/components/home/about";
import { FeaturedPosts } from "@/components/posts/featuredposts";
import { FeaturedProjects } from "@/components/projects/featuredprojects";
import { Hero } from "@/components/home/hero";
import { Skills } from "@/components/home/skills";
import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/data/data";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import api from "@/lib/api";

const HomePage = async () => {
  const { hero, about, skills } = siteData;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["featuredPosts"],
    queryFn: async () => api.postService.searchPosts({ isFeatured: true }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["featuredProjects"],
    queryFn: async () =>
      api.projectService.getManyProjects({ isFeatured: true }),
  });

  return (
    <>
      <Hero {...hero} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FeaturedPosts />
        <About bgGray {...about} />
        <Skills sillList={skills} />
        <FeaturedProjects bgGray />
      </HydrationBoundary>

      <Section containerClass="flex flex-col justify-center mx-auto items-center text-center  ">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">
          Ready to work together?
        </h3>
        <p className="sm:text-lg mb-8 font-semibold text-gray-800">
          Whether you need a full-stack developer for your next project or want
          to collaborate on something exciting, let's connect and build
          something great.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 hover:shadow-md transition duration-200"
          >
            <Link href="/contact">Contact Me</Link>
          </Button>
          <Button
            asChild
            className="bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition duration-200"
          >
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default HomePage;
