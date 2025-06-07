"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuthStore } from "@/app/providers/storeProvider";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { User } from "@/lib/types";
import Image from "next/image";
import { capitalize } from "@/lib/utils";

const columns: TableColumn<User>[] = [
  {
    key: "avatarFile",
    header: "Avatar",
    render: (val) =>
      val ? (
        <Image
          src={(val as User["avatarFile"])!.url!}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      ) : null,
  },
  {
    key: "firstName",
    header: "First Name",
    render: (val) => capitalize(val as string),
  },
  {
    key: "lastName",
    header: "Last Name",
    render: (val) => capitalize(val as string),
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "role",
    header: "Role",
    render: (val) => (val as string).toLowerCase(),
  },
  {
    key: "isActive",
    header: "Active",
    render: (val) => (val ? "Yes" : "No"),
  },
];

export default function ManageUsersPage() {
  const { accessToken } = useAuthStore();
  const qc = useQueryClient();

  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async ({ userId }: { userId: string }) => {
      return api.userService.toggleUserRole(userId, accessToken!);
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      qc.invalidateQueries({ queryKey: ["manageUsers"] });
    },
    onError: (err) => {
      toast.error(err.message || "Unable to update role");
    },
  });

  return (
    <section className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Users</h1>
      </div>
      <PaginatedTable<User>
        queryKey="manageUsers"
        queryFn={async (params) =>
          api.userService.getManyUsersHandler(params, accessToken!)
        }
        columns={columns}
        actions={(user) => (
          <div className="flex gap-2">
            <Link href={`/dash/users/edit/${user.id}`}>
              <Button type="button" variant="outline" size="sm">
                Edit
              </Button>
            </Link>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              disabled={isPending}
              onClick={() =>
                updateRole({
                  userId: user.id,
                })
              }
            >
              Set {user.role === "ADMIN" ? "User" : "Admin"}
            </Button>
          </div>
        )}
        searchPlaceholder="Search users by name or email..."
      />
    </section>
  );
}
