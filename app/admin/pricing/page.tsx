import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PricingAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit: editId } = await searchParams;
  const plans = await prisma.pricingPlan.findMany({
    orderBy: { order: "asc" }
  });
  
  const editingPlan = editId ? plans.find(p => p.id === editId) : null;

  async function savePlan(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const data = {
      name: formData.get("name") as string,
      price: formData.get("price") as string,
      features: formData.get("features") as string,
      isRecommended: formData.get("isRecommended") === "on",
    };

    if (id) {
      await prisma.pricingPlan.update({ where: { id }, data });
    } else {
      await prisma.pricingPlan.create({ data });
    }
    revalidatePath("/admin/pricing");
    revalidatePath("/");
  }

  async function deletePlan(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.pricingPlan.delete({ where: { id } });
    revalidatePath("/admin/pricing");
    revalidatePath("/");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Pricing Plans</h1>
        {editingPlan && (
          <Link href="/admin/pricing">
            <Button variant="outline">Cancel Edit</Button>
          </Link>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">{editingPlan ? "Edit Plan" : "Add New Plan"}</h2>
        <form action={savePlan} className="space-y-4">
          {editingPlan && <input type="hidden" name="id" value={editingPlan.id} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Plan Name</label>
              <input type="text" name="name" defaultValue={editingPlan?.name || ""} required className="w-full px-3 py-2 border rounded-md" placeholder="e.g. BASIC" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input type="text" name="price" defaultValue={editingPlan?.price || ""} required className="w-full px-3 py-2 border rounded-md" placeholder="e.g. $35" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Features (one per line)</label>
              <textarea name="features" defaultValue={editingPlan?.features || ""} required rows={4} className="w-full px-3 py-2 border rounded-md" placeholder="2 Classes Per Week&#10;One-to-One Learning"></textarea>
            </div>
            <div className="md:col-span-2 flex items-center">
              <input type="checkbox" name="isRecommended" id="isRecommended" defaultChecked={editingPlan?.isRecommended || false} className="mr-2" />
              <label htmlFor="isRecommended" className="text-sm">Highlight as Recommended Plan</label>
            </div>
          </div>
          <Button type="submit">{editingPlan ? "Update Plan" : "Create Plan"}</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div key={plan.id} className={`bg-white p-6 rounded-lg border ${editingPlan?.id === plan.id ? 'border-primary ring-2 ring-primary/20' : plan.isRecommended ? 'border-primary' : 'border-gray-200'} shadow-sm flex flex-col`}>
            <div>
              {plan.isRecommended && <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded mb-2 inline-block">Recommended</span>}
              <h3 className="font-bold text-lg">{plan.name}</h3>
              <p className="text-2xl font-bold text-primary my-2">{plan.price}</p>
              <ul className="text-sm space-y-2 mb-6">
                {plan.features.split("\n").map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
            </div>
            <div className="mt-auto flex gap-2">
              <Link href={`/admin/pricing?edit=${plan.id}`} className="w-1/2">
                <Button variant="outline" className="w-full">Edit</Button>
              </Link>
              <form action={deletePlan} className="w-1/2">
                <input type="hidden" name="id" value={plan.id} />
                <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50" type="submit">Delete</Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
