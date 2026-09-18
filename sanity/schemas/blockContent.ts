export default {
  title: "المحتوى التحريري (Block Content)",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "فقرة نصية",
      type: "block",
      styles: [
        { title: "عادي", value: "normal" },
        { title: "عنوان رئيسي (H2)", value: "h2" },
        { title: "عنوان فرعي (H3)", value: "h3" },
        { title: "اقتباس مميز", value: "blockquote" },
      ],
      lists: [
        { title: "نقطي", value: "bullet" },
        { title: "رقمي", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "عريض", value: "strong" },
          { title: "مائل", value: "em" },
          { title: "كود", value: "code" },
        ],
        annotations: [
          {
            title: "رابط خارجي أو داخلي",
            name: "link",
            type: "object",
            fields: [
              {
                title: "الرابط (URL)",
                name: "href",
                type: "url",
              },
            ],
          },
        ],
      },
    },
    {
      title: "صورة توثيقية مع تعليق",
      name: "articleImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "caption",
          type: "string",
          title: "التعليق التوثيقي على الصورة",
        },
        {
          name: "alt",
          type: "string",
          title: "النص البديل (Alt Text)",
        },
        {
          name: "credit",
          type: "string",
          title: "المصدر أو حقوق التصوير",
        },
      ],
    },
    {
      title: "مربع معلومات مميز (Callout / Info Box)",
      name: "callout",
      type: "object",
      fields: [
        {
          name: "tone",
          title: "نوع المربع",
          type: "string",
          options: {
            list: [
              { title: "معلومة توثيقية هامة", value: "info" },
              { title: "تحذير / تنبيه تاريخي", value: "warning" },
              { title: "اكتشاف حديث", value: "discovery" },
            ],
          },
        },
        {
          name: "text",
          title: "نص المعلومة",
          type: "text",
        },
      ],
    },
    {
      title: "خط زمني مضمن (Embedded Timeline)",
      name: "embeddedTimeline",
      type: "object",
      fields: [
        {
          name: "title",
          title: "عنوان الخط الزمني",
          type: "string",
        },
        {
          name: "events",
          title: "أحداث الخط الزمني",
          type: "array",
          of: [{ type: "timelineEvent" }],
        },
      ],
    },
    {
      title: "جدول بيانات توثيقية (Table)",
      name: "articleTable",
      type: "object",
      fields: [
        {
          name: "caption",
          title: "عنوان الجدول",
          type: "string",
        },
        {
          name: "headers",
          title: "عناوين الأعمدة",
          type: "array",
          of: [{ type: "string" }],
        },
        {
          name: "rows",
          title: "الصفوف",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "cells",
                  type: "array",
                  of: [{ type: "string" }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "فيديو وثائقي مضمن (Video Embed)",
      name: "videoEmbed",
      type: "object",
      fields: [
        {
          name: "url",
          title: "رابط الفيديو (YouTube / Vimeo / Cloudflare)",
          type: "url",
        },
        {
          name: "caption",
          title: "تعليق على المقطع",
          type: "string",
        },
      ],
    },
  ],
};
