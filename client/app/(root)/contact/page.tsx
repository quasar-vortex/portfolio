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
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { sendMessage } from "@/app/actions/index";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const init: { message?: string; error?: string } = {
  message: "",
  error: undefined,
};
const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters.")
    .max(20, "First name cannot exceed 20 characters."),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters.")
    .max(20, "Last name cannot exceed 20 characters."),
  phone: z
    .string()
    .regex(/\d/gim)
    .min(10, { message: "Phone number must be 10 digits in length." })
    .max(10, { message: "Phone number must be 10 digits in length." }),
  email: z.string().email({ message: "Must enter a valid email address." }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters long." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});
type ContactSchema = z.infer<typeof contactSchema>;
type BaseField<T> = {
  name: keyof T;
  placeholder: string;
  type: "text" | "email" | "tel" | "password" | "textarea";
  label: string;
};
type Fields = (BaseField<ContactSchema> | BaseField<ContactSchema>[])[];
const fields: Fields = [
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
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    placeholder: "Enter your phone number (10 digits) 1234567899...",
    type: "tel",
  },
  {
    name: "message",
    label: "Message",
    placeholder: "Enter your message...",
    type: "textarea",
  },
];

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendMessage, init);
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    register,
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
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

  useEffect(() => {
    if (isSubmitSuccessful && state.message) {
      reset();
    }
  }, [reset, isSubmitSuccessful, state.message]);
  return (
    <Section>
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
          </CardTitle>
          <CardDescription>
            {state.message && (
              <p className="text-green-600 text-lg">{state.message}</p>
            )}
            {!state.message && (
              <p className=" text-gray-600 text-lg">
                Whether you want to work together or merely want to drop a
                message, don't hesistate to reach out using the form below.
              </p>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={formAction}
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(() => {
                startTransition(() =>
                  formAction(new FormData(formRef.current!))
                );
              })(e);
            }}
            className=" space-y-6"
          >
            {fields.map(renderField)}
            <div className="flex w-full justify-center">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-lg"
              >
                Send Message
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Section>
  );
};

export default Contact;
