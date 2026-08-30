"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, AlertCircle, Check, X, Clock, Plus, Trash2, Edit } from "lucide-react";
import { createStudent, deleteStudent, updateStudent, createScheduleSlot, deleteScheduleSlot, markLectureStatus, markLectureRearranged } from "@/lib/actions/scheduling";

type Teacher = { id: string; name: string };
type Student = { id: string; name: string; course: string | null; teacherId: string | null; isActive: boolean; teacher?: Teacher | null };
type ScheduleSlot = { id: string; studentId: string; teacherId: string; dayOfWeek: number; startTime: string; durationMins: number; student: Student; teacher: Teacher };
type LectureLog = { id: string; studentId: string; teacherId: string; date: Date; status: string; student: Student; teacher: Teacher };

export default function SchedulingDashboard({
  teachers,
  students,
  scheduleSlots,
  lectureLogs,
  courses
}: {
  teachers: Teacher[];
  students: Student[];
  scheduleSlots: ScheduleSlot[];
  lectureLogs: LectureLog[];
  courses: { title: string }[];
}) {
  const [activeTab, setActiveTab] = useState<"timetable" | "missing" | "students">("timetable");
  const [selectedTeacher, setSelectedTeacher] = useState<string>(teachers[0]?.id || "");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 flex overflow-x-auto">
        <button
          onClick={() => setActiveTab("timetable")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "timetable" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <Calendar className="h-4 w-4" /> Weekly Timetable
        </button>
        <button
          onClick={() => setActiveTab("missing")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "missing" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <AlertCircle className="h-4 w-4" /> Missing / Tracking
        </button>
        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "students" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <Users className="h-4 w-4" /> Manage Students
        </button>
      </div>

      <div className="p-6">
        {activeTab === "timetable" && (
          <TimetableView 
            teachers={teachers}
            students={students}
            scheduleSlots={scheduleSlots}
            selectedTeacher={selectedTeacher}
            setSelectedTeacher={setSelectedTeacher}
          />
        )}
        
        {activeTab === "missing" && (
          <MissingLecturesView 
            scheduleSlots={scheduleSlots}
            lectureLogs={lectureLogs}
          />
        )}
        
        {activeTab === "students" && (
          <StudentsView 
            students={students}
            teachers={teachers}
            courses={courses}
          />
        )}
      </div>
    </div>
  );
}

// --- TAB COMPONENTS ---

function TimetableView({ teachers, students, scheduleSlots, selectedTeacher, setSelectedTeacher }: any) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  // Generate times from 00:00 to 23:30
  const timeSlots = Array.from({ length: 48 }).map((_, i) => {
    const hours = Math.floor(i / 2).toString().padStart(2, "0");
    const mins = i % 2 === 0 ? "00" : "30";
    return `${hours}:${mins}`;
  });

  const slotsForTeacher = scheduleSlots.filter((s: any) => s.teacherId === selectedTeacher);
  const teacherStudents = students.filter((s: any) => s.teacherId === selectedTeacher);

  const handleAddSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      await createScheduleSlot(formData);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (!teachers.length) return <div>Please add teachers first.</div>;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">View Timetable For:</label>
          <select 
            value={selectedTeacher} 
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="border-gray-300 rounded-md shadow-sm p-2 border focus:ring-primary focus:border-primary w-64"
          >
            {teachers.map((t: any) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <form onSubmit={handleAddSlot} className="flex flex-wrap items-end gap-2 bg-gray-50 p-4 rounded-lg border border-gray-100">
          <input type="hidden" name="teacherId" value={selectedTeacher} />
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Student</label>
            <select name="studentId" required className="p-2 border rounded-md text-sm w-40">
              <option value="">Select...</option>
              {teacherStudents.map((s: any) => (
                <option key={s.id} value={s.id}>{s.name} ({s.id.slice(-4).toUpperCase()})</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Day</label>
            <select name="dayOfWeek" required className="p-2 border rounded-md text-sm w-28">
              {days.map((day, idx) => (
                <option key={idx} value={(idx + 1) % 7}>{day}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Time</label>
            <select name="startTime" required className="p-2 border rounded-md text-sm w-24">
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Duration</label>
            <select name="durationMins" required className="p-2 border rounded-md text-sm w-24">
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
              <option value="60">60 mins</option>
              <option value="90">90 mins</option>
              <option value="120">120 mins</option>
            </select>
          </div>
          
          <Button type="submit" size="sm" className="bg-primary h-[38px]">Add Slot</Button>
        </form>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 w-24">Time</th>
              {days.map(day => (
                <th key={day} className="px-4 py-3 text-left font-medium text-gray-500 min-w-[120px]">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map((time) => (
              <tr key={time} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-500 bg-gray-50 whitespace-nowrap">{time}</td>
                {days.map((_, dayIdx) => {
                  const dbDayOfWeek = (dayIdx + 1) % 7; // Monday = 1, Sunday = 0
                  const slot = slotsForTeacher.find((s: any) => s.dayOfWeek === dbDayOfWeek && s.startTime === time);
                  
                  return (
                    <td key={dayIdx} className="px-4 py-2 border-l border-gray-100">
                      {slot ? (
                        <div className="bg-primary/10 border border-primary/20 text-primary rounded p-1.5 text-xs flex justify-between items-center group">
                          <span className="font-medium truncate">
                            {slot.student.name} <span className="opacity-75">({slot.durationMins}m)</span>
                          </span>
                          <form action={async () => { await deleteScheduleSlot(slot.id) }}>
                            <button type="submit" className="text-red-500 opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 rounded">
                              <X className="h-3 w-3" />
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="h-6"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MissingLecturesView({ scheduleSlots, lectureLogs }: any) {
  // Simple logic to find expected classes for the last 7 days vs logged classes
  const expectedClasses: any[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay(); 
    
    const slots = scheduleSlots.filter((s: any) => s.dayOfWeek === dayOfWeek);
    
    slots.forEach((slot: any) => {
      const [hours, mins] = slot.startTime.split(':');
      const classTime = new Date(d);
      classTime.setHours(parseInt(hours), parseInt(mins), 0, 0);
      
      if (classTime > new Date()) return;
      
      const logged = lectureLogs.find((l: any) => 
        l.studentId === slot.studentId && 
        new Date(l.date).toDateString() === classTime.toDateString()
      );
      
      if (!logged || logged.status === 'MISSED') {
        expectedClasses.push({
          date: classTime,
          slot,
          log: logged
        });
      }
    });
  }
  
  expectedClasses.sort((a, b) => b.date.getTime() - a.date.getTime());

  if (expectedClasses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">All Caught Up!</h3>
        <p className="text-gray-500 mt-2">No missing lectures found for the past 7 days.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Pending / Missing Lectures (Past 7 Days)</h3>
      <div className="space-y-4">
        {expectedClasses.map((item, idx) => (
          <MissingLectureCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

function MissingLectureCard({ item }: { item: any }) {
  const [isRearranging, setIsRearranging] = useState(false);
  const [note, setNote] = useState("");

  if (isRearranging) {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Rearrange Class for {item.slot.student.name}</h4>
        <p className="text-xs text-blue-700 mb-3">Original Time: {item.date.toLocaleDateString()} at {item.slot.startTime}</p>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="E.g. Moved to Saturday 10:00 AM" 
            className="flex-1 p-2 text-sm border border-blue-200 rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={async () => {
              await markLectureRearranged(item.slot.studentId, item.slot.teacherId, item.date.toISOString(), note || "Rearranged by admin");
              setIsRearranging(false);
            }}
          >
            Confirm
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsRearranging(false)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-red-700">{item.slot.student.name}</span>
          <span className="text-sm text-red-500">• {item.slot.teacher.name}</span>
        </div>
        <div className="text-sm text-red-600 flex items-center gap-1">
          <Clock className="h-4 w-4" /> 
          {item.date.toLocaleDateString()} at {item.slot.startTime}
        </div>
      </div>
      
      <div className="flex gap-2 flex-wrap justify-end">
        <Button 
          size="sm" 
          className="bg-green-600 hover:bg-green-700"
          onClick={async () => {
            await markLectureStatus(item.slot.studentId, item.slot.teacherId, item.date.toISOString(), "COMPLETED");
          }}
        >
          Mark Completed
        </Button>
        <Button 
          size="sm" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsRearranging(true)}
        >
          Rearrange
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="text-gray-600 border-gray-300 hover:bg-gray-100"
          onClick={async () => {
            await markLectureStatus(item.slot.studentId, item.slot.teacherId, item.date.toISOString(), "DISMISSED");
          }}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
}

function StudentsView({ students, teachers, courses }: any) {
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>, studentId: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("isActive", "true");
    await updateStudent(studentId, formData);
    setEditingStudentId(null);
  };

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="font-medium text-sm text-gray-700 mb-4 uppercase tracking-wider">Add New Student</h3>
        <form action={createStudent} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Student Name</label>
            <input type="text" name="name" required className="w-full p-2 border rounded-md text-sm focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Course</label>
            <select name="course" className="w-full p-2 border rounded-md text-sm focus:ring-primary focus:border-primary">
              <option value="">Select...</option>
              {courses.map((c: any) => <option key={c.title} value={c.title}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Assigned Teacher</label>
            <select name="teacherId" className="w-full p-2 border rounded-md text-sm focus:ring-primary focus:border-primary">
              <option value="">No Teacher</option>
              {teachers.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <Button type="submit" className="bg-primary">Add Student</Button>
        </form>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">ID</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Course</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">Teacher</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student: any) => {
              const isEditing = editingStudentId === student.id;
              
              if (isEditing) {
                return (
                  <tr key={student.id} className="bg-primary/5">
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{student.id.slice(-4).toUpperCase()}</td>
                    <td colSpan={4} className="px-4 py-3">
                      <form onSubmit={(e) => handleUpdate(e, student.id)} className="flex items-center gap-4">
                        <input type="text" name="name" defaultValue={student.name} required className="p-1.5 border rounded-md text-sm flex-1" />
                        <select name="course" defaultValue={student.course || ""} className="p-1.5 border rounded-md text-sm flex-1">
                          <option value="">Select...</option>
                          {courses.map((c: any) => <option key={c.title} value={c.title}>{c.title}</option>)}
                        </select>
                        <select name="teacherId" defaultValue={student.teacherId || ""} className="p-1.5 border rounded-md text-sm flex-1">
                          <option value="">No Teacher</option>
                          {teachers.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" className="bg-primary h-8">Save</Button>
                          <Button type="button" size="sm" variant="outline" className="h-8" onClick={() => setEditingStudentId(null)}>Cancel</Button>
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{student.id.slice(-4).toUpperCase()}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-4 py-3 text-gray-500">{student.course || "-"}</td>
                  <td className="px-4 py-3 text-gray-500">{student.teacher?.name || <span className="text-red-500 text-xs font-medium">Unassigned</span>}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button onClick={() => setEditingStudentId(student.id)} className="text-gray-500 hover:text-primary p-1">
                      <Edit className="h-4 w-4" />
                    </button>
                    <form action={async () => { await deleteStudent(student.id) }}>
                      <button type="submit" className="text-red-500 hover:text-red-700 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
            {students.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No students added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
