import React from 'react';
import { FileCheck, FileText, PackageCheck, Anchor, Truck, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface HowItWorksSectionProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ lang, onNavigate }) => {
  const t = translations[lang].howItWorksSection;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const steps = [
    {
      num: t.step1Num,
      title: t.step1Title,
      desc: t.step1Desc,
      icon: <FileText className="w-5 h-5 text-[#0876C9]" />,
    },
    {
      num: t.step2Num,
      title: t.step2Title,
      desc: t.step2Desc,
      icon: <FileCheck className="w-5 h-5 text-[#F39A16]" />,
    },
    {
      num: t.step3Num,
      title: t.step3Title,
      desc: t.step3Desc,
      icon: <PackageCheck className="w-5 h-5 text-indigo-600" />,
    },
    {
      num: t.step4Num,
      title: t.step4Title,
      desc: t.step4Desc,
      icon: <Anchor className="w-5 h-5 text-sky-600" />,
    },
    {
      num: t.step5Num,
      title: t.step5Title,
      desc: t.step5Desc,
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
    },
  ];

  const requiredDocuments = [
    {
      titleAr: 'الفاتورة التجارية الرسمية (Commercial Invoice)',
      titleEn: 'Certified Commercial Invoice',
      descAr: 'تتضمن مواصفات البضاعة والأسعار الدقيقة وقيمة الشحنة.',
      descEn: 'Details item descriptions, exact unit costs, and total declared value.'
    },
    {
      titleAr: 'قائمة التعبئة المفصلة (Packing List)',
      titleEn: 'Detailed Packing List',
      descAr: 'توضح عدد الطرود، والوزن الإجمالي، والوزن الصافي، والأبعاد.',
      descEn: 'Specifies total carton counts, gross/net weight, and dimensional volume.'
    },
    {
      titleAr: 'بوليصة الشحن (Bill of Lading / Air Waybill)',
      titleEn: 'Bill of Lading or Air Waybill',
      descAr: 'المستند الملاحي الرسمي الصادر عن الخط البحري أو شركة الطيران.',
      descEn: 'The primary carrier transit manifest issued by shipping line or airline.'
    },
    {
      titleAr: 'شهادة المنشأ المعتمدة (Certificate of Origin)',
      titleEn: 'Certificate of Origin (CO)',
      descAr: 'وثيقة رسمية تثبت بلد الصنع لتقديمها للسلطات الجمركية.',
      descEn: 'Official certification proving country of manufacturing for customs authorities.'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.sectionDesc}
          </p>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 flex flex-col justify-between relative group hover:border-[#0876C9] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#0B3158] font-mono">
                    {step.num}
                  </span>
                  <div className="p-2 rounded-lg bg-white shadow-2xs">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#0B3158] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -top-2.5 rtl:-left-3.5 rtl:right-auto left-auto -right-3.5 z-10 text-slate-300">
                  <ArrowIcon className="w-5 h-5 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mandatory Documentation Checklist Drawer / Box */}
        <div className="mt-16 bg-[#0B3158] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold text-[#F39A16] uppercase tracking-wider block">
                {lang === 'ar' ? 'التخليص الجمركي بدون تعقيد' : 'Customs Clearance Without Friction'}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {lang === 'ar' ? 'المستندات الجمركية التي نساعدك في إعدادها ومراجعتها' : 'Essential Shipping Documents We Audit Prior to Departure'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'ar' 
                  ? 'يقوم فريق سما كابيتال بفحص وتدقيق هذه المستندات قبل مغادرة الحاوية من الصين لتفادي أي غرامات تأخير في الموانئ اليمنية.' 
                  : 'Sama Capital audits these documents before containers depart China to eliminate costly delays and demurrage in Yemeni ports.'}
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('quote')}
                  className="px-5 py-2.5 bg-[#0876C9] hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'ar' ? 'اطلب استشارة جمركية لشحنتك' : 'Request Customs Consultation'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-[#F39A16] shrink-0" />
                    <span>{lang === 'ar' ? doc.titleAr : doc.titleEn}</span>
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {lang === 'ar' ? doc.descAr : doc.descEn}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
