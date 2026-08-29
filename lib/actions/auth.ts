"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

export async function loginAdmin(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const { password } = loginSchema.parse(rawData);

    // Initialize default admin if not exists
    let admin = await prisma.adminUser.findFirst();
    
    if (!admin) {
      const defaultPasswordHash = await bcrypt.hash("dafulat", 10);
      admin = await prisma.adminUser.create({
        data: {
          email: "admin@noorquranacademy.com",
          passwordHash: defaultPasswordHash,
        }
      });
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isValid) {
      return { success: false, message: "Invalid password" };
    }

    await createSession(admin.id);
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.flatten().fieldErrors };
    }
    return { success: false, message: "An error occurred" };
  }
  
  redirect("/admin");
}
