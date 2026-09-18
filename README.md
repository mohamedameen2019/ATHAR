# 🏛️ أثر | ATHAR — المنصة الوثائقية والتحريرية العالمية

> **منصة مجلة وثائقية استقصائية عالمية ذات جودة إنتاجية فائقة (Production-Ready Editorial Magazine)، مصممة لتقديم تجربة قراءة سينمائية راقية تجمع بين التحقيقات المعمقة، والخطوط الزمنية التفاعلية، والخرائط، والمصادر الموثقة، مع دعم أصيل للغة العربية (RTL First).**

---

## 🌟 نظرة عامة على المنصة (Overview)

تم بناء منصة **"أثر" (ATHAR)** لتكون منصة إعلامية وثائقية تنافس كبرى المجلات التحريرية الرقمية في العالم (مثل *National Geographic* و *The Atlantic* و *Le Monde Diplomatique*). تتميز المنصة بهوية بصرية مستقلة تعتمد درجات الفحم الداكن (Charcoal) مع لمسات البرونز والذهب الهادئ (Warm Gold/Bronze)، ونسب قراءة طباعية مدروسة بدقة (680–760px) لتوفير أقصى درجات الراحة البصرية للقارئ.

---

## ⚡ التقنيات المستخدمة (Tech Stack)

