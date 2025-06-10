import z from "zod";
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
export async function POST(req: Request) {
  try {
    const body = await req.json();
    await contactSchema.parseAsync(body);
    await fetch(formUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return Response.json({ message: "Message was sent!" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: error.issues }, { status: 400 });
    }
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to send message!",
      },
      { status: 500 }
    );
  }
}
