import { prisma } from "@/lib/prisma";
import SchedulingDashboard from "./scheduling-dashboard";

export default async function SchedulingPage() {
  const [teachers, students, scheduleSlots, lectureLogs, courses] = await Promise.all([
    prisma.teacher.findMany({ orderBy: { name: "asc" } }),
    prisma.student.findMany({ include: { teacher: true }, orderBy: { name: "asc" } }),
    prisma.scheduleSlot.findMany({ include: { student: true, teacher: true } }),
    prisma.lectureLog.findMany({ include: { student: true, teacher: true }, orderBy: { date: "desc" } }),
    prisma.course.findMany({ select: { title: true } }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-serif text-gray-900">Student Scheduling</h1>
      </div>
      
      <SchedulingDashboard 
        teachers={teachers} 
        students={students} 
        scheduleSlots={scheduleSlots} 
        lectureLogs={lectureLogs}
        courses={courses}
      />
    </div>
  );
}
