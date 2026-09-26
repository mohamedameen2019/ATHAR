export interface SupabaseContentTopic {
  topic?: string;
  introduction?: string;
  text?: string;
  source?: Array<{ src: string; title?: string }>;
  image?: Array<{ url?: string; src?: string; caption?: string }>;
  video?: Array<{ url: string; title?: string }>;
  map?: string;
  conclusion?: string;
  sub_links?: Array<{ title?: string; url?: string }>;
}

export interface SupabaseArticleRow {
  id: number;
  title: string;
  info: string | null;
  category: string | null;
  created_at: string;
  poster: string | null;
  views: number | null;
  secret_key?: string | null;
  reading_time: number | null;
  writter_id?: number | string | null;
  sub_category: string | null;
  content: SupabaseContentTopic[] | null;
  region: string | null;
  slug?: string | null;
  status?: string | null;
}

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: SupabaseArticleRow;
        Insert: Omit<SupabaseArticleRow, "id" | "created_at"> & {
          id?: number;
          created_at?: string;
        };
        Update: Partial<SupabaseArticleRow>;
      };
    };
  };
};
