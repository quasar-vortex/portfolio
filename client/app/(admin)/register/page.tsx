"use client";

import { useAuthStore } from "@/app/providers/storeProvider";
import Link from "next/link";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";
import { LoginResponse } from "@/app/store";
import { useRouter } from "next/navigation";
import Form from "@/components/shared/form";
import {
  refinedSchema,
  registerFields,
  RegisterSchema,
} from "@/lib/auth/models";

const RegisterPage = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const handleRegister = async (d: RegisterSchema) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(d),
      });
      const { data } = await res.json();
      const { user, accessToken } = data as LoginResponse;
      setUser({ user, accessToken, createdAt: Date.now() });

      router.replace("/dash");
    } catch (error) {
      toast.error("Something Went Wrong With Registration", {
        position: "top-right",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col  h-full justify-center">
        <Form
          title="Register Account"
          description="Create a new account. (Can't do anything as a regular user other than edit your bio and profile image at this time)"
          btnText="Register"
          schema={refinedSchema}
          fields={registerFields}
          onSubmit={handleRegister}
        ></Form>
        <div className="flex justify-center mb-24">
          <Link
            href="/login"
            className="underline text-gray-700 hover:text-gray-900 duration-200"
          >
            Have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
