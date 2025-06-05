"use client";

import { z } from "zod";
import { useAuthStore } from "@/app/providers/storeProvider";
import Link from "next/link";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";
import { LoginResponse } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Form, { Fields } from "@/components/shared/form";
import api from "@/lib/api";

export const passwordRegex =
  /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
export const pMessage =
  "Must include at least one upper, one lower, one special and one number in your password. Between 8 and 16 characters.";
export const baseUserModel = z.object({
  email: z.string().email({ message: "Must enter a valid email address." }),
  password: z.string().regex(passwordRegex, {
    message: pMessage,
  }),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(20, "First name cannot exceed 20 characters."),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(20, "Last name cannot exceed 20 characters."),
  confirmPassword: z.string().regex(passwordRegex, { message: pMessage }),
});
export const loginSchema = baseUserModel.pick({ email: true, password: true });

export type LoginSchema = z.infer<typeof loginSchema>;
const fields: Fields<LoginSchema> = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
  },
];

const LoginPage = () => {
  const router = useRouter();
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    if (user) router.replace("/dash");
  }, []);

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
        fields={fields}
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
