"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- CATEGORIES ---

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  let slug = formData.get("slug") as string;
  if (!slug) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  await prisma.blogCategory.create({
    data: { name, slug }
  });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function deleteCategory(id: string) {
  await prisma.blogCategory.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

// --- POSTS ---

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  let slug = formData.get("slug") as string;
  if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  const categoryId = formData.get("categoryId") as string;

  await prisma.blogPost.create({
    data: {
      title,
      slug,
      categoryId: categoryId || null,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      metaTitle: formData.get("metaTitle") as string,
      metaDescription: formData.get("metaDescription") as string,
      published: formData.get("published") === "true",
    }
  });
  
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function deletePost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}

export async function togglePostPublish(id: string, published: boolean) {
  await prisma.blogPost.update({
    where: { id },
    data: { published }
  });
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
}
