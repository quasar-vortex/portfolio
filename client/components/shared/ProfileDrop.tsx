"use client";

import { useAuthStore } from "@/app/providers/storeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalize } from "@/lib/utils/index";

import Link from "next/link";
import React from "react";
import SignOut from "./SignOut";

const ProfileDrop = () => {
  const { user } = useAuthStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex md:flex-col items-center gap-1">
        <Avatar className="size-6">
          <AvatarImage src={user?.avatarFile?.url} alt="avatar" />
          <AvatarFallback>
            <div className="size-8 bg-gray-700"></div>
          </AvatarFallback>
        </Avatar>
        <span>{capitalize(user!.firstName)}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account">Account</Link>
        </DropdownMenuItem>

        {user!.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/dash">Admin</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDrop;
