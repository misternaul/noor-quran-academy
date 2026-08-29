import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as xlsx from "xlsx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const statusFilter = searchParams.get("status") || "";

  const whereClause: any = {};
  
  if (query) {
    whereClause.OR = [
      { name: { contains: query } },
      { email: { contains: query } },
      { whatsapp: { contains: query } },
    ];
  }

  if (statusFilter && statusFilter !== "ALL") {
    whereClause.status = statusFilter;
  }

  const inquiries = await prisma.inquiry.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  const data = inquiries.map(inq => ({
    ID: inq.id,
    Date: inq.createdAt.toLocaleDateString(),
    Name: inq.name,
    "Parent/Guardian": inq.parentGuardian || "",
    Age: inq.age || "",
    Country: inq.country || "",
    WhatsApp: inq.whatsapp,
    Email: inq.email || "",
    Course: inq.course || "",
    "Quran Level": inq.quranLevel || "",
    "Preferred Days": inq.preferredDays || "",
    "Preferred Time": inq.preferredTime || "",
    Message: inq.message || "",
    Status: inq.status,
  }));

  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Inquiries");
  
  const buf = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

  return new NextResponse(buf, {
    headers: {
      "Content-Disposition": 'attachment; filename="inquiries.xlsx"',
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}
