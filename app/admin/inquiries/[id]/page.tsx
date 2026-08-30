import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, User, Phone, Mail, Calendar, MapPin, BookOpen, Clock, MessageSquare, Shield } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const inquiry = await prisma.inquiry.findUnique({
    where: { id }
  });

  if (!inquiry) {
    notFound();
  }

  async function updateStatus(formData: FormData) {
    "use server";
    const status = formData.get("status") as string;
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    revalidatePath(`/admin/inquiries/${id}`);
    revalidatePath("/admin/inquiries");
  }

  async function deleteInquiry() {
    "use server";
    await prisma.inquiry.delete({
      where: { id }
    });
    revalidatePath("/admin/inquiries");
    redirect("/admin/inquiries");
  }

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-800",
    CONTACTED: "bg-yellow-100 text-yellow-800",
    TRIAL_SCHEDULED: "bg-purple-100 text-purple-800",
    CONVERTED: "bg-green-100 text-green-800",
    CLOSED: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold font-serif text-gray-900">Inquiry Details</h1>
        </div>
        
        <form action={deleteInquiry}>
          <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" type="submit">Delete Inquiry</Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-gray-400" /> Student Information
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">{inquiry.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{inquiry.age || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Parent/Guardian</p>
                <p className="font-medium">{inquiry.parentGuardian || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {inquiry.country || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-gray-400" /> Course Preferences
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
              <div>
                <p className="text-sm text-gray-500">Selected Course</p>
                <p className="font-medium">{inquiry.course || "Any"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preferred Time</p>
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {inquiry.preferredTime || "Any time"}
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-gray-400" /> Message / Requirements
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap text-sm border border-gray-100">
                  {inquiry.message || "No additional message provided."}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" /> Status Management
            </h2>
            
            <form action={updateStatus} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Current Status</label>
                <select 
                  name="status" 
                  defaultValue={inquiry.status}
                  className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-primary focus:border-primary"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="TRIAL_SCHEDULED">Trial Scheduled</option>
                  <option value="CONVERTED">Converted (Student)</option>
                  <option value="CLOSED">Closed (Not Interested)</option>
                </select>
              </div>
              <Button type="submit" className="w-full">Update Status</Button>
            </form>
            
            <div className="mt-4 pt-4 border-t text-sm text-gray-500 flex items-center justify-between">
              <span>Date Received:</span>
              <span className="font-medium">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <Phone className="h-5 w-5 text-gray-400" /> Contact Details
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Phone className="h-4 w-4" /> WhatsApp
                </p>
                <p className="font-medium text-lg mt-1">
                  <a href={`https://wa.me/${inquiry.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="text-green-600 hover:underline">
                    {inquiry.whatsapp}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Mail className="h-4 w-4" /> Email
                </p>
                <p className="font-medium mt-1">
                  {inquiry.email ? (
                    <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
                      {inquiry.email}
                    </a>
                  ) : "No email provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
