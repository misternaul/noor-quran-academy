import { prisma } from "@/lib/prisma";
import { Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const query = searchParams.q || "";
  const statusFilter = searchParams.status || "";

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold font-serif text-gray-900">Inquiries</h1>
        
        <form action="/api/admin/export" method="GET">
          <input type="hidden" name="q" value={query} />
          <input type="hidden" name="status" value={statusFilter} />
          <Button type="submit" variant="outline" className="bg-white">
            <Download className="mr-2 h-4 w-4" /> Export Excel
          </Button>
        </form>
      </div>

      {/* Filters */}
      <form action="/admin/inquiries" method="GET" className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            name="q"
            placeholder="Search name, email, whatsapp..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            defaultValue={query}
          />
        </div>
        <select 
          name="status"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue={statusFilter || "ALL"}
        >
          <option value="ALL">All Statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="TRIAL_SCHEDULED">Trial Scheduled</option>
          <option value="CONVERTED">Converted</option>
          <option value="CLOSED">Closed</option>
        </select>
        <Button type="submit">Apply Filters</Button>
      </form>

      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{inquiry.name}</div>
                      <div className="text-sm text-gray-500">{inquiry.age ? `${inquiry.age} yrs` : ''} • {inquiry.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="text-gray-900">{inquiry.whatsapp}</div>
                      <div>{inquiry.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {inquiry.course || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        inquiry.status === "NEW" ? "bg-green-100 text-green-800" : 
                        inquiry.status === "CONVERTED" ? "bg-accent/20 text-accent-foreground" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/admin/inquiries/${inquiry.id}`} className="text-primary hover:text-primary/80">View</a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
