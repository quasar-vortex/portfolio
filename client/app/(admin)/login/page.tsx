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
const init: { message?: string; error?: string } = {
  message: "",
  error: undefined,
};
const passwordRegex =
  /^(?=.{8,16}$)(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/;

const loginSchema = z.object({
  email: z.string().email({ message: "Must enter a valid email address." }),
  password: z.string().regex(passwordRegex, {
    message:
      "Must include at least one upper, one lower, one special and one number in your password. Between 8 and 16 characters.",
  }),
});

type LoginSchema = z.infer<typeof loginSchema>;
type BaseField<T> = {
  name: keyof T;
  placeholder: string;
  type: "text" | "email" | "tel" | "password" | "textarea";
  label: string;
};
type Fields = (BaseField<LoginSchema> | BaseField<LoginSchema>[])[];
const fields: Fields = [
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
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    register,
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const renderField = (f: Fields[0]): any => {
    if (Array.isArray(f)) {
      return f.map(renderField);
    }
    if (f.type !== "textarea")
      return (
        <div key={f.name} className="">
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
      <div key={f.name}>
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

  const handleLogin = () => {
    // Send request to login
    // Store profile and access token
    // Redirect to dash
  };

  return (
    <Section>
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
          </CardTitle>
          <CardDescription>
            <p className=" text-gray-600 text-lg">Login to your account.</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit((d) => {})} className=" space-y-6">
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
    </Section>
  );
};

export default LoginPage;
