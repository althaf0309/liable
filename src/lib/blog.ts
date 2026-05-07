import { apiFetch } from "@/lib/api";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  published_at?: string | null;

  // Optional (only if you later add these fields in backend)
  category?: string;
  author_name?: string;
  cover_image_url?: string;
  read_time_mins?: number;
};

export async function fetchPublicBlogs() {
  const data = await apiFetch("/api/core/blog/public/");
  return Array.isArray(data) ? (data as BlogPost[]) : [];
}

export async function fetchPublicBlogDetail(slug: string) {
  return apiFetch(`/api/core/blog/public/${slug}/`) as Promise<BlogPost>;
}
