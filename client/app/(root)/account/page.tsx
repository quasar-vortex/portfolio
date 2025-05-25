"use client";

import { registerSchema } from "@/app/(admin)/register/page";
import { useAuthStore } from "@/app/providers/storeProvider";
import { User } from "@/app/store";
import FileUploader from "@/components/shared/FileUploader";
import Form, { Fields } from "@/components/shared/form";
import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { API_URL } from "@/lib/constants";
import { capitalize } from "@/lib/utils/index";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { FiPenTool } from "react-icons/fi";
import { toast } from "sonner";
import { z } from "zod";

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

const AccountPage = () => {
  const [shouldDeleteAvatar, setShouldDeleteAvatar] = useState(false);
  const [file, setFile] = useState<null | File>(null);
  const [editProfile, setEditProfile] = useState(false);
  const { user, setUser, accessToken, createdAt } = useAuthStore();
  const { firstName, lastName, avatarFile, bio, email, role } = user!;
  const toggleEditMode = () => setEditProfile((p) => !p);

  const handleProfileUpdate = async ({
    firstName,
    lastName,
    email,
    bio,
  }: Pick<UpdateUserSchema, "email" | "firstName" | "lastName" | "bio">) => {
    try {
      let aFile = avatarFile;

      // 1. Delete avatar
      if (shouldDeleteAvatar && aFile) {
        await fetch(`${API_URL}/uploads/${aFile.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
        });
        aFile = null;
      }

      // 2. Upload new avatar if provided
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const uploaded = await fetch(`${API_URL}/uploads`, {
          method: "POST",
          credentials: "same-origin",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await uploaded.json();
        aFile = result.data;
      }

      // 3. Send update
      const res = await fetch(`${API_URL}/users/${user!.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          bio,
          avatarFileId: aFile?.id,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update user");
      }

      // 4. Update zustand store
      const p: { user: User; accessToken: string } = {
        user: { ...user!, email, firstName, lastName, bio, avatarFile: aFile },
        accessToken: accessToken!,
      };
      setUser({ user: p.user, accessToken: p.accessToken, createdAt });
      setEditProfile(false);
    } catch (err: any) {
      toast.error("Something went wrong", { position: "top-left" });
      console.error(err);
    }
  };

  const handleFileChange = (f: File) => setFile(f);
  return (
    <Section>
      <Card className="mx-auto max-w-lg">
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Account Settings</h1>
          <Button onClick={toggleEditMode} className="cursor-pointer">
            <FiPenTool />
          </Button>
        </CardHeader>
        <CardContent>
          {editProfile && avatarFile && (
            <div className="flex gap-3 mb-6 items-end">
              <Avatar>
                <AvatarImage
                  className="size-32 rounded-full"
                  src={avatarFile?.url}
                  alt="avatar"
                />
                <AvatarFallback>
                  <div className="size-32 bg-gray-700 rounded-full"></div>
                </AvatarFallback>
              </Avatar>
              <Button
                onClick={() => setShouldDeleteAvatar((p) => !p)}
                className={` duration-200 cursor-pointer ${
                  shouldDeleteAvatar && "bg-red-600 hover:bg-red-700"
                }`}
              >
                {shouldDeleteAvatar
                  ? "Avatar will be deleted (click to prevent)"
                  : "Click to delete avatar"}
              </Button>
            </div>
          )}
          {editProfile && !avatarFile && (
            <FileUploader onFileUpload={handleFileChange} />
          )}
          {!editProfile && (
            <>
              <div className="mb-6 flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    className="size-24 rounded-full"
                    src={avatarFile?.url}
                    alt="avatar"
                  />
                  <AvatarFallback>
                    <div className="size-24 bg-gray-700 rounded-full"></div>
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-700 text-lg sm:text-xl font-bold">
                    {capitalize(firstName)} {capitalize(lastName)}{" "}
                  </p>
                  <p className=" text-gray-500">{capitalize(role)}</p>
                  <span className="text-sm text-gray-500">{email}</span>
                </div>
              </div>
              <p className="text-gray-700">
                {bio || `You currently don't have a bio to display.`}
              </p>
            </>
          )}
          {editProfile && (
            <Form
              fields={registerFields.map((item) => {
                let value = undefined;
                if (!Array.isArray(item)) {
                  if (item.name === "bio") value = bio;
                  if (item.name === "firstName") value = firstName;
                  if (item.name === "lastName") value = lastName;
                  if (item.name === "email") value = email;
                  return { ...item, value };
                }
                return item;
              })}
              onSubmit={handleProfileUpdate}
              btnText="Upate Profile"
              schema={upateUserSchema}
            />
          )}
        </CardContent>
        {editProfile && (
          <CardFooter className="flex items-center justify-center">
            <Button
              onClick={toggleEditMode}
              className="bg-red-600 hover:bg-red-700 duration-200 cursor-pointer"
            >
              Cancel
            </Button>
          </CardFooter>
        )}
      </Card>
    </Section>
  );
};

export default AccountPage;
