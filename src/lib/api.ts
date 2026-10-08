export interface Metric {
  value: string;
  label: string;
}

/**
 * One tailored capability of a venue, as shown in the pills on the demo cards.
 * `kind` decides how it is signed: games take the honey accent and the dice
 * mark, modules stay neutral — so the row of pills shows at a glance which
 * venues run table games.
 */
export interface ProjectFeature {
  label: string;
  kind: 'module' | 'game';
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
  /** Tailored capabilities, in priority order — rendered as pills. */
  features: ProjectFeature[];
  /**
   * The venue's own live menu, opened in a new tab from "View Live Menu".
   * `'#'` is the placeholder: until it is replaced the button renders in a
   * disabled state rather than opening a blank tab.
   */
  externalMenuUrl: string;
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
