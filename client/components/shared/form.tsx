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
import { useForm, FieldValues, Path } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";

export type BaseField<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  type: "text" | "email" | "tel" | "password" | "textarea";
  label: string;
  value?: string | null;
};
export type Fields<T extends FieldValues> = (BaseField<T> | BaseField<T>[])[];

type FormProps<T extends FieldValues> = {
  schema: ZodTypeAny;
  fields: Fields<T>;
  onSubmit: (data: T) => void;
  btnText?: string;
  children?: ReactNode;
  title?: string;
  description?: string;
};

function Form<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  children,
  btnText = "Submit",
  title,
  description,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: fields.reduce((a, c) => {
      //@ts-ignore
      return { ...a, [c.name]: c.value || "" };
    }, {} as any),
  });

  const renderField = (field: BaseField<T>) => {
    const fieldId = `field-${field.name}`;
    const error = errors[field.name]?.message;

    return (
      <div key={field.name} className="flex-1">
        <label htmlFor={fieldId} className="text-gray-600 block mb-2">
          {field.label}
        </label>
        {field.type === "textarea" ? (
          <textarea
            {...register(field.name)}
            id={fieldId}
            rows={8}
            placeholder={field.placeholder}
            className="resize-y w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
          />
        ) : (
          <input
            {...register(field.name)}
            id={fieldId}
            type={field.type}
            placeholder={field.placeholder}
            className="w-full border border-gray-300 focus:border-gray-500 duration-200 outline-none p-2 text-lg"
          />
        )}
        {error && (
          <span className="text-red-600 font-bold text-sm">
            {String(error)}
          </span>
        )}
      </div>
    );
  };

  const renderFields = (field: Fields<T>[number], index: number) => {
    if (Array.isArray(field)) {
      const rowKey = field.map((f) => f.name).join("-");
      return (
        <div key={rowKey} className="flex gap-3">
          {field.map(renderField)}
        </div>
      );
    }
    return renderField(field);
  };

  if (title || description)
    return (
      <Section>
        <Card className="mx-auto max-w-xl mb-6">
          <CardHeader>
            <CardTitle>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
            </CardTitle>
            {description && (
              <CardDescription>
                <p className="text-gray-600 text-lg">{description}</p>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((field, index) => renderFields(field, index))}
              <div className="flex w-full justify-center">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-lg"
                >
                  {btnText}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {children}
      </Section>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {fields.map((field, index) => renderFields(field, index))}
      <div className="flex w-full justify-center">
        <Button
          size="lg"
          className="bg-blue-500 hover:bg-blue-600 duration-200 cursor-pointer text-lg"
        >
          {btnText}
        </Button>
      </div>
    </form>
  );
}

export default Form;
