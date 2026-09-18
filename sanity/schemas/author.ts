export default {
  name: "author",
  title: "المؤلف والباحث (Author)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "الاسم الكامل",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "الاسم اللطيف (Slug)",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "role",
      title: "الصفة التحريرية",
      type: "string",
    },
    {
      name: "title",
      title: "المسمى الأكاديمي أو التخصصي",
      type: "string",
    },
    {
      name: "avatar",
      title: "الصورة الشخصية",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "السيرة الذاتية والأكاديمية",
      type: "text",
      rows: 4,
    },
    {
      name: "credentials",
      title: "الدرجات والاعتمادات التوثيقية",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "socialLinks",
      title: "روابط التواصل والملفات العلمية",
      type: "object",
      fields: [
        { name: "x", title: "حساب X (تويتر سابقاً)", type: "url" },
        { name: "linkedin", title: "حساب LinkedIn", type: "url" },
        { name: "website", title: "الموقع الشخصي أو الأكاديمي", type: "url" },
      ],
    },
  ],
};
