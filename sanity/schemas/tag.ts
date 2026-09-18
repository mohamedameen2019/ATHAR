export default {
  name: "tag",
  title: "الوسم (Tag)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "اسم الوسم",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "الاسم اللطيف (Slug)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
  ],
};
