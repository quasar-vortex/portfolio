"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";
import api from "@/lib/api";
import { useAuthStore } from "@/app/providers/storeProvider";
import { useQueryClient } from "@tanstack/react-query";

const tagSchema = z.object({
  name: z.string().min(2).max(50),
});

type TagForm = z.infer<typeof tagSchema>;

export default function NewTagPage() {
  const qc = useQueryClient();
  const { accessToken } = useAuthStore();
  const r = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagForm>({
    resolver: zodResolver(tagSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
    },
  });

  const handleCreate = async (data: TagForm) => {
    try {
      await api.tagService.createTagHandler(data, accessToken!);

      toast.success("Tag created");
      qc.invalidateQueries({ queryKey: ["manageTags"] });
      r.replace("/dash/tags");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create tag");
    }
  };

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Tag</h1>
        <Button onClick={() => r.back()}>Back</Button>
      </div>
      <Card>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleCreate)}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="name" className="text-gray-600 block mb-2">
                Tag Name
              </label>
              <input
                {...register("name")}
                id="name"
                type="text"
                placeholder="Enter tag name"
                className="w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
              />
              {errors.name && (
                <p className="text-red-600 text-sm font-bold">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mx-auto font-bold cursor-pointer">
              Create Tag
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
