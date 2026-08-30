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
  
  await prisma.student.update({
    where: { id },
    data: {
      name,
      course,
      teacherId: teacherId || null,
    },
  });
  revalidatePath("/admin/scheduling");
}

export async function toggleStudentFinished(id: string, finished: boolean) {
  await prisma.student.update({
    where: { id },
    data: {
      isActive: !finished,
      finishedAt: finished ? new Date() : null,
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
  const endTime = formData.get("endTime") as string;
  
  const isOneOff = formData.get("isOneOff") === "true";
  const specificDateIso = formData.get("specificDate") as string;

  let specificDate = null;
  if (isOneOff && specificDateIso) {
    specificDate = new Date(specificDateIso);
    specificDate.setHours(0,0,0,0);
  }

  await prisma.scheduleSlot.create({
    data: {
      studentId,
      teacherId,
      dayOfWeek,
      startTime,
      endTime,
      specificDate,
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

export async function markLectureRearranged(
  studentId: string,
  teacherId: string,
  originalDateIso: string,
  newDateIso: string,
  newStartTime: string,
  newEndTime: string
) {
  const originalDate = new Date(originalDateIso);
  
  // 1. Mark the original class as REARRANGED
  const existing = await prisma.lectureLog.findFirst({
    where: { studentId, teacherId, date: originalDate }
  });

  const notes = `Rearranged to ${new Date(newDateIso).toLocaleDateString()} at ${newStartTime}`;

  if (existing) {
    await prisma.lectureLog.update({
      where: { id: existing.id },
      data: { status: "REARRANGED", notes }
    });
  } else {
    await prisma.lectureLog.create({
      data: { studentId, teacherId, date: originalDate, status: "REARRANGED", notes }
    });
  }

  // 2. Create the one-off Schedule Slot for the new time
  const newDate = new Date(newDateIso);
  await prisma.scheduleSlot.create({
    data: {
      studentId,
      teacherId,
      dayOfWeek: newDate.getDay(),
      startTime: newStartTime,
      endTime: newEndTime,
      specificDate: newDate,
    }
  });

  revalidatePath("/admin/scheduling");
}

export async function markLectureStatus(
  studentId: string,
  teacherId: string,
  dateIso: string,
  status: "COMPLETED" | "MISSED" | "DISMISSED" | "REARRANGED"
) {
  const date = new Date(dateIso);
  
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
