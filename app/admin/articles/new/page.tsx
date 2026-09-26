import { ArticleEditor } from "@/components/admin/ArticleEditor";

export const metadata = {
  title: "إنشاء مقال جديد | لوحة تحرير أثر",
};

export default function NewArticlePage() {
  return (
    <div className="space-y-6">
      <ArticleEditor isEditing={false} />
    </div>
  );
}
