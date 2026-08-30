"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Folder, FileText, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { createCategory, deleteCategory, createPost, deletePost, togglePostPublish, updatePost } from "@/lib/actions/blog";

export default function BlogDashboard({ initialCategories, initialPosts }: any) {
  const [activeTab, setActiveTab] = useState<"posts" | "categories">("posts");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 flex">
        <button
          onClick={() => { setActiveTab("posts"); setEditingPost(null); setIsAddingPost(false); }}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "posts" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          <FileText className="h-4 w-4" /> Articles
        </button>
        <button
          onClick={() => { setActiveTab("categories"); setEditingPost(null); setIsAddingPost(false); }}
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
            {!isAddingPost && !editingPost ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-serif text-gray-900">Articles</h2>
                  <Button onClick={() => setIsAddingPost(true)} className="bg-primary">Write New Article</Button>
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
                    <tbody className="divide-y divide-gray-200">
                      {initialPosts.map((post: any) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{post.title}</td>
                          <td className="px-4 py-3 text-gray-500">{post.category?.name || "Uncategorized"}</td>
                          <td className="px-4 py-3">
                            <button onClick={() => togglePostPublish(post.id, !post.published)} className={`flex items-center gap-1 ${post.published ? 'text-green-600' : 'text-gray-400'}`}>
                              {post.published ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                              {post.published ? "Published" : "Draft"}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => setEditingPost(post)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-4 h-4 inline" /></button>
                            <button onClick={() => deletePost(post.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-4 h-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-serif text-gray-900">{editingPost ? "Edit Article" : "Create New Article"}</h2>
                  <Button variant="outline" onClick={() => { setIsAddingPost(false); setEditingPost(null); }}>Cancel</Button>
                </div>
                
                <form action={(formData) => {
                  if (editingPost) updatePost(formData);
                  else createPost(formData);
                  setIsAddingPost(false);
                  setEditingPost(null);
                }} className="space-y-6">
                  {editingPost && <input type="hidden" name="id" value={editingPost.id} />}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1">Title</label>
                      <input type="text" name="title" defaultValue={editingPost?.title || ""} required className="w-full p-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Slug (Optional)</label>
                      <input type="text" name="slug" defaultValue={editingPost?.slug || ""} className="w-full p-2 border rounded-md" placeholder="auto-generated" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Category</label>
                      <select name="categoryId" defaultValue={editingPost?.categoryId || ""} className="w-full p-2 border rounded-md bg-white">
                        <option value="">No Category</option>
                        {initialCategories.map((c: any) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Excerpt (Short Summary)</label>
                    <textarea name="excerpt" defaultValue={editingPost?.excerpt || ""} rows={2} required className="w-full p-2 border rounded-md"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Full Content (Markdown Supported)</label>
                    <textarea name="content" defaultValue={editingPost?.content || ""} rows={12} required className="w-full p-2 border rounded-md font-mono text-sm"></textarea>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border space-y-4">
                    <h3 className="font-medium">SEO & Publishing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Meta Title</label>
                        <input type="text" name="metaTitle" defaultValue={editingPost?.metaTitle || ""} className="w-full p-2 border rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Meta Description</label>
                        <input type="text" name="metaDescription" defaultValue={editingPost?.metaDescription || ""} className="w-full p-2 border rounded-md" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input type="checkbox" id="published" name="published" value="true" defaultChecked={editingPost ? editingPost.published : true} className="w-4 h-4" />
                      <label htmlFor="published">Publish immediately</label>
                    </div>
                  </div>
                  
                  <Button type="submit" className="bg-primary">{editingPost ? "Save Changes" : "Save Article"}</Button>
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
