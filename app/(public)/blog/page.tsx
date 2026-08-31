import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import { CTASection } from "@/components/sections/cta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | Noor Quran Academy | Islamic Articles & Tips',
  description: 'Read our latest articles on Quran learning, Tajweed rules, memorization tips for kids and adults, and online learning guides.',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  
  const categories = await prisma.blogCategory.findMany({ orderBy: { order: "asc" } });
  
  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      ...(category ? { category: { slug: category } } : {})
    },
    include: { category: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <>
      <div className="pt-32 pb-12 bg-primary/5">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-primary mb-6">Our Blog</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Tips, guides, and resources for learning Quran online, mastering Tajweed, and raising righteous children.
          </p>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            <Link 
              href="/blog" 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.slug ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6 flex-1 flex flex-col">
                  {post.category && (
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-3 block">
                      {post.category.name}
                    </span>
                  )}
                  <h2 className="text-2xl font-bold font-serif text-gray-900 group-hover:text-primary transition-colors mb-3">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="text-sm font-medium text-primary mt-auto flex items-center">
                    Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
            {posts.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No articles found in this category.
              </div>
            )}
          </div>

        </div>
      </div>
      
      <CTASection />
    </>
  );
}
