import { notFound } from "next/navigation";
import { ArticleEditor, ArticleFormData } from "@/components/admin/ArticleEditor";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export const metadata = {
  title: "تعديل المقال | لوحة تحرير أثر",
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    notFound();
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/articles?id=eq.${id}&select=*&limit=1`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  if (!data || data.length === 0) {
    notFound();
  }

  const row = data[0];

  const initialData: ArticleFormData = {
    id: row.id,
    title: row.title || "",
    slug: row.slug || "",
    info: row.info || "",
    category: row.category || "ملفات وثائقية",
    sub_category: row.sub_category || "",
    region: row.region || "الشرق الأوسط",
    poster: row.poster || "",
    reading_time: row.reading_time || 8,
    status: row.status === "draft" ? "draft" : "published",
    content: Array.isArray(row.content) && row.content.length > 0
      ? row.content.map((t: any) => ({
          topic: t.topic || "",
          introduction: t.introduction || "",
          text: t.text || "",
          conclusion: t.conclusion || "",
          source: Array.isArray(t.source) ? t.source : [],
          video: Array.isArray(t.video) ? t.video : [],
          image: Array.isArray(t.image) ? t.image : [],
        }))
      : [
          {
            topic: "",
            introduction: "",
            text: "",
            conclusion: "",
            source: [],
            video: [],
            image: [],
          },
        ],
  };

  return (
    <div className="space-y-6">
      <ArticleEditor initialData={initialData} isEditing={true} />
    </div>
  );
}
