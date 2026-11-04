import React from 'react';
import { Shield, FileText, CheckCircle2, Building, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, CompanySettings } from '../../types';
import { IMAGES } from '../../data/companyData';

interface AboutViewProps {
  lang: Language;
  onNavigate: (view: string) => void;
  settings: CompanySettings;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang, onNavigate, settings }) => {
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="py-16 bg-[#F4F7FA]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E1E9F0] text-[#0876C9] text-xs font-bold shadow-2xs">
            <Building className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'نبذة عن سما كابيتال' : 'About Sama Capital'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B3158] tracking-tight">
            {lang === 'ar' ? 'شريكك الموثوق للاستيراد والشحن والتخليص الجمركي' : 'Your Trusted Partner for Freight, Import & Customs Brokerage'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {lang === 'ar'
              ? 'تأسست شركة سما كابيتال (SAMA CAPITAL) لتقديم نموذج لوجستي متطور يربط قطاع التجارة والأعمال في اليمن بالمصانع والأسواق العالمية في الصين، مع التركيز التام على موثوقية الإجراءات، وسلامة البضائع، والشفافية في الأسعار والمواعيد.'
              : 'Sama Capital was established to build an advanced logistics link connecting businesses in Yemen to global manufacturing hubs in China, prioritizing operational reliability, cargo integrity, and total transparency.'}
          </p>
        </div>

        {/* Visual Showcase */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E1E9F0] h-64 sm:h-80">
          <img
            src={IMAGES.hero}
            alt="Sama Capital Operations"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B33] via-[#071B33]/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="text-white">
              <span className="text-xs font-bold text-[#F39A16] uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'حضور ميداني في اليمن والصين' : 'Active Operational Presence in Yemen & China'}
              </span>
              <p className="text-sm sm:text-base font-semibold max-w-xl">
                {lang === 'ar' 
                  ? 'مكتب إدارة رئيسي في صنعاء (دار سلم) ومكتب تنسيق واستلام في الصين لخدمة كافة المحافظات اليمنية.' 
                  : 'Sana\'a headquarters (Dar Salm) and dedicated China desk servicing all Yemeni governorates.'}
              </p>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-7 rounded-3xl bg-white border border-[#E1E9F0] shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-base font-bold text-[#0B3158] mb-2.5">
              {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'أن نكون الخيار الأول للتجار والمستوردين في اليمن، من خلال تيسير حركة الاستيراد وتقديم حلول شحن بحري وجوي آمنة وفعالة بأعلى معايير الانضباط.'
                : 'To be the premier choice for merchants and importers in Yemen by streamlining imports and providing secure, predictable maritime and air cargo solutions.'}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#E1E9F0] shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-base font-bold text-[#0B3158] mb-2.5">
              {lang === 'ar' ? 'رسالتنا' : 'Our Mission'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'تمكين أصحاب الأعمال من تنمية مشروعاتهم وتأمين سلاسل إمدادهم بكل سلاسة، مع ضمان إنجاز إجراءات التخليص الجمركي والتسليم المباشر دون تعقيد.'
                : 'Empowering enterprises to grow their trade seamlessly, assuring verified customs clearance and direct inland delivery with zero friction.'}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#E1E9F0] shadow-sm hover:shadow-lg transition-all">
            <h3 className="text-base font-bold text-[#0B3158] mb-2.5">
              {lang === 'ar' ? 'قيم العمل' : 'Core Values'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lang === 'ar'
                ? 'الصدق والوضوح التام مع العميل، سلامة الشحنات وأمانتها، تدقيق الوثائق الجمركية، والالتزام بمسؤولياتنا تجاه كل شحنة نستلمها.'
                : 'Absolute operational honesty, consignment integrity, meticulous customs document audit, and full accountability for every consignment entrusted to us.'}
            </p>
          </div>
        </div>

        {/* Conversion Banner */}
        <div className="text-center bg-gradient-to-r from-[#071B33] via-[#0B3158] to-[#0876C9] text-white p-8 sm:p-10 rounded-3xl shadow-xl border border-sky-900/40">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">
            {lang === 'ar' ? 'هل تود مناقشة خطة استيراد أو شحنة جديدة؟' : 'Ready to Plan Your Next Shipment or Import Order?'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto mb-6 leading-relaxed">
            {lang === 'ar' 
              ? 'تواصل مباشرة مع فريق العمليات في صنعاء أو اطلب عرض سعر تفصيلي.' 
              : 'Contact our Sana\'a operations desk or request an itemized rate card.'}
          </p>
          <button
            onClick={() => onNavigate('quote')}
            className="px-6 py-3.5 bg-gradient-to-r from-[#F39A16] to-amber-600 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
          >
            {lang === 'ar' ? 'اطلب عرض سعر الآن' : 'Request a Quote Now'}
          </button>
        </div>

      </div>
    </div>
  );
};

export const PrivacyPolicyView: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-3xl border border-[#E1E9F0] p-8 sm:p-12 shadow-sm space-y-8">
      <div className="border-b border-[#E1E9F0] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158]">
          {lang === 'ar' ? 'سياسة الخصوصية — شركة سما كابيتال' : 'Privacy Policy — SAMA CAPITAL'}
        </h1>
        <span className="text-xs text-slate-500 mt-1 block">
          {lang === 'ar' ? 'آخر تحديث: نوفمبر 2026' : 'Last updated: November 2026'}
        </span>
      </div>

      <div className="prose text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '1. التزامنا بحماية بيانات عملائنا' : '1. Our Commitment to Data Privacy'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'تلتزم شركة سما كابيتال (SAMA CAPITAL) بحماية خصوصية وأمان المعلومات والبيانات التجارية والشخصية التي يقدمها عملاؤنا وزوار موقعنا الإلكتروني. نحن نجمع فقط البيانات الضرورية لتقديم عروض الأسعار، وتنفيذ ومتابعة الشحنات، والتخليص الجمركي، والتواصل المباشر مع العميل.'
              : 'Sama Capital is committed to safeguarding the privacy and integrity of all commercial and personal data submitted by our clients and web visitors. We only collect data necessary to prepare quotations, execute customs clearance, and communicate regarding shipments.'}
          </p>
        </section>

        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '2. البيانات التي نقوم بجمعها' : '2. Data We Collect'}
          </h2>
          <ul className="list-disc ps-5 space-y-1.5 text-slate-700">
            <li>{lang === 'ar' ? 'الاسم، اسم المؤسسة أو المتجر، ورقم الهاتف، والبريد الإلكتروني.' : 'Full name, company/store name, contact phone number, and email address.'}</li>
            <li>{lang === 'ar' ? 'بيانات الشحنة: نوع البضاعة، الأوزان، الأحجام التقريبية، وموانئ الإرسال والاستلام.' : 'Consignment data: nature of goods, approximate weight and volume, origin and destination ports.'}</li>
            <li>{lang === 'ar' ? 'الوثائق المرفقة (فواتير، قوائم تعبئة) الخاصة بالتخليص والشحن.' : 'Uploaded documents (invoices, packing lists) strictly utilized for customs and transit compliance.'}</li>
          </ul>
        </section>

        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '3. عدم مشاركة البيانات مع أطراف ثالثة' : '3. Non-Disclosure to Third Parties'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'لا نقوم ببيع أو تأجير أو مشاركة أي بيانات شخصية أو تجارية مع أي جهات تسويقية خارجية. تقتصر مشاركة البيانات التشغيلية فقط على الجهات الملاحية الرسمية والسلطات الجمركية التي تتطلبها القوانين المنظمة للاستيراد والشحن في اليمن والصين.'
              : 'We do not sell, rent, or share personal or commercial data with external marketers. Operational data is disclosed strictly to authorized shipping lines and official customs authorities as required by maritime and import regulations.'}
          </p>
        </section>

        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '4. التواصل والاستفسار' : '4. Inquiries & Contact'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'إذا كان لديك أي سؤال حول سياسة الخصوصية، يمكنك التواصل مباشرة عبر هاتف اليمن: +967783339992 أو زيارة مكتبنا في صنعاء، دار سلم.'
              : 'For questions regarding this policy, contact us on +967783339992 or visit our Sana\'a office at Dar Salm.'}
          </p>
        </section>
      </div>
    </div>
  </div>
);

