"use client";

import { useAuthStore } from "@/app/providers/storeProvider";
import { Container } from "@/components/shared/container";
import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React from "react";
import { FiPenTool } from "react-icons/fi";

const AccountPage = () => {
  const { user } = useAuthStore();
  const { firstName, lastName, avatarFile, bio, role } = user!;

  return (
    <>
      <header>
        <Container className="flex justify-between ">
          <h1 className="text-2xl font-bold sm:text-3xl">Account Settings</h1>
          <Button asChild className="cursor-pointer">
            <Link href="/account/edit">
              <FiPenTool />
            </Link>
          </Button>
        </Container>
      </header>
      <Section wrapperPadding={false}>
        <div className="flex gap-6 items-center mb-6">
          <Avatar>
            <AvatarImage
              className="size-24 sm:size-32 rounded-full"
              src={avatarFile?.url || ""}
            />
            <AvatarFallback>
              <div className="size-24 sm:size-32 rounded-full bg-slate-900 relative">
                <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white whitespace-nowrap">
                  No Image
                </p>
              </div>
            </AvatarFallback>
          </Avatar>
          <div>
            <span className="font-semibold text-gray-700 sm:text-lg">
              {capitalize(role)}
            </span>
            <h4 className="font-bold text-lg sm:text-xl">
              {capitalize(firstName)} {capitalize(lastName)}
            </h4>
          </div>
        </div>
        <p className="text-gray-700 font-semibold sm:text-lg">
          {bio || "You currently don't have a bio to display"}
        </p>
      </Section>
    </>
  );
};

export default AccountPage;
