import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export default async function SecurityAdminPage() {
  
  async function updatePassword(formData: FormData) {
    "use server";
    const newPassword = formData.get("newPassword") as string;
    if (newPassword.length < 6) return; // Basic validation
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the main admin user (assuming first user is admin)
    const adminUser = await prisma.adminUser.findFirst();
    if (adminUser) {
      await prisma.adminUser.update({
        where: { id: adminUser.id },
        data: { passwordHash: hashedPassword }
      });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h1>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-xl">
        <h2 className="text-lg font-bold mb-4">Change Admin Password</h2>
        <p className="text-sm text-gray-600 mb-6">Please choose a strong password to protect your academy's data.</p>
        
        <form action={updatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input type="password" name="newPassword" required minLength={6} className="w-full px-3 py-2 border rounded-md" />
          </div>
          <Button type="submit">Update Password</Button>
        </form>
      </div>
    </div>
  );
}
