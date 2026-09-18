import { Author } from "@/types";

export const demoAuthors: Author[] = [
  {
    id: "author-tariq-mansour",
    slug: "tariq-mansour",
    name: "د. طارق المنصور",
    role: "رئيس التحرير الاستقصائي وباحث تاريخي",
    title: "أستاذ التاريخ القديم والآثار المقارنة",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "باحث وكاتب وثائقي، تخرج من جامعة السوربون وحصل على الدكتوراه في الآثار القديمة للمشرق. قاد بعثات مسح أثري في بلاد الرافدين ووادي النيل، ونشر أبحاثاً موسعة حول أنظمة الري واللغات المندثرة.",
    credentials: [
      "دكتوراه في الآثار المقارنة - جامعة السوربون (باريس)",
      "عضو الجمعية الدولية للآثار المشرقية",
      "مؤلف كتاب 'أطلس المدن المفقودة'",
    ],
    socialLinks: {
      x: "https://x.com/tariq_mansour",
      linkedin: "https://linkedin.com/in/tariq-mansour",
    },
  },
  {
    id: "author-layla-al-hashimi",
    slug: "layla-al-hashimi",
    name: "ليلى الهاشمي",
    role: "محررة الشؤون العلمية والفيزياء الفلكية",
    title: "كاتبة وباحثة في علوم الفضاء والتكنولوجيا الحيوية",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "صحفية علمية وكاتبة مقالات استقصائية، حاصلة على ماجستير في الفيزياء الفلكية. غطت كبرى إطلاقات وكالات الفضاء الدولية، وتركز في كتاباتها على أسرار المادة المظلمة ومساعي فهم بدايات الكون.",
    credentials: [
      "ماجستير في الفيزياء الفلكية - معهد ماساتشوستس للتكنولوجيا",
      "جائزة الصحافة العلمية التقديرية 2024",
    ],
    socialLinks: {
      x: "https://x.com/layla_hashimi",
    },
  },
  {
    id: "author-khalid-al-omari",
    slug: "khalid-al-omari",
    name: "خالد العمري",
    role: "مستشار التوثيق الجغرافي والبيئي",
    title: "مستكشف ومصور وثائقي",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "مستكشف جغرافي وموثق ميداني. شارك في بعثات علمية في صحراء الربع الخالي، وغابات الأمازون، وأعماق البحر الأحمر. يكرس قلمه لتوثيق التحولات البيئية العميقة والآثار الجيولوجية النادرة.",
    credentials: [
      "زميل الجمعية الجغرافية العالمية",
      "مخرج فيلم وثائقي حائز على جوائز 'أعماق بلا ضوء'",
    ],
    socialLinks: {
      x: "https://x.com/khalid_omari",
    },
  },
];
