import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const availableHoursSetting = await prisma.setting.findUnique({ where: { key: "available_hours" } });
  const emailSetting = await prisma.setting.findUnique({ where: { key: "contact_email" } });
  const phoneSetting = await prisma.setting.findUnique({ where: { key: "contact_phone" } });

  const currentHours = availableHoursSetting?.value || "Monday - Friday: 9 AM - 5 PM\nSaturday - Sunday: 10 AM - 4 PM";
  const currentEmail = emailSetting?.value || "info@noorquranacademy.com";
  const currentPhone = phoneSetting?.value || "+1 (234) 567-8900";

  async function saveSettings(formData: FormData) {
    "use server";
    const hours = formData.get("hours") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    
    await prisma.setting.upsert({
      where: { key: "available_hours" },
      update: { value: hours },
      create: { key: "available_hours", value: hours },
    });
    
    await prisma.setting.upsert({
      where: { key: "contact_email" },
      update: { value: email },
      create: { key: "contact_email", value: email },
    });
    
    await prisma.setting.upsert({
      where: { key: "contact_phone" },
      update: { value: phone },
      create: { key: "contact_phone", value: phone },
    });

    revalidatePath("/", "layout"); // Revalidate entire app to update global layouts
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
        <h2 className="text-lg font-bold mb-4">Global Settings</h2>
        <p className="text-sm text-gray-600 mb-6">Manage your contact information and available hours here. These will update across the entire website.</p>
        
        <form action={saveSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input type="email" name="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" defaultValue={currentEmail} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Phone / WhatsApp</label>
              <input type="text" name="phone" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" defaultValue={currentPhone} required />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Available Hours</label>
            <textarea
              name="hours"
              rows={5}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              defaultValue={currentHours}
              placeholder="e.g. 24/7 Available"
            />
          </div>
          <Button type="submit">Save Settings</Button>
        </form>
      </div>
    </div>
  );
}
