-- ==============================================================================
-- ATHAR (أثر) - Safe Database Migration & Row Level Security (RLS) for Supabase
-- This migration safely adapts the existing 'articles' table without destroying data.
-- ==============================================================================

-- 1. Safely add columns if they do not exist
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS is_editor_pick BOOLEAN DEFAULT false;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.articles ADD COLUMN IF NOT EXISTS og_image TEXT;

-- 2. Backfill existing rows to 'published' status if null
UPDATE public.articles
SET status = 'published'
WHERE status IS NULL;

-- 3. High-Performance PostgreSQL Indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug) WHERE slug IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_articles_status ON public.articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON public.articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON public.articles(views DESC);

-- 4. Enable PostgreSQL Full-Text Search for Arabic Content
CREATE INDEX IF NOT EXISTS idx_articles_arabic_search 
ON public.articles 
USING gin(to_tsvector('arabic', coalesce(title, '') || ' ' || coalesce(info, '')));

-- 5. Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous users to read ONLY published articles
DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
CREATE POLICY "Public can read published articles" 
ON public.articles 
FOR SELECT 
USING (status = 'published' OR status IS NULL);

-- Allow authenticated users (Admin) full CRUD access to all articles
DROP POLICY IF EXISTS "Authenticated users have full access to articles" ON public.articles;
CREATE POLICY "Authenticated users have full access to articles" 
ON public.articles 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 6. Setup Supabase Storage Bucket for Media
INSERT INTO storage.buckets (id, name, public)
VALUES ('articles-media', 'articles-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies: Public read access
DROP POLICY IF EXISTS "Public can view articles media" ON storage.objects;
CREATE POLICY "Public can view articles media"
ON storage.objects FOR SELECT
USING (bucket_id = 'articles-media');

-- Storage RLS Policies: Authenticated upload access
DROP POLICY IF EXISTS "Authenticated users can upload articles media" ON storage.objects;
CREATE POLICY "Authenticated users can upload articles media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'articles-media');

DROP POLICY IF EXISTS "Authenticated users can update articles media" ON storage.objects;
CREATE POLICY "Authenticated users can update articles media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'articles-media');

DROP POLICY IF EXISTS "Authenticated users can delete articles media" ON storage.objects;
CREATE POLICY "Authenticated users can delete articles media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'articles-media');
