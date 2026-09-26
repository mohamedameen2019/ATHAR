# 🏛️ أثر | ATHAR — المنصة الوثائقية والتحريرية العالمية

> **منصة مجلة وثائقية استقصائية عالمية ذات جودة إنتاجية فائقة (Production-Ready Editorial Magazine)، مصممة لتقديم تجربة قراءة سينمائية راقية تجمع بين التحقيقات المعمقة، والخطوط الزمنية التفاعلية، والخرائط، والمصادر الموثقة، مع دعم أصيل للغة العربية (RTL First).**

---

## 🌟 نظرة عامة على المنصة (Overview)

تم بناء منصة **"أثر" (ATHAR)** لتكون منصة إعلامية وثائقية تنافس كبرى المجلات التحريرية الرقمية في العالم (مثل *National Geographic* و *The Atlantic* و *Le Monde Diplomatique*). تتميز المنصة بهوية بصرية مستقلة تعتمد درجات الفحم الداكن (Charcoal) مع لمسات البرونز والذهب الهادئ (Warm Gold/Bronze)، ونسب قراءة طباعية مدروسة بدقة (680–760px) لتوفير أقصى درجات الراحة البصرية للقارئ.

---

## ⚡ التقنيات المستخدمة (Tech Stack)

- **واجهة المستخدم والأداء (Frontend):** [Next.js 15 (App Router)](https://nextjs.org) مع [React 19](https://react.dev) و [TypeScript](https://www.typescriptlang.org/) بالنمط الصارم (Strict Mode).
- **التصميم ونظام الألوان (Styling):** [Tailwind CSS](https://tailwindcss.com) مع Design System تحريري متكامل.
- **قاعدة البيانات وإدارة المحتوى (Backend & Database):** [Supabase PostgreSQL](https://supabase.com) مع جدول `articles`، ونظام أمان متقدم (Row Level Security)، وتخزين سحابي للوسائط (Supabase Storage)، ونظام مصادقة للتحرير (Supabase Auth).
- **لوحة تحكم إدارية ومحرر محتوى مخصص:** لوحة تحرير داخلية فاخرة في مسار `/admin` تتيح إدارة كاملة للمقالات، والأقسام، والكتاب، ومكتبة الوسائط، وإعدادات المنصة دون الحاجة لأي خدمات وسيطة خارجية.
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
├── supabase/                           # ملفات الترقية وسياسات الأمان
│   └── migrations/                     # ترقيات SQL وفهارس البحث وسياسات RLS
│
├── app/                                # مسارات Next.js App Router
│   ├── layout.tsx                      # الهيكل الجذري (RTL, الخطوط، ThemeProvider, Header, Footer)
│   ├── page.tsx                        # الصفحة الرئيسية التحريرية الشاملة
│   ├── articles/[slug]/page.tsx        # صفحة المقال الفاخرة (TOC, Progress, Timeline, Sources, Facts)
│   ├── category/[slug]/page.tsx        # صفحة التصنيف مع الفلاتر
│   ├── author/[slug]/page.tsx          # صفحة الكاتب/المؤلف وسيرته وأبحاثه
│   ├── search/page.tsx                 # صفحة البحث المباشر والفلاتر الحية عبر PostgreSQL
│   ├── bookmarks/page.tsx              # صفحة المقالات المحفوظة للقراءة لاحقاً
│   ├── about/page.tsx                  # عن المنصة والميثاق التحريري وفريق العمل
│   ├── contact/page.tsx                # صفحة التواصل مع نموذج تفاعلي
│   ├── privacy-policy/page.tsx         # سياسة الخصوصية
│   ├── terms-of-use/page.tsx           # شروط الاستخدام وحقوق النشر
│   ├── cookie-policy/page.tsx          # سياسة ملفات تعريف الارتباط
│   ├── disclaimer/page.tsx             # إخلاء المسؤولية التوثيقية والبحثية
│   ├── sitemap.ts                      # مولد خريطة الموقع XML الديناميكي
│   ├── robots.ts                       # ملف Robots.txt المحسّن
│   ├── feed.xml/route.ts               # مولد خلاصة RSS 2.0 Feed
│   │
│   ├── admin/                          # لوحة التحكم التحريرية الشاملة
│   │   ├── layout.tsx                  # القالب الإداري والشريط الجانبي
│   │   ├── page.tsx                    # نظرة عامة وإحصائيات المقالات والقراءات
│   │   ├── login/page.tsx              # بوابة تسجيل الدخول (Supabase Auth)
│   │   ├── articles/page.tsx           # جدول المقالات الكامل مع الفلاتر والبحث والحذف
│   │   ├── articles/new/page.tsx       # إنشاء مقال وثائقي جديد
│   │   ├── articles/[id]/edit/page.tsx # تعديل المقال والمحاور
│   │   ├── media/page.tsx              # مكتبة الوسائط ورفع الصور لـ Supabase Storage
│   │   ├── categories/page.tsx         # إدارة واستعراض الأقسام
│   │   ├── authors/page.tsx            # إدارة واستعراض الكتاب والباحثين
│   │   └── settings/page.tsx           # حالة البنية التحتية والاتصال
│   │
│   └── api/admin/                      # واجهات API الآمنة للوحة التحكم
│       ├── articles/route.ts           # جلب وإضافة المقالات
│       ├── articles/[id]/route.ts      # تفاصيل وتعديل وحذف مقال
│       └── media/route.ts              # رفع الوسائط إلى Supabase Storage
│
├── components/                         # المكونات التفاعلية والتحريرية
│   ├── layout/                         # الهيدر الذكي، الفوتر، القائمة الجانبية، محول الثيم
│   ├── home/                           # مكونات الصفحة الرئيسية (Hero, Editor's Picks, Longform, etc.)
│   ├── article/                        # مكونات المقال (Progress, TOC, Share, QuickFacts, Timeline, Sources)
│   ├── admin/                          # مكونات لوحة التحكم ومحرر المحتوى الغني (ArticleEditor)
│   └── ads/                            # مكونات AdSense الذكية (AdBanner, InArticleAd, SidebarAd)
│
├── lib/
│   ├── supabase/                       # عملاء Supabase (Browser, Server, Admin) والـ Mapper
│   │   ├── client.ts                   # العميل الآمن للمتصفح
│   │   ├── server.ts                   # عميل خادم Next.js 15 مع الكوكيز
│   │   ├── admin.ts                    # عميل العمليات الإدارية
│   │   ├── types.ts                    # تعريفات TypeScript لجدول articles
│   │   └── mapper.ts                   # محول بيانات جدول articles إلى نموذج المقال
│   ├── data/                           # طبقة جلب واسترجاع البيانات الموثقة
│   │   ├── articles.ts                 # استعلامات Supabase المحسنة مع كاش ISR
│   │   ├── categories.ts               # بيانات الأقسام والتصنيفات
│   │   ├── authors.ts                  # بيانات الباحثين والكتاب
│   │   ├── tags.ts                     # استخراج الوسوم
│   │   └── demoArticles.ts             # أرشيف الطوارئ التوثيقي الاحتياطي
│   ├── newsletter.ts                   # تجريد النشرة البريدية
│   ├── seo.ts                          # مولدات JSON-LD المنظمة
│   └── utils.ts                        # مساعدات التنسيق، التواريخ الهجرية والميلادية
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
انسخ ملف `.env.example` إلى `.env.local` وأضف مفاتيح Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://gyqcdkilwzyctkdyfdfl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

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

## 🔐 لوحة التحكم الإدارية (`/admin`)

- مسار الدخول الإداري: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- تتم المصادقة عبر **Supabase Auth**.
- بعد تسجيل الدخول يمكنك:
  - إنشاء وتعديل وحذف المقالات الوثائقية.
  - إضافة المحاور والفقرات والمصادر وروابط الفيديو.
  - رفع الصور مباشرة إلى Supabase Storage.
  - التحكم في حالة النشر (منشور للجمهور / مسودة داخلية).

---

## 🚢 النشر على Vercel (Deployment)

1. ارفع المشروع إلى مستودع **GitHub**.
2. سجل الدخول إلى [Vercel](https://vercel.com) وانقر على **"Add New Project"**.
3. أضف متغيرات البيئة: `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. انقر **"Deploy"**.

---

## 📜 الترخيص والملكية الفكرية
جميع الحقوق التحريرية والتصميمية محفوظة لمنصة أثر الوثائقية © 2026.
