import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function CoursesAdminPage() {
  const courses = await prisma.course.findMany({ orderBy: { order: "asc" } });

  async function addCourse(formData: FormData) {
    "use server";
    await prisma.course.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
      }
    });
    revalidatePath("/admin/courses");
    revalidatePath("/");
  }

  async function deleteCourse(formData: FormData) {
    "use server";
    await prisma.course.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/courses");
    revalidatePath("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Courses</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Add New Course</h2>
        <form action={addCourse} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course Title</label>
              <input type="text" name="title" required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category (e.g., Beginners, Advanced)</label>
              <input type="text" name="category" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea name="description" required rows={3} className="w-full px-3 py-2 border rounded-md"></textarea>
            </div>
          </div>
          <Button type="submit">Add Course</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-primary">{course.title}</h3>
            {course.category && <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{course.category}</span>}
            <p className="text-sm text-gray-700 mt-2 mb-4">{course.description}</p>
            <form action={deleteCourse}>
              <input type="hidden" name="id" value={course.id} />
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 w-full">Delete</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
