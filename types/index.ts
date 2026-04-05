export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
  description?: string;
  type: 'project' | 'blog' | 'post' | 'experience' | 'gallery' | 'general';
  created_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  company_url?: string;
  logo_url?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  location?: string;
  type: 'work' | 'internship' | 'education' | 'volunteering' | 'award';
  description: string[];
  technologies: string[];
  category_id?: string;
  sort_order: number;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description?: string;
  thumbnail_url?: string;
  screenshots?: string[];
  github_url?: string;
  live_url?: string;
  readme_content?: string;
  technologies: string[];
  category_id?: string;
  category?: Category;
  is_featured: boolean;
  is_archived: boolean;
  sort_order: number;
  github_stars: number;
  github_forks: number;
  status: 'in_progress' | 'completed' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image_url?: string;
  category_id?: string;
  category?: Category;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  reading_time?: number;
  views: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface SocialPost {
  id: string;
  content: string;
  media_urls?: string[];
  post_type: 'text' | 'image' | 'carousel' | 'gif';
  category_id?: string;
  category?: Category;
  tags: string[];
  is_published: boolean;
  likes_count: number;
  views_count: number;
  pinned: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Comment {
  id: string;
  post_type: 'blog' | 'social';
  post_id: string;
  author_name?: string;
  author_email?: string;
  content: string;
  is_approved: boolean;
  is_flagged: boolean;
  parent_id?: string;
  ip_address?: string;
  created_at?: string;
  replies?: Comment[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  replied_at?: string;
  ip_address?: string;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title?: string;
  description?: string;
  image_url: string;
  category_id?: string;
  category?: Category;
  tags?: string[];
  is_published: boolean;
  sort_order: number;
  created_at?: string;
}

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  proficiency: number;
  category: 'frontend' | 'backend' | 'ml' | 'devops' | 'tools' | 'design';
  sort_order: number;
  is_featured: boolean;
  created_at?: string;
}

export interface SiteSetting {
  key: string;
  value: string;
  updated_at?: string;
}

export interface PostLike {
  id: string;
  post_type: string;
  post_id: string;
  ip_address?: string;
  session_id?: string;
  created_at?: string;
}
