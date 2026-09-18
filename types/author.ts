export interface Author {
  id: string;
  slug: string;
  name: string;
  role: string;
  title: string;
  avatar: string;
  bio: string;
  credentials?: string[];
  socialLinks?: {
    x?: string;
    website?: string;
    linkedin?: string;
  };
}
