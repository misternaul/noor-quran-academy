"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- STUDENT ACTIONS ---

export async function createStudent(formData: FormData) {
  const name = formData.get("name") as string;
  const course = formData.get("course") as string;
  const teacherId = formData.get("teacherId") as string;

  await prisma.student.create({
    data: {
      name,
      course,
      teacherId: teacherId || null,
    },
  });

  revalidatePath("/admin/scheduling");
}

export async function updateStudent(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const course = formData.get("course") as string;
  const teacherId = formData.get("teacherId") as string;
  const isActive = formData.get("isActive") === "true";

  await prisma.student.update({
    where: { id },
    data: {
      name,
      course,
      teacherId: teacherId || null,
      isActive,
    },
  });

  revalidatePath("/admin/scheduling");
}

export async function deleteStudent(id: string) {
  await prisma.student.delete({
    where: { id },
  });
  revalidatePath("/admin/scheduling");
}

// --- SCHEDULE SLOT ACTIONS ---

export async function createScheduleSlot(formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const teacherId = formData.get("teacherId") as string;
  const dayOfWeek = parseInt(formData.get("dayOfWeek") as string, 10);
  const startTime = formData.get("startTime") as string;

  // Check if slot already exists for this teacher at this time
  const existing = await prisma.scheduleSlot.findFirst({
    where: {
      teacherId,
      dayOfWeek,
      startTime,
    },
  });

  if (existing) {
    throw new Error("This time slot is already booked for this teacher.");
  }

  await prisma.scheduleSlot.create({
    data: {
      studentId,
      teacherId,
      dayOfWeek,
      startTime,
      durationMins: 30,
    },
  });

  revalidatePath("/admin/scheduling");
}

export async function deleteScheduleSlot(id: string) {
  await prisma.scheduleSlot.delete({
    where: { id },
  });
  revalidatePath("/admin/scheduling");
}

// --- LECTURE LOG ACTIONS ---

export async function markLectureStatus(
  studentId: string,
  teacherId: string,
  dateIso: string,
  status: "COMPLETED" | "MISSED" | "DISMISSED" | "REARRANGED"
) {
  const date = new Date(dateIso);
  
  // Check if a log already exists for this exact slot
  const existing = await prisma.lectureLog.findFirst({
    where: {
      studentId,
      teacherId,
      date,
    }
  });

  if (existing) {
    await prisma.lectureLog.update({
      where: { id: existing.id },
      data: { status }
    });
  } else {
    await prisma.lectureLog.create({
      data: {
        studentId,
        teacherId,
        date,
        status,
      }
    });
  }

  revalidatePath("/admin/scheduling");
}
