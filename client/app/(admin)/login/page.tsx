"use client";

import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/app/providers/storeProvider";
import Link from "next/link";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";
import { LoginResponse } from "@/app/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const passwordRegex =
  /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;
export const pMessage =
  "Must include at least one upper, one lower, one special and one number in your password. Between 8 and 16 characters.";
export const loginSchema = z.object({
  email: z.string().email({ message: "Must enter a valid email address." }),
  password: z.string().regex(passwordRegex, {
    message: pMessage,
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;
export type BaseField<T> = {
  name: keyof T;
  placeholder: string;
  type: "text" | "email" | "tel" | "password" | "textarea";
  label: string;
};
export type Fields<T> = (BaseField<T> | BaseField<T>[])[];
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
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    register,
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const renderField = (f: (typeof fields)[0]): any => {
    if (Array.isArray(f)) {
      return (
        <div key={Math.random() + f[0].name} className="flex gap-3">
          {f.map(renderField)}
        </div>
      );
    }
    if (f.type !== "textarea")
      return (
        <div key={f.name} className="flex-1">
          <label className="text-gray-600 block mb-2" htmlFor={f.name}>
            {f.label}
          </label>
          <input
            {...register(f.name)}
            className="w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
            type={f.type}
            name={f.name}
            placeholder={f.placeholder}
          />
          {errors[f.name]?.message && (
            <span className="text-red-600 font-bold text-sm">
              {errors[f.name]?.message}
            </span>
          )}
        </div>
      );

    return (
      <div key={f.name} className="flex-1">
        <label className="text-gray-600 block mb-2" htmlFor={f.name}>
          {f.label}
        </label>
        <textarea
          {...register(f.name)}
          className=" resize-y w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
          rows={8}
          name={f.name}
          placeholder={f.placeholder}
        />
        {errors[f.name]?.message && (
          <span className="text-red-600 font-bold text-sm">
            {errors[f.name]?.message}
          </span>
        )}
      </div>
    );
  };

  const handleLogin = async (d: LoginSchema) => {
    // Send request to login
    // Store profile and access token
    // Redirect to dash

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(d),
      });
      const { data } = await res.json();
      const { user, accessToken } = data as LoginResponse;
      setUser({ user, accessToken, createdAt: Date.now() });
      reset();
      router.push("/dash");
    } catch (error) {
      toast.error("Something Went Wrong With Login", { position: "top-right" });
      console.log(error);
    }
  };

  return (
    <Section>
      <Card className="mx-auto max-w-xl mb-6">
        <CardHeader>
          <CardTitle>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
          </CardTitle>
          <CardDescription>
            <p className=" text-gray-600 text-lg">Login to your account.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className=" space-y-6">
            {fields.map(renderField)}
            <div className="flex w-full justify-center">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-lg"
              >
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Link
          href="/register"
          className="underline text-gray-700 hover:text-gray-900 duration-200"
        >
          Need an account?
        </Link>
      </div>
    </Section>
  );
};

export default LoginPage;
