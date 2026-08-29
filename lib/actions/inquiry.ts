"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  parentGuardian: z.string().optional(),
  age: z.string().optional(),
  country: z.string().optional(),
  whatsapp: z.string().min(5, "WhatsApp number is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  course: z.string().optional(),
  quranLevel: z.string().optional(),
  preferredDays: z.string().optional(),
  preferredTime: z.string().optional(),
  message: z.string().optional(),
});

export async function submitInquiry(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = inquirySchema.parse(rawData);

    // Save to database
    const inquiry = await prisma.inquiry.create({
      data: validatedData,
    });

    // Optional: Send Email Notification via Resend
    /*
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL,
        subject: `New Inquiry from ${inquiry.name}`,
        text: `
          New Inquiry Received:
          Name: ${inquiry.name}
          WhatsApp: ${inquiry.whatsapp}
          Email: ${inquiry.email}
          Course: ${inquiry.course}
          Message: ${inquiry.message}
        `,
      });
    }
    */

    revalidatePath("/admin/inquiries");
    
    return { success: true, message: "Your request has been received. We will contact you shortly." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "Something went wrong. Please try again or contact us via WhatsApp." };
  }
}
