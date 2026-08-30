"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, FileText, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { createCategory, deleteCategory, createPost, deletePost, togglePostPublish } from "@/lib/actions/blog";

export default function BlogDashboard({ initialCategories, initialPosts }: any) {
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");
  const [isAddingPost, setIsAddingPost] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 flex">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "posts" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <FileText className="h-4 w-4" /> Articles
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "categories" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <Folder className="h-4 w-4" /> Categories
        </button>
      </div>

      <div className="p-6">
        {activeTab === "posts" && (
          <div>
            {!isAddingPost ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">All Blog Posts</h2>
                  <Button onClick={() => setIsAddingPost(true)} className="bg-primary">Write New Post</Button>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">Title</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">Category</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                        <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {initialPosts.map((post: any) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <p className="font-medium text-gray-900">{post.title}</p>
                            <p className="text-xs text-gray-500 font-mono">/blog/{post.slug}</p>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{post.category?.name || "Uncategorized"}</td>
                          <td className="px-4 py-3">
                            <form action={async () => await togglePostPublish(post.id, !post.published)}>
                              <button type="submit" className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {post.published ? 'Published' : 'Draft'}
                              </button>
                            </form>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <form action={async () => await deletePost(post.id)}>
                              <button type="submit" className="text-red-500 hover:text-red-700 p-1">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))}
                      {initialPosts.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No posts written yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Write New Article</h2>
                  <Button variant="outline" onClick={() => setIsAddingPost(false)}>Cancel</Button>
                </div>
                <form action={async (formData) => { await createPost(formData); setIsAddingPost(false); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Title *</label>
                      <input type="text" name="title" required className="w-full p-2 border rounded-md text-sm" placeholder="e.g. How to Learn Quran Online" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">URL Slug (Optional)</label>
                      <input type="text" name="slug" className="w-full p-2 border rounded-md text-sm" placeholder="Auto-generated if empty" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select name="categoryId" className="w-full p-2 border rounded-md text-sm">
                      <option value="">Select Category...</option>
                      {initialCategories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Excerpt (Short Summary)</label>
                    <textarea name="excerpt" rows={2} className="w-full p-2 border rounded-md text-sm"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Article Content *</label>
                    <textarea name="content" required rows={10} className="w-full p-2 border rounded-md text-sm" placeholder="Write your full SEO optimized article here..."></textarea>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
                    <h3 className="font-semibold text-gray-700 text-sm">SEO Meta Data</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium mb-1">Meta Title</label>
                        <input type="text" name="metaTitle" className="w-full p-2 border rounded-md text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Meta Description</label>
                        <input type="text" name="metaDescription" className="w-full p-2 border rounded-md text-sm" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" name="published" value="true" id="published" className="rounded" defaultChecked />
                    <label htmlFor="published" className="text-sm font-medium">Publish Immediately</label>
                  </div>

                  <Button type="submit" className="bg-primary">Save Article</Button>
                </form>
              </div>
            )}
          </div>
        )}

        {activeTab === "categories" && (
          <div>
             <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h3 className="font-medium text-sm text-gray-700 mb-4 uppercase tracking-wider">Add Category</h3>
                <form action={createCategory} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Category Name</label>
                    <input type="text" name="name" required className="w-full p-2 border rounded-md text-sm" placeholder="e.g. Beginners" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Slug (Optional)</label>
                    <input type="text" name="slug" className="w-full p-2 border rounded-md text-sm" placeholder="e.g. beginners" />
                  </div>
                  <Button type="submit" className="bg-primary">Add Category</Button>
                </form>
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Name</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-500">Slug</th>
                      <th className="px-4 py-3 text-right font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {initialCategories.map((cat: any) => (
                      <tr key={cat.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">{cat.slug}</td>
                        <td className="px-4 py-3 text-right">
                          <form action={async () => await deleteCategory(cat.id)}>
                            <button type="submit" className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                    {initialCategories.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-gray-500">No categories added yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
