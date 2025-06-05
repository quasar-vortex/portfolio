"use client";

import PaginatedTable, {
  TableColumn,
} from "@/components/shared/PaginatedTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuthStore } from "@/app/providers/storeProvider";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
          src={val.url}
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
    render: (val) => capitalize(val),
  },
  {
    key: "lastName",
    header: "Last Name",
    render: (val) => capitalize(val),
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "role",
    header: "Role",
    render: (val) => val.toLowerCase(),
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
  const r = useRouter();

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
          </div>
        )}
        searchPlaceholder="Search users by name or email..."
      />
    </section>
  );
}
