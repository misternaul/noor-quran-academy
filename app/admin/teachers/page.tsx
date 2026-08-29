import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function TeachersAdminPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { order: "asc" } });

  async function addTeacher(formData: FormData) {
    "use server";
    await prisma.teacher.create({
      data: {
        name: formData.get("name") as string,
        qualification: formData.get("qualification") as string,
        specialization: formData.get("specialization") as string,
        bio: formData.get("bio") as string,
      }
    });
    revalidatePath("/admin/teachers");
    revalidatePath("/");
  }

  async function deleteTeacher(formData: FormData) {
    "use server";
    await prisma.teacher.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/teachers");
    revalidatePath("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Teachers</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Add New Teacher</h2>
        <form action={addTeacher} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" name="name" required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Qualification (e.g. Hafiz, Alim)</label>
              <input type="text" name="qualification" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Specialization (e.g. Tajweed, Qiraat)</label>
              <input type="text" name="specialization" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Short Bio</label>
              <textarea name="bio" rows={3} className="w-full px-3 py-2 border rounded-md"></textarea>
            </div>
          </div>
          <Button type="submit">Add Teacher</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg">{teacher.name}</h3>
            <p className="text-sm font-medium text-accent">{teacher.qualification}</p>
            <p className="text-sm text-gray-600 mt-1">{teacher.specialization}</p>
            <p className="text-sm text-gray-700 mt-3 mb-4">{teacher.bio}</p>
            <form action={deleteTeacher}>
              <input type="hidden" name="id" value={teacher.id} />
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 w-full">Delete</Button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
