"use client";

import { registerSchema } from "@/app/(admin)/register/page";
import { useAuthStore } from "@/app/providers/storeProvider";
import { Container } from "@/components/shared/container";
import Form, { Fields } from "@/components/shared/form";
import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { capitalize } from "@/lib/utils/index";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React, { useState } from "react";
import { FiPenTool } from "react-icons/fi";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/shared/Spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import Image from "next/image";
const upateUserSchema = registerSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
  })
  .extend({
    bio: z
      .string()
      .min(20, "Bio must be at least 20 characters.")
      .max(250, "Bio cannot exceed 250 characters."),
  });

type UpdateUserSchema = z.infer<typeof upateUserSchema>;
const registerFields: Fields<UpdateUserSchema> = [
  {
    name: "firstName",
    label: "First Name",
    placeholder: "Enter your first name...",
    type: "text",
  },
  {
    name: "lastName",
    label: "Last Name",
    placeholder: "Enter your last name...",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "text",
  },
  {
    name: "bio",
    label: "Bio",
    placeholder: "Write about yourself...",
    type: "textarea",
  },
];

const UploadList = () => {
  const { user, accessToken } = useAuthStore();
  const { isPending, error, data } = useQuery({
    queryKey: ["userUploads"],
    queryFn: async () =>
      api.userService.getUploadsByUserId(user!.id, accessToken!),
  });
  if (isPending) return <Spinner />;
  if (error)
    return (
      <Alert className="mb-6 text-red-600 font-bold shadow-md">
        <AlertTitle>
          <h4 className="font-bold text-lg sm:text-xl">Unable to Load Posts</h4>
        </AlertTitle>
        {error?.message && <AlertDescription>{error.message}</AlertDescription>}
      </Alert>
    );
  return (
    <ul className="space-y-4">
      {data &&
        data.data.map((item) => {
          return (
            <li
              key={item.id}
              className="flex hover:bg-gray-400 duration-200 odd:bg-gray-100 p-4 flex-col items-center gap-3"
            >
              <h4>{item.originalName}</h4>
              <Image
                alt="user upload"
                height={200}
                width={200}
                src={item.url}
              />
            </li>
          );
        })}
    </ul>
  );
};

const EditAccountPage = () => {
  const { user, setUser } = useAuthStore();
  const { firstName, lastName, avatarFile, bio, role } = user!;

  return (
    <>
      <header>
        <Container className="flex justify-between ">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Edit Account Settings
          </h1>
          <Button asChild className="cursor-pointer">
            <Link href="/account">Back</Link>
          </Button>
        </Container>
      </header>

      <Section wrapperPadding={false}>
        <Card className="p-6 max-w-xl mx-auto">
          <div className="flex flex-col gap-6 items-center mb-6">
            <Dialog>
              <DialogTrigger className="cursor-pointer w-full hover:bg-gray-100 duration-200">
                <Avatar className="flex flex-col items-center">
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
                  <span className="text-red-600 block mt-3">
                    Click to Replace
                  </span>
                </Avatar>
              </DialogTrigger>
              <DialogContent className="max-h-1/2 overflow-y-auto">
                <DialogTitle>User Files</DialogTitle>
                <UploadList />
              </DialogContent>
            </Dialog>
            <Form
              fields={registerFields}
              onSubmit={(d) => {}}
              schema={upateUserSchema}
              btnText="Update Profile"
            />
          </div>
        </Card>
      </Section>
    </>
  );
};

export default EditAccountPage;
