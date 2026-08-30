import { prisma } from "@/lib/prisma";
import BlogDashboard from "./blog-dashboard";

export const dynamic = 'force-dynamic';

export default async function BlogsAdminPage() {
  const categories = await prisma.blogCategory.findMany({ orderBy: { order: "asc" } });
  const posts = await prisma.blogPost.findMany({ 
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-900">Blog Content Management</h1>
          <p className="text-gray-500 mt-2">Manage your SEO blog posts and categories.</p>
        </div>
      </div>
      
      <BlogDashboard initialCategories={categories} initialPosts={posts} />
    </div>
  );
}
