import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import { demoAuthors } from "@/lib/data/demoAuthors";
import { Compass, BookOpen, CheckCircle, Shield, Award, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "عن المنصة والميثاق التحريري",
  description: "رسالة منصة أثر الوثائقية، معايير التحقيق التاريخي والتوثيق الأكاديمي، وفريق الباحثين والمحررين.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bronze-500/10 text-bronze-600 dark:text-bronze-400 text-xs font-bold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>المهمة التحريرية</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-charcoal-950 dark:text-ivory-50 tracking-tight mb-4">
          عن منصة {siteConfig.nameArabic}
        </h1>
        <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 leading-relaxed font-editorial">
          منصة وثائقية مستقلة تأسست لتقديم صحافة استقصائية معرفية تعيد الاعتبار للعمق، والتوثيق، وجودة القراءة في العصر الرقمي المتسارع.
        </p>
      </div>

      {/* Editorial Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
        <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-bronze-500/15 text-bronze-600 dark:text-bronze-400 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50 mb-2">
            الأصالة والتوثيق
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
            لا نعتمد على الشائعات أو التلخيصات السطحية؛ كل تحقيق يخضع لمراجعة صارمة تستند إلى الوثائق الأصلية، والدوريات المحكّمة، وأحدث المسوحات الأثرية والعلمية.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-bronze-500/15 text-bronze-600 dark:text-bronze-400 flex items-center justify-center mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50 mb-2">
            الحياد والنزاهة
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
            نعرض وجهات النظر العلمية المتعددة عند تناول الألغاز التاريخية أو النظريات الفلكية الحديثة، مع توضيح الفوارق الدقيقة بين الفرضية والحقيقة المثبتة.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-bronze-500/15 text-bronze-600 dark:text-bronze-400 flex items-center justify-center mb-4">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-charcoal-950 dark:text-ivory-50 mb-2">
            تجربة قراءة سينمائية
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-400 leading-relaxed">
            نؤمن بأن المعرفة الرصينة تستحق إخراجاً بصرياً فخماً، يمزج بين الخطوط العربية الرصينة، والخرائط التفاعلية، والخطوط الزمنية دون أي تشتيت إعلاني مزعج.
          </p>
        </div>
      </div>

      {/* Editorial Standards Detail */}
      <section id="editorial-standards" className="my-16 p-8 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-100/40 dark:bg-charcoal-900/40 scroll-mt-24">
        <h2 className="text-2xl font-bold text-charcoal-950 dark:text-ivory-50 mb-4">
          الميثاق التحريري والتحقق من الحقائق
        </h2>
        <div className="space-y-3 text-sm text-charcoal-700 dark:text-charcoal-300 leading-relaxed">
          <p className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
            <span>
              <strong>إلزامية إسناد المصادر:</strong> يُشترط على كل باحث إدراج قائمة بالمراجع والروابط المباشرة لأي دراسة علمية أو شهادة أثرية مقتبسة.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
            <span>
              <strong>الفصل التام بين الإعلان والتحقيق:</strong> المساحات الإعلانية في المنصة محددة ومفصولة هندسياً بوضوح، ولا تتدخل في توجهات أو صياغة المواد التوثيقية.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-1" />
            <span>
              <strong>تصحيح الأخطاء بشفافية:</strong> في حال ظهور كشف علمي جديد يدحض معلومة منشورة سابقاً، نقوم بتحديث المقال مع إشعار توضيحي بتاريخ ونوع التعديل.
            </span>
          </p>
        </div>
      </section>

      {/* Authors & Editorial Team */}
      <section id="team" className="my-16 scroll-mt-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-bronze-600 dark:text-bronze-400 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4" />
            <span>فريق العمل والباحثون</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-charcoal-950 dark:text-ivory-50">
            هيئة التحرير والاستقصاء
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoAuthors.map((author) => (
            <div
              key={author.slug}
              className="p-6 rounded-2xl border border-ivory-200 dark:border-charcoal-800 bg-ivory-50 dark:bg-charcoal-900 text-center flex flex-col items-center justify-between"
            >
              <div>
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-bronze-500/40 mb-4 shadow-sm">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="font-bold text-lg text-charcoal-950 dark:text-ivory-50">
                  {author.name}
                </h3>
                <p className="text-xs font-semibold text-bronze-600 dark:text-bronze-400 mt-0.5">
                  {author.role}
                </p>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-2 line-clamp-3">
                  {author.bio}
                </p>
              </div>

              <Link
                href={`/author/${author.slug}`}
                className="mt-5 text-xs font-bold text-charcoal-900 dark:text-ivory-50 hover:text-bronze-500 transition-colors"
              >
                عرض الملف الشخصي والتحقيقات ←
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
