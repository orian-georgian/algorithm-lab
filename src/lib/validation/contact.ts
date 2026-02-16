import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "nameMin")
    .max(80, "nameMax"),
  phone: z
    .string()
    .trim()
    .min(7, "phoneMin")
    .max(30, "phoneMax")
    .regex(/^[+0-9()\-\s]+$/, "phoneInvalid"),
  email: z
    .string()
    .trim()
    .email("emailInvalid")
    .max(120, "emailMax"),
  message: z
    .string()
    .trim()
    .min(10, "messageMin")
    .max(2000, "messageMax"),
  gdprAccepted: z
    .boolean()
    .refine((value) => value, { message: "gdprRequired" }),
  website: z.string().max(0).optional().default("")
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
