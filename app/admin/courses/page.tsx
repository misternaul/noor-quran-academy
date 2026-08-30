import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function CoursesAdminPage() {
  const courses = await prisma.course.findMany({ orderBy: { order: "asc" } });

  async function addCourse(formData: FormData) {
    "use server";
    
    // Auto-generate slug if empty
    let slug = formData.get("slug") as string;
    const title = formData.get("title") as string;
    if (!slug) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    await prisma.course.create({
      data: {
        title,
        slug,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        content: formData.get("content") as string,
        metaTitle: formData.get("metaTitle") as string,
        metaDescription: formData.get("metaDescription") as string,
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-serif text-gray-900">Manage Courses & SEO</h1>
        <p className="text-gray-500 mt-2">Every course automatically gets its own dedicated SEO page at /courses/[slug].</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold font-serif mb-4">Add New Course</h2>
        <form action={addCourse} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course Title *</label>
              <input type="text" name="title" required className="w-full p-2 border rounded-md" placeholder="e.g. Online Tajweed Classes" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">URL Slug (Optional)</label>
              <input type="text" name="slug" className="w-full p-2 border rounded-md" placeholder="e.g. online-tajweed-classes (auto-generated if empty)" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Description (Appears on Homepage) *</label>
            <textarea name="description" required rows={2} className="w-full p-2 border rounded-md"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Detailed Content (Appears on individual Course Page)</label>
            <textarea name="content" rows={5} className="w-full p-2 border rounded-md" placeholder="Write full details about the course, what they will learn, etc."></textarea>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
            <h3 className="font-semibold text-gray-700">SEO Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Meta Title</label>
                <input type="text" name="metaTitle" className="w-full p-2 border rounded-md" placeholder="Best Online Tajweed Classes | Noor Academy" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta Description</label>
                <input type="text" name="metaDescription" className="w-full p-2 border rounded-md" placeholder="Learn Tajweed online with certified tutors..." />
              </div>
            </div>
          </div>

          <Button type="submit" className="bg-primary">Add Course</Button>
        </form>
      </div>

      <div className="grid gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-serif text-primary">{course.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-mono">/courses/{course.slug}</span>
              </div>
              <p className="text-gray-600 mt-2">{course.description}</p>
              {course.metaTitle && (
                <div className="mt-3 text-xs text-gray-500 bg-gray-50 p-2 rounded border">
                  <strong>SEO Title:</strong> {course.metaTitle} <br/>
                  <strong>SEO Desc:</strong> {course.metaDescription}
                </div>
              )}
            </div>
            <form action={deleteCourse}>
              <input type="hidden" name="id" value={course.id} />
              <Button type="submit" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Delete</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
