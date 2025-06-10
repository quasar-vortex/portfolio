"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";

import Section from "@/components/shared/section";
import axios from "axios";
import { toast } from "sonner";

const contactSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  message: z.string().min(20).max(500),
});
type ContactSchema = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  return (
    <Section>
      <div className="flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-lg mx-auto max-w-5xl mt-10">
        <div
          className="relative lg:w-1/2 h-64 lg:h-auto bg-cover bg-center bg-black  bg-blend-luminosity"
          style={{ backgroundImage: "url('/terminal.png')" }}
        >
          <div
            style={{ textShadow: "1px 1px black" }}
            className="bg-[rgba(0,0,0,.7)] absolute inset-0  bg-opacity-80 text-white flex flex-col justify-center px-6 py-12"
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-base">
              I’d love to hear from you. Whether you have a question, want to
              collaborate, or just say hello.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Send a Message
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit(async (d) => {
              try {
                await axios.post("/api/contact", d);
                toast.success("Message Sent", { position: "top-right" });
                reset();
              } catch (error) {
                toast.error(
                  `Message Failed to Send: ${
                    error instanceof Error && error.message
                  }`,
                  {
                    position: "top-right",
                  }
                );
              }
            })}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-sm mb-1 text-gray-700">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm mb-1 text-gray-700">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Email</label>
              <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">Phone</label>
              <input
                {...register("phone")}
                placeholder="1234567890"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-700">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={6}
                placeholder="Enter your message..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            <div className="pt-2 flex justify-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-600 text-white text-sm px-6 py-2 rounded hover:bg-blue-700 transition font-semibold disabled:bg-gray-500 disabled:hover:bg-gray-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