- **واجهة المستخدم والأداء (Frontend):** [Next.js 15 (App Router)](https://nextjs.org) مع [React 19](https://react.dev) و [TypeScript](https://www.typescriptlang.org/) بالنمط الصارم (Strict Mode).
- **التصميم ونظام الألوان (Styling):** [Tailwind CSS](https://tailwindcss.com) مع Design System تحريري متكامل.
- **إدارة المحتوى (CMS):** [Sanity CMS](https://sanity.io) مع مخططات Schemas رسمية للمقالات، والمؤلفين، والتصنيفات، والخطوط الزمنية، والمصادر، مع طبقة بيانات تجريدية (Data Abstraction Layer) تضمن عمل المنصة فورياً بأرشيف واقعي حتى قبل ربط مفاتيح API.
- **الوضع الليلي والنهاري (Theming):** `next-themes` مع دعم الوضع الداكن والفاتح ووضع النظام التلقائي وحفظ التفضيل في المتصفح.
- **الخطوط العربية (Typography):** `IBM Plex Sans Arabic` للعناوين والنصوص، مع `Amiri` للاقتباسات التحريرية عبر `next/font/google`.
- **الأيقونات (Icons):** `lucide-react`.
- **محركات البحث والأرشفة (SEO & Metadata):** دعم كامل لـ JSON-LD (NewsArticle, BreadcrumbList, Organization, Person) وخريطة موقع XML ديناميكية وخلاصة RSS 2.0.
- **الاستضافة والنشر (Hosting):** مُهيأة للنشر المباشر بنقرة واحدة على [Vercel](https://vercel.com).
- **جاهزية الإعلانات (Monetization):** مجهزة معمارياً لـ **Google AdSense** مع مكونات إعلانية ذكية تمنع حدوث Layout Shift (Zero CLS).

---

## 📁 هيكلية المجلدات (Project Architecture)

```
ATHAR/
├── site.config.ts                      # ملف الإعدادات المركزي الشامل (اسم المنصة، الروابط، الإعلانات، التحليلات)
├── tailwind.config.ts                  # Design System وألوان الفحم والبرونز والخطوط العربية
├── next.config.mjs                     # تحسين الصور، Security Headers، وتجاوب الوسائط
├── tsconfig.json                       # إعدادات TypeScript الصارمة ومسارات @/*
├── .env.example                        # دليل المتغيرات البيئية
│
├── sanity/                             # تكامل Sanity CMS الرسمي
│   ├── schemas/                        # مخططات الوثائق (article, author, category, timeline, etc.)
│   └── lib/                            # عميل Sanity واستعلامات GROQ الرسمية
│
├── app/                                # مسارات Next.js App Router (14+ صفحة)
│   ├── layout.tsx                      # الهيكل الجذري (RTL, الخطوط، ThemeProvider, Header, Footer)
│   ├── page.tsx                        # الصفحة الرئيسية التحريرية الشاملة
│   ├── articles/[slug]/page.tsx        # صفحة المقال الفاخرة (TOC, Progress, Timeline, Sources, Facts)
│   ├── category/[slug]/page.tsx        # صفحة التصنيف مع الفلاتر
│   ├── author/[slug]/page.tsx          # صفحة الكاتب/المؤلف وسيرته وأبحاثه
│   ├── search/page.tsx                 # صفحة البحث المباشر والفلاتر الحية
│   ├── bookmarks/page.tsx              # صفحة المقالات المحفوظة للقراءة لاحقاً
│   ├── about/page.tsx                  # عن المنصة والميثاق التحريري وفريق العمل
│   ├── contact/page.tsx                # صفحة التواصل مع نموذج تفاعلي
│   ├── privacy-policy/page.tsx         # سياسة الخصوصية
│   ├── terms-of-use/page.tsx           # شروط الاستخدام وحقوق النشر
│   ├── cookie-policy/page.tsx          # سياسة ملفات تعريف الارتباط
│   ├── disclaimer/page.tsx             # إخلاء المسؤولية التوثيقية والبحثية
│   ├── studio/page.tsx                 # مركز إدارة Sanity CMS
│   ├── sitemap.ts                      # مولد خريطة الموقع XML الديناميكي
│   ├── robots.ts                       # ملف Robots.txt المحسّن
│   ├── feed.xml/route.ts               # مولد خلاصة RSS 2.0 Feed
│   ├── not-found.tsx                   # صفحة 404 السينمائية
│   ├── error.tsx                       # معالج الأخطاء الراقي
│   └── loading.tsx                     # مؤشر التحميل الهيكلي (Skeleton)
│
├── components/                         # المكونات التفاعلية والتحريرية
│   ├── layout/                         # الهيدر الذكي، الفوتر، القائمة الجانبية، محول الثيم
│   ├── home/                           # مكونات الصفحة الرئيسية (Hero, Editor's Picks, Longform, etc.)
│   ├── article/                        # مكونات المقال (Progress, TOC, Share, QuickFacts, Timeline, Sources)
│   └── ads/                            # مكونات AdSense الذكية (AdBanner, InArticleAd, SidebarAd)
│
├── lib/
│   ├── data/                           # بيانات الأرشيف الوثائقي (10 مقالات موسعة وموثقة، 5 تصنيفات، 3 كتاب)
│   ├── articles.ts                     # طبقة جلب واسترجاع البيانات المزدوجة (Sanity + Fallback)
│   ├── newsletter.ts                   # تجريد النشرة البريدية (جاهز للربط مع Resend أو Mailchimp)
│   ├── seo.ts                          # مولدات JSON-LD المنظمة
│   └── utils.ts                        # مساعدات التنسيق، التواريخ الهجرية والميلادية، روابط المشاركة
└── types/                              # تعريفات TypeScript الصارمة لجميع الكائنات
```

---

## 🚀 التثبيت والتشغيل المحلي (Getting Started)

### 1. المتطلبات المسبقة
- **Node.js** إصدار 18.18 أو أحدث (يُوصى بـ Node 20+).
- مدير الحزم `npm` أو `pnpm` أو `yarn`.

### 2. تثبيت الاعتمادات
```bash
npm install
```

### 3. إعداد المتغيرات البيئية
انسخ ملف `.env.example` إلى `.env.local`:
```bash
cp .env.example .env.local
```
*(ملاحظة: المنصة تعمل مباشرة بكامل مزاياها حتى دون تعبئة مفاتيح خارجية بفضل نظام الـ Fallback الذكي).*

### 4. تشغيل خادم التطوير
```bash
npm run dev
```
افتح المتصفح على: [http://localhost:3000](http://localhost:3000)

### 5. فحص وبناء الإنتاج
```bash
npm run build
npm run start
```

---

## ⚙️ التخصيص المركزي (`site.config.ts`)

لتغيير اسم المنصة، أو الشعار، أو البريد التحريري، أو روابط شبكات التواصل الاجتماعي، أو تفعيل الإعلانات، أو إضافة معرف Google Analytics، يكفي تعديل ملف واحد مركزي:

```typescript
// site.config.ts
export const siteConfig = {
  name: "ATHAR",
  nameArabic: "أثر",
  tagline: "المنصة الوثائقية والتحريرية العالمية",
  url: "https://your-domain.com",
  contact: {
    editorialEmail: "editorial@your-domain.com",
    // ...
  },
  ads: {
    enabled: false, // تحويلها إلى true لتفعيل مساحات AdSense
    client: "ca-pub-XXXXXXXXXXXXXXXX",
    // ...
  },
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX",
  }
};
```

---

## 📡 ربط Sanity CMS السحابي

المشروع يتضمن مجلداً كاملاً لـ Sanity Schemas في `sanity/schemas/`. لربط استديو Sanity الخاص بك:

1. أنشئ حساباً مجانياً في [Sanity.io](https://sanity.io).
2. أنشئ مشروعاً جديداً واحصل على معرف المشروع (`Project ID`).
3. أضف المعرف في `.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
4. المنصة ستبدأ تلقائياً في استيراد المقالات من Sanity عبر استعلامات GROQ المكتوبة في `sanity/lib/queries.ts`.

---

## 🚢 النشر على Vercel (Deployment)

1. ارفع المشروع إلى مستودع **GitHub**.
2. سجل الدخول إلى [Vercel](https://vercel.com) وانقر على **"Add New Project"**.
3. اختر مستودع المشروع، وأضف أي متغيرات بيئية من `.env.example`.
4. انقر **"Deploy"**. سيكتشف Vercel إعدادات Next.js 15 تلقائياً ويقوم بعمل Build كامل خلال ثوانٍ.

---

## 📜 الترخيص والملكية الفكرية
جميع الحقوق التحريرية والتصميمية محفوظة لمنصة أثر الوثائقية © 2026.
