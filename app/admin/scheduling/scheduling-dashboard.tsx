"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users, AlertCircle, Check, X, Clock, Trash2, Edit, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { createStudent, deleteStudent, updateStudent, toggleStudentFinished, createScheduleSlot, deleteScheduleSlot, markLectureStatus, markLectureRearranged } from "@/lib/actions/scheduling";

type Teacher = { id: string; name: string };
type Student = { id: string; name: string; course: string | null; teacherId: string | null; isActive: boolean; finishedAt: Date | null; teacher?: Teacher | null };
type ScheduleSlot = { id: string; studentId: string; teacherId: string; dayOfWeek: number; startTime: string; endTime: string; specificDate: Date | null; student: Student; teacher: Teacher };
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

  // Week navigation state
  const [weekOffset, setWeekOffset] = useState(0);

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
            weekOffset={weekOffset}
            setWeekOffset={setWeekOffset}
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

// --- HELPER FUNCTIONS ---

function getDatesForWeekOffset(offset: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Find most recent Monday
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); 
  const monday = new Date(today.setDate(diff));
  
  // Apply offset
  monday.setDate(monday.getDate() + (offset * 7));
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
}

function parseTime(timeStr: string) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m; // minutes since midnight
}

// --- TAB COMPONENTS ---

function TimetableView({ teachers, students, scheduleSlots, selectedTeacher, setSelectedTeacher, weekOffset, setWeekOffset }: any) {
  const dates = getDatesForWeekOffset(weekOffset);
  const weekStart = dates[0];
  const weekEnd = dates[6];

  const timeSlots = Array.from({ length: 24 }).map((_, i) => `${i.toString().padStart(2, "0")}:00`);

  const slotsForTeacher = scheduleSlots.filter((s: any) => s.teacherId === selectedTeacher);
  const teacherStudents = students.filter((s: any) => s.teacherId === selectedTeacher && s.isActive);

  const handleAddSlot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Inject the specific date for the current week context in case it's a one-off
    const dayOfWeek = parseInt(formData.get("dayOfWeek") as string, 10);
    const selectedDate = dates.find(d => d.getDay() === dayOfWeek);
    if (selectedDate) {
      formData.append("specificDate", selectedDate.toISOString());
    }

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
      <div className="flex flex-col xl:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-col gap-4">
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
          
          {/* Week Navigation */}
          <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-lg p-2 w-max">
            <Button variant="outline" size="icon" onClick={() => setWeekOffset(weekOffset - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium text-sm text-gray-700 min-w-[200px] text-center">
              {weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
              {" - "} 
              {weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <Button variant="outline" size="icon" onClick={() => setWeekOffset(weekOffset + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setWeekOffset(0)} className="text-gray-500">
              Today
            </Button>
          </div>
        </div>

        <form onSubmit={handleAddSlot} className="flex flex-wrap items-end gap-2 bg-gray-50 p-4 rounded-lg border border-gray-100 flex-1 xl:max-w-3xl">
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
              {dates.map((d, idx) => (
                <option key={idx} value={d.getDay()}>{d.toLocaleDateString('en-US', { weekday: 'short' })}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Start Time</label>
            <input type="time" name="startTime" defaultValue="14:00" required className="p-2 border rounded-md text-sm w-28" />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">End Time</label>
            <input type="time" name="endTime" defaultValue="15:00" required className="p-2 border rounded-md text-sm w-28" />
          </div>

          <div className="flex items-center h-[38px] px-2 gap-2">
            <input type="checkbox" name="isOneOff" id="isOneOff" value="true" className="rounded" />
            <label htmlFor="isOneOff" className="text-xs text-gray-600 cursor-pointer">One-off class<br/>(this week only)</label>
            {/* We pass the exact date string for the selected day via JS before submit, or just use dayOfWeek + weekOffset server-side. Wait, let's just pass the selected specificDate via a hidden input that updates when dayOfWeek changes. For simplicity, we can do it on submit! */}
          </div>
          
          <Button type="submit" size="sm" className="bg-primary h-[38px] ml-auto">Add Slot</Button>
        </form>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white relative">
        <div className="flex min-w-[800px]">
          {/* Time Gutter */}
          <div className="w-16 flex-shrink-0 border-r border-gray-200 bg-gray-50 relative pt-12">
            {timeSlots.map((time, idx) => (
              <div key={idx} className="h-[60px] text-right pr-2 -mt-2.5 text-xs text-gray-400 font-medium relative z-10">
                {time}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="flex-1 flex relative">
            {/* Grid lines */}
            <div className="absolute inset-0 pointer-events-none flex flex-col pt-12">
              {timeSlots.map((_, idx) => (
                <div key={idx} className="h-[60px] border-b border-gray-100 w-full" />
              ))}
            </div>

            {dates.map((date, dayIdx) => {
              const dayOfWeek = date.getDay();
              
              // Filter slots for this specific date
              const daySlots = slotsForTeacher.filter((s: any) => {
                // Ignore if student is finished BEFORE this date
                if (s.student.finishedAt && new Date(s.student.finishedAt) < date) return false;

                if (s.specificDate) {
                  return new Date(s.specificDate).toDateString() === date.toDateString();
                }
                return s.dayOfWeek === dayOfWeek;
              });

              return (
                <div key={dayIdx} className="flex-1 min-w-[120px] border-r border-gray-200 relative pb-[1440px]">
                  <div className="h-12 bg-gray-50 border-b border-gray-200 sticky top-0 z-20 flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold uppercase text-gray-500">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <span className={`text-sm ${date.toDateString() === new Date().toDateString() ? 'bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center font-bold mt-0.5' : 'text-gray-900 mt-1'}`}>
                      {date.getDate()}
                    </span>
                  </div>

                  {/* Render Slots */}
                  {daySlots.map((slot: any) => {
                    const startMins = parseTime(slot.startTime);
                    const endMins = parseTime(slot.endTime);
                    const durationMins = endMins - startMins;
                    
                    const topPos = startMins + 48; // 48px is the header offset (pt-12)
                    
                    return (
                      <div 
                        key={slot.id} 
                        className={`absolute left-1 right-1 rounded shadow-sm border p-2 overflow-hidden group transition-all hover:z-30 hover:shadow-md ${
                          slot.specificDate ? 'bg-amber-50 border-amber-200' : 'bg-primary/10 border-primary/20'
                        }`}
                        style={{ 
                          top: `${topPos}px`, 
                          height: `${Math.max(durationMins, 20)}px` 
                        }}
                      >
                        <div className="flex justify-between items-start">
                          <div className={`font-semibold text-xs ${slot.specificDate ? 'text-amber-800' : 'text-primary'}`}>
                            {slot.student.name}
                          </div>
                          <form action={async () => { await deleteScheduleSlot(slot.id) }}>
                            <button type="submit" className="text-red-500 opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-50 rounded bg-white">
                              <X className="h-3 w-3" />
                            </button>
                          </form>
                        </div>
                        <div className={`text-[10px] mt-0.5 font-medium ${slot.specificDate ? 'text-amber-600' : 'text-primary/70'}`}>
                          {slot.startTime} - {slot.endTime}
                        </div>
                        {slot.specificDate && (
                          <div className="text-[9px] text-amber-500 mt-0.5 font-bold tracking-wider uppercase">
                            One-off
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MissingLecturesView({ scheduleSlots, lectureLogs }: any) {
  const expectedClasses: any[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay(); 
    
    // Only check recurring slots for missing logic
    const slots = scheduleSlots.filter((s: any) => s.dayOfWeek === dayOfWeek && !s.specificDate);
    
    slots.forEach((slot: any) => {
      // Ignore if student is inactive/finished before this date
      if (slot.student.finishedAt && new Date(slot.student.finishedAt) < d) return;

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
        <p className="text-gray-500 mt-2">No missing recurring classes found for the past 7 days.</p>
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

  const handleRearrange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newDate = formData.get("newDate") as string;
    const newStartTime = formData.get("newStartTime") as string;
    const newEndTime = formData.get("newEndTime") as string;
    
    await markLectureRearranged(
      item.slot.studentId, 
      item.slot.teacherId, 
      item.date.toISOString(), 
      newDate, 
      newStartTime, 
      newEndTime
    );
    setIsRearranging(false);
  };

  if (isRearranging) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-900 mb-2">Rearrange Class for {item.slot.student.name}</h4>
        <p className="text-xs text-amber-700 mb-3">Original Time: {item.date.toLocaleDateString()} at {item.slot.startTime}</p>
        
        <form onSubmit={handleRearrange} className="flex flex-wrap gap-2 items-end">
          <div>
            <label className="block text-xs text-amber-700 mb-1">New Date</label>
            <input type="date" name="newDate" required className="p-2 border rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-xs text-amber-700 mb-1">Start Time</label>
            <input type="time" name="newStartTime" required className="p-2 border rounded-md text-sm" />
          </div>
          <div>
            <label className="block text-xs text-amber-700 mb-1">End Time</label>
            <input type="time" name="newEndTime" required className="p-2 border rounded-md text-sm" />
          </div>
          
          <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 h-[38px]">
            Confirm Rearrange
          </Button>
          <Button type="button" size="sm" variant="outline" className="h-[38px]" onClick={() => setIsRearranging(false)}>
            Cancel
          </Button>
        </form>
        <p className="text-xs text-amber-600 mt-2 italic">This will place a one-off block on the calendar for this new date.</p>
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
          {item.date.toLocaleDateString()} at {item.slot.startTime} - {item.slot.endTime}
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
          className="bg-amber-600 hover:bg-amber-700"
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
              <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
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
                <tr key={student.id} className={student.isActive ? "hover:bg-gray-50" : "bg-gray-50 opacity-60 hover:opacity-100 transition-opacity"}>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{student.id.slice(-4).toUpperCase()}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    <div className="flex flex-col">
                      <span>{student.course || "-"}</span>
                      <span className="text-[10px] text-gray-400">by {student.teacher?.name || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {student.isActive ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        Finished on {student.finishedAt && new Date(student.finishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    {student.isActive ? (
                      <form action={async () => { await toggleStudentFinished(student.id, true) }}>
                        <Button type="submit" variant="outline" size="sm" className="h-7 text-xs px-2 gap-1" title="Mark as finished">
                          <GraduationCap className="h-3 w-3" /> Finish
                        </Button>
                      </form>
                    ) : (
                      <form action={async () => { await toggleStudentFinished(student.id, false) }}>
                        <Button type="submit" variant="outline" size="sm" className="h-7 text-xs px-2" title="Restore active status">
                          Reactivate
                        </Button>
                      </form>
                    )}
                    
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
