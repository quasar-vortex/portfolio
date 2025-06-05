"use client";

import { z } from "zod";

import { useAuthStore } from "@/app/providers/storeProvider";
import Link from "next/link";
import { toast } from "sonner";
import { API_URL } from "@/lib/constants";
import { LoginResponse } from "@/app/store";
import { useRouter } from "next/navigation";
import Form, { Fields } from "@/components/shared/form";
import { baseUserModel } from "../login/page";

export const registerSchema = baseUserModel.pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  confirmPassword: true,
});

const refinedSchema = registerSchema.refine(
  ({ password, confirmPassword }) => password === confirmPassword,
  {
    message: "Passwords must match",
    path: ["password", "confirmPassword"],
  }
);

export type RegisterSchema = z.infer<typeof registerSchema>;
export const registerFields: Fields<RegisterSchema> = [
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
  const { user, setUser } = useAuthStore();
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
          description="Create a new account."
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
