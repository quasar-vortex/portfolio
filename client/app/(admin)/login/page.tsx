"use client";

import { useAuthStore } from "@/app/providers/storeProvider";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Form from "@/components/shared/form";
import api from "@/lib/api";
import { loginFields, loginSchema, LoginSchema } from "@/lib/auth/models";

const LoginPage = () => {
  const router = useRouter();
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    if (user) router.replace("/dash");
  }, [user, router]);

  const handleLogin = async (d: LoginSchema) => {
    try {
      const res = await api.authService.loginUser(d);
      const { user, accessToken } = res.data;
      setUser({ user, accessToken, createdAt: Date.now() });
      router.push("/dash");
    } catch (error) {
      toast.error("Something Went Wrong With Login", { position: "top-right" });
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col  h-full justify-center">
      <Form
        title="Login"
        description="Login to account."
        btnText="Login"
        fields={loginFields}
        schema={loginSchema}
        onSubmit={handleLogin}
      ></Form>
      <div className="flex justify-center mb-24">
        <Link
          href="/register"
          className="underline text-gray-700 hover:text-gray-900 duration-200"
        >
          Need an account?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
