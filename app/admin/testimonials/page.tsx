import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });

  async function addTestimonial(formData: FormData) {
    "use server";
    await prisma.testimonial.create({
      data: {
        name: formData.get("name") as string,
        country: formData.get("country") as string,
        role: formData.get("role") as string,
        review: formData.get("review") as string,
      }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  }

  async function deleteTestimonial(formData: FormData) {
    "use server";
    await prisma.testimonial.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  }

  async function editTestimonial(formData: FormData) {
    "use server";
    await prisma.testimonial.update({
      where: { id: formData.get("id") as string },
      data: {
        name: formData.get("name") as string,
        country: formData.get("country") as string,
        role: formData.get("role") as string,
        review: formData.get("review") as string,
      }
    });
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Testimonials</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Add New Testimonial</h2>
        <form action={addTestimonial} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Student/Parent Name</label>
              <input type="text" name="name" required className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input type="text" name="country" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Role (e.g. Parent of 2, Adult Learner)</label>
              <input type="text" name="role" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Review</label>
              <textarea name="review" required rows={4} className="w-full px-3 py-2 border rounded-md"></textarea>
            </div>
          </div>
          <Button type="submit">Add Testimonial</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
            <div className="flex-1">
              <p className="text-gray-700 italic mb-4">"{item.review}"</p>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.role} {item.country ? `- ${item.country}` : ''}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
              <details className="group">
                <summary className="cursor-pointer text-sm font-semibold text-primary mb-2 list-none hover:underline">Edit Testimonial</summary>
                <form action={editTestimonial} className="space-y-3 bg-gray-50 p-4 rounded-md border text-sm mt-2">
                  <input type="hidden" name="id" value={item.id} />
                  <input type="text" name="name" defaultValue={item.name} required className="w-full px-2 py-1 border rounded" placeholder="Name" />
                  <input type="text" name="country" defaultValue={item.country || ""} className="w-full px-2 py-1 border rounded" placeholder="Country" />
                  <input type="text" name="role" defaultValue={item.role || ""} className="w-full px-2 py-1 border rounded" placeholder="Role" />
                  <textarea name="review" defaultValue={item.review} required rows={3} className="w-full px-2 py-1 border rounded" placeholder="Review"></textarea>
                  <Button size="sm" type="submit" className="w-full">Save Changes</Button>
                </form>
              </details>

              <form action={deleteTestimonial}>
                <input type="hidden" name="id" value={item.id} />
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 w-full">Delete Testimonial</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
