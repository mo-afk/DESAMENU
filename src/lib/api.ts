export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  year: number;
  tagline: string;
  description: string;
  image_url: string;
  services: string[];
  games: string[];
  metrics: Metric[];
  featured: boolean;
  timeline: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  project_slug: string | null;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  author_role: string;
  image_url: string;
  read_time: number;
  featured: boolean;
  published_at: string;
}

export interface InquiryInput {
  name: string;
  email: string;
  company?: string;
  project_type: string;
  budget?: string;
  timeline?: string;
  message: string;
}

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
  return data as T;
}

export const getProjects = (params = '') => api<Project[]>(`/api/projects${params}`);
export const getProject = (slug: string) => api<Project | null>(`/api/projects?slug=${encodeURIComponent(slug)}`);
export const getTestimonials = () => api<Testimonial[]>('/api/testimonials');
export const getPosts = (params = '') => api<Post[]>(`/api/posts${params}`);
export const getPost = (slug: string) => api<Post | null>(`/api/posts?slug=${encodeURIComponent(slug)}`);
export const submitInquiry = (input: InquiryInput) =>
  api<{ id: number }>('/api/inquiries', { method: 'POST', body: JSON.stringify(input) });

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
}
