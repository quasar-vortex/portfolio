"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/app/providers/storeProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const tagSchema = z.object({
  name: z.string().min(2).max(50),
});

type TagModel = z.infer<typeof tagSchema>;

export default function EditTagPage() {
  const { accessToken } = useAuthStore();
  const router = useRouter();
  const params = useParams();
  const qc = useQueryClient();
  const { tagId } = params as { tagId: string };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagModel>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "" },
  });

  const { data } = useQuery({
    queryKey: ["editTag", tagId],
    queryFn: async () =>
      await api.tagService.getTagByIdHandler(tagId, accessToken!),
  });

  useEffect(() => {
    if (data) reset({ name: data.data.name });
  }, [data, reset]);

  const onSubmit = async (formData: TagModel) => {
    try {
      await api.tagService.updateTagsHandler(tagId, formData, accessToken!);
      qc.invalidateQueries({ queryKey: ["manageTags"] });
      router.replace("/dash/tags");
    } catch (e) {
      toast.error((e instanceof Error && e.message) || "Unable to update tag");
    }
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Tag</h1>
        <Button onClick={() => router.replace("/dash/tags")}>Back</Button>
      </div>
      <Card>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <label htmlFor="name" className="text-gray-600">
              Tag Name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="w-full border border-gray-300 p-2 text-lg"
            />
            {errors.name && (
              <p className="text-red-600 text-sm font-bold">
                {errors.name.message}
              </p>
            )}
            <Button type="submit" className="mx-auto font-bold cursor-pointer">
              Update Tag
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
