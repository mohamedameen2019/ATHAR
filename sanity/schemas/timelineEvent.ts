export default {
  name: "timelineEvent",
  title: "حدث في الخط الزمني (Timeline Event)",
  type: "object",
  fields: [
    {
      name: "yearOrDate",
      title: "التاريخ أو السنة أو الوقت",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "title",
      title: "عنوان الحدث",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "description",
      title: "وصف الحدث وتداعياته",
      type: "text",
      rows: 3,
    },
    {
      name: "image",
      title: "صورة توثيقية للحدث (اختياري)",
      type: "image",
      options: { hotspot: true },
    },
  ],
};
