"use client";

import Section from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Fields, loginSchema, passwordRegex, pMessage } from "../login/page";

const registerSchema = loginSchema
  .pick({ email: true, password: true })
  .extend({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters.")
      .max(20, "First name cannot exceed 20 characters."),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters.")
      .max(20, "Last name cannot exceed 20 characters."),
    confirmPassword: z.string().regex(passwordRegex, { message: pMessage }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords must match",
    path: ["password", "confirmPassword"],
  });
type RegisterSchema = z.infer<typeof registerSchema>;
const fields: Fields<RegisterSchema> = [
  [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name...",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name...",
      type: "text",
    },
  ],
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password...",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password...",
    type: "password",
  },
];

const RegisterPage = () => {
  const router = useRouter();
  const { setUser, user } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    register,
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
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
      reset();
      router.replace("/dash");
    } catch (error) {
      toast.error("Something Went Wrong With Registration", {
        position: "top-right",
      });
      console.log(error);
    }
  };

  return (
    <Section>
      <Card className="mx-auto max-w-xl mb-6">
        <CardHeader>
          <CardTitle>
            <h2 className="text-3xl font-bold mb-4">Register</h2>
          </CardTitle>
          <CardDescription>
            <p className=" text-gray-600 text-lg">Register an account.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleRegister)} className=" space-y-6">
            {fields.map(renderField)}
            <div className="flex w-full justify-center">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-lg"
              >
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="flex justify-center">
        <Link
          href="/login"
          className="underline text-gray-700 hover:text-gray-900 duration-200"
        >
          Have an account?
        </Link>
      </div>
    </Section>
  );
};

export default RegisterPage;
