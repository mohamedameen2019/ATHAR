export default {
  name: "siteSettings",
  title: "إعدادات المنصة (Site Settings)",
  type: "document",
  fields: [
    {
      name: "siteName",
      title: "اسم المنصة",
      type: "string",
    },
    {
      name: "tagline",
      title: "الشعار اللفظي للمنصة",
      type: "string",
    },
    {
      name: "logo",
      title: "شعار المنصة (Logo)",
      type: "image",
    },
    {
      name: "description",
      title: "الوصف العام التوثيقي",
      type: "text",
      rows: 3,
    },
    {
      name: "contactEmail",
      title: "البريد الإلكتروني للاتصال",
      type: "string",
    },
    {
      name: "socialLinks",
      title: "روابط شبكات التواصل الاجتماعي",
      type: "object",
      fields: [
        { name: "x", title: "X (تويتر)", type: "url" },
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "youtube", title: "YouTube", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "telegram", title: "Telegram", type: "url" },
      ],
    },
    {
      name: "defaultSEO",
      title: "إعدادات SEO الافتراضية",
      type: "object",
      fields: [
        { name: "metaTitle", title: "عنوان Meta الافتراضي", type: "string" },
        { name: "metaDescription", title: "وصف Meta الافتراضي", type: "text" },
      ],
    },
    {
      name: "defaultOGImage",
      title: "صورة المشاركة الافتراضية (OG Image)",
      type: "image",
    },
  ],
};