export const TermsOfServiceView: React.FC<{ lang: Language }> = ({ lang }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="bg-white rounded-3xl border border-[#E1E9F0] p-8 sm:p-12 shadow-sm space-y-8">
      <div className="border-b border-[#E1E9F0] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158]">
          {lang === 'ar' ? 'الشروط والأحكام — شركة سما كابيتال' : 'Terms & Conditions — SAMA CAPITAL'}
        </h1>
        <span className="text-xs text-slate-500 mt-1 block">
          {lang === 'ar' ? 'آخر تحديث: نوفمبر 2026' : 'Last updated: November 2026'}
        </span>
      </div>

      <div className="prose text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed">
        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '1. شروط تقديم طلبات عروض الأسعار' : '1. Quotation Submission Terms'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'إن إرسال طلب عرض السعر عبر هذا الموقع الإلكتروني يعد طلباً للاستعلام وتقدير التكلفة، ولا يعتبر في حد ذاته عقداً ملزماً للشحن أو تثبيتاً نهائياً للأسعار حتى يتم الاتفاق الكتابي ومراجعة وثائق البضاعة وتأكيد الحجز من قبل إدارة الشركة.'
              : 'Submitting a quotation request through this portal constitutes an operational inquiry and does not represent a legally binding shipping contract until terms, document review, and booking confirmation are formally issued by company management.'}
          </p>
        </section>

        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '2. صحة بيانات ومواصفات البضاعة' : '2. Accuracy of Cargo Declarations'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'يتحمل العميل المسؤولية الكاملة عن صحة ودقة البيانات المقدمة بخصوص نوع البضاعة وأوزانها وطبيعتها، والتأكد من عدم اشتمالها على مواد محظورة أو مخالفة للقوانين الجمركية النافذة في اليمن وبلد التصدير.'
              : 'The client bears full responsibility for the veracity and accuracy of declared goods, dimensions, and classifications, confirming zero involvement of prohibited or contraband materials under Yemeni and export jurisdiction.'}
          </p>
        </section>

        <section className="bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0]">
          <h2 className="text-base font-bold text-[#0B3158] mb-2">
            {lang === 'ar' ? '3. إجراءات ورسوم التخليص الجمركي' : '3. Customs Clearance & Tariffs'}
          </h2>
          <p>
            {lang === 'ar'
              ? 'تخضع الرسوم والضرائب الجمركية للتقييم الرسمي الصادر عن الدوائر الجمركية في الموانئ والمنافذ اليمنية، وتقوم سما كابيتال بإنهاء الإجراءات وتقديم البيانات الجمركية نيابة عن العميل وفق الوثائق المعتمدة.'
              : 'Customs duties, taxes, and terminal charges are assessed by official customs port authorities in Yemen. Sama Capital processes filings and clearance on the client’s behalf in strict adherence to certified documentation.'}
          </p>
        </section>
      </div>
    </div>
  </div>
);
