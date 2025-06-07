"use server";
import z from "zod";

/* 
const twilioConfig = {
  key: process.env.TWILIO_SECRET_KEY,
  keyId: process.env.TWILIO_KEY_ID,
  number: process.env.TWILIO_NUMBER,
  personalNum: process.env.PERSONAL_NUMBER,
  accountId: process.env.TWILIO_ACCOUNT_ID,
};
*/
const formUrl = "https://formspree.io/f/mdkgvkrz";
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
    .regex(/\d/g)
    .length(10, { message: "Phone number must be 10 digits in length." }),
  email: z.string().email({ message: "Must enter a valid email address." }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters long." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
});

//@ts-expect-error previous state in form send message
export const sendMessage = async (prevState, data: FormData) => {
  /* 
  const t = twilio(twilioConfig.keyId, twilioConfig.key, {
    accountSid: twilioConfig.accountId,
  });
*/

  const formData = Object.fromEntries(data);
  try {
    await contactSchema.parseAsync(formData);
    /* 
    const res = await t.messages.create({
      to: twilioConfig.personalNum!,
      from: twilioConfig.number,
      body: `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
    });
    const json = res.toJSON();
    console.log(json);
*/
    const res = await fetch(formUrl, {
      method: "POST",
      headers: {
        "Content-Type": "appliation/json",
      },
      body: JSON.stringify(formData),
    });
    if (res.ok) return { message: "Message Sent Successfully" };

    throw new Error("Something Went Wrong");
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        error: JSON.stringify(error.issues),
      };
    }
    return { error: "Something went wrong. Please try again later." };
  }
};
