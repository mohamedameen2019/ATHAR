export default {
  name: "category",
  title: "التصنيف (Category)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "اسم التصنيف بالعربية",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "titleEn",
      title: "اسم التصنيف بالإنجليزية",
      type: "string",
    },
    {
      name: "slug",
      title: "الاسم اللطيف (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "الوصف التحريري للتصنيف",
      type: "text",
      rows: 3,
    },
    {
      name: "coverImage",
      title: "صورة الغلاف للتصنيف",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "color",
      title: "لون التمييز (Accent Color)",
      type: "string",
    },
  ],
};
