export default {
  name: "navigation",
  title: "قوائم التنقل (Navigation)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "اسم القائمة",
      type: "string",
    },
    {
      name: "items",
      title: "عناصر القائمة",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "العنوان بالعربية", type: "string" },
            { name: "href", title: "الرابط", type: "string" },
            { name: "description", title: "وصف توضيحي قصير", type: "string" },
          ],
        },
      ],
    },
  ],
};
