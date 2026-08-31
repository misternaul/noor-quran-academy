import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CTASection } from "@/components/sections/cta";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post) return { title: "Article Not Found" };

  return {
    title: post.metaTitle || `${post.title} | Noor Quran Academy Blog`,
    description: post.metaDescription || post.excerpt || `Read ${post.title} on Noor Quran Academy's blog.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!post || (!post.published && process.env.NODE_ENV !== 'development')) {
    notFound();
  }

  return (
    <>
      <div className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>
          
          {post.category && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary font-semibold text-xs rounded-full uppercase tracking-wider mb-6">
              {post.category.name}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-12 border-b border-gray-100 pb-8">
            <time dateTime={post.createdAt.toISOString()}>
              Published on {post.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          </div>

          <article className="prose prose-lg prose-green max-w-none mb-16">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
          </article>
        </div>
      </div>
      
      <CTASection />
    </>
  );
}
