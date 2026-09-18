export default {
  name: "article",
  title: "المقال الوثائقي (Article)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "عنوان المقال الرئيسي",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "العنوان الفرعي التوضيحي",
      type: "string",
    },
    {
      name: "slug",
      title: "الاسم اللطيف في الرابط (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "الموجز التحريري (Excerpt)",
      type: "text",
      rows: 3,
      validation: (Rule: any) => Rule.required().max(350),
    },
    {
      name: "featuredImage",
      title: "الصورة الرئيسية للمقال (Hero Image)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
      fields: [
        {
          name: "caption",
          type: "string",
          title: "التعليق التوثيقي",
        },
        {
          name: "alt",
          type: "string",
          title: "النص البديل (Alt)",
        },
      ],
    },
    {
      name: "category",
      title: "التصنيف الرئيسي",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "author",
      title: "المؤلف / الباحث",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "تاريخ النشر",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "updatedAt",
      title: "تاريخ آخر مراجعة أو تحديث",
      type: "datetime",
    },
    {
      name: "readingTime",
      title: "وقت القراءة التقديري (بالدقائق)",
      type: "number",
    },
    {
      name: "featured",
      title: "مقال مميز رئيسي (Hero Featured)",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "editorPick",
      title: "من اختيارات المحررين (Editor's Pick)",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isLongform",
      title: "وثائقي طويل معمق (Longform)",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "tags",
      title: "الوسوم",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
    {
      name: "quickFacts",
      title: "بطاقة الحقائق السريعة (Quick Facts)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "البند", type: "string" },
            { name: "value", title: "القيمة أو المعلومة", type: "string" },
          ],
        },
      ],
    },
    {
      name: "timeline",
      title: "الخط الزمني الملحق بالمقال",
      type: "array",
      of: [{ type: "timelineEvent" }],
    },
    {
      name: "content",
      title: "المحتوى التحريري الكامل",
      type: "blockContent",
    },
    {
      name: "sources",
      title: "المصادر والمراجع التوثيقية",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "عنوان المرجع أو البحث", type: "string" },
            { name: "publisher", title: "الجهة الناشرة أو الدورية", type: "string" },
            { name: "url", title: "رابط المرجع (إن وجد)", type: "url" },
            { name: "yearOrDate", title: "سنة أو تاريخ النشر", type: "string" },
          ],
        },
      ],
    },
    {
      name: "seoTitle",
      title: "عنوان مخصص لـ SEO",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "وصف مخصص لـ SEO",
      type: "text",
      rows: 2,
    },
    {
      name: "ogImage",
      title: "صورة مخصصة للمشاركة عبر المنصات",
      type: "image",
    },
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "featuredImage",
    },
    prepare(selection: any) {
      const { author } = selection;
      return {
        ...selection,
        subtitle: author && `بقلم: ${author}`,
      };
    },
  },
};
