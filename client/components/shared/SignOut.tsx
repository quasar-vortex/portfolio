"use client";

import { Button } from "../ui/button";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "@/app/providers/storeProvider";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const { clearUser } = useAuthStore();

  const handleSignOff = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/logoff`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      await res.json();
      clearUser();
      router.replace("/login");
    } catch (error) {
      router.replace("/");
      console.error(error);
      toast.error("Something Went Wrong", { position: "top-right" });
      clearUser();
    }
  };

  return (
    <Button
      onClick={handleSignOff}
      size="sm"
      className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 duration-200"
    >
      <FaSignOutAlt /> Sign Out
    </Button>
  );
};

export default SignOut;
