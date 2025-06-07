"use client";

import { useAuthStore } from "@/app/providers/storeProvider";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import React, { useState } from "react";
import FileUploader from "@/components/shared/FileUploader";
import Image from "next/image";
import { FiX } from "react-icons/fi";

const updateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters.")
    .max(250, "Bio cannot exceed 250 characters."),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

type UpdateUserForm = z.infer<typeof updateUserSchema>;

const userFields: {
  name: keyof UpdateUserForm;
  label: string;
  type: "text" | "textarea" | "password";
  placeholder: string;
}[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    placeholder: "Enter email address",
  },
  {
    name: "bio",
    label: "Bio",
    type: "textarea",
    placeholder: "Write a short bio",
  },
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
    placeholder: "Enter current password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter new password (optional)",
  },
];

export default function EditUserPage() {
  const { user, setUser, accessToken } = useAuthStore();
  const qc = useQueryClient();
  const router = useRouter();
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(user?.avatarFile?.url || "");
  const [avatarFileRemoved, setAvatarFileRemoved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      bio: user?.bio || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UpdateUserForm) => {
      let avatarFileId: string | undefined = undefined;
      if (coverImageFile) {
        const formData = new FormData();
        formData.set("image", coverImageFile);
        const { data: uploaded } = await api.uploadService.uploadNewFile(
          formData,
          accessToken!
        );
        avatarFileId = uploaded.id;
      } else if (!avatarFileRemoved) {
        avatarFileId = user?.avatarFile?.id;
      }

      return api.userService.updateUserProfile(
        user!.id,
        {
          ...data,
          avatarFileId,
          ...(data.newPassword == "" && { newPassword: undefined }),
        },
        accessToken!
      );
    },
    onSuccess: (data) => {
      setUser({
        user: data.data,
        accessToken,
        createdAt: Date.now(),
      });
      qc.invalidateQueries({ queryKey: ["account"] });
      toast.success("Profile updated successfully");
      router.push("/account");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Account</h1>
        <Button onClick={() => router.back()}>Back</Button>
      </div>
      <Card>
        <CardContent>
          <form
            onSubmit={handleSubmit((d) => mutation.mutate(d))}
            className="flex flex-col gap-4"
          >
            {imageUrl ? (
              <div className="flex flex-col items-center gap-4">
                <Image
                  className="rounded-full object-cover mx-auto"
                  src={imageUrl}
                  width={128}
                  height={128}
                  alt="Avatar Preview"
                />
                <Button
                  onClick={() => {
                    setImageUrl("");
                    setCoverImageFile(null);
                    setAvatarFileRemoved(true);
                  }}
                  type="button"
                  className="cursor-pointer bg-red-500 duration-200 hover:bg-red-600"
                >
                  <FiX /> Delete
                </Button>
              </div>
            ) : (
              <FileUploader
                onFileUpload={(file) => {
                  setCoverImageFile(file);
                  setImageUrl(URL.createObjectURL(file!));
                  setAvatarFileRemoved(false);
                }}
              />
            )}

            {userFields.map(({ name, label, type, placeholder }) => (
              <div key={name}>
                <label htmlFor={name} className="text-gray-600 block mb-2">
                  {label}
                </label>
                {type === "textarea" ? (
                  <textarea
                    {...register(name)}
                    id={name}
                    placeholder={placeholder}
                    className="resize-y w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
                  />
                ) : (
                  <input
                    {...register(name)}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
                  />
                )}
                {errors[name] && (
                  <p className="text-red-600 text-sm font-bold">
                    {errors[name]?.message as string}
                  </p>
                )}
              </div>
            ))}
            <Button type="submit" className="mx-auto font-bold cursor-pointer">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
