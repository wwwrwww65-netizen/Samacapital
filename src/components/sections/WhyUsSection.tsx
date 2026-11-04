import React from 'react';
import { Building, ShieldCheck, MapPin, CheckCircle, Navigation } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface WhyUsSectionProps {
  lang: Language;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ lang }) => {
  const t = translations[lang].whyUs;

  const points = [
    {
      icon: <Building className="w-6 h-6 text-[#0876C9]" />,
      title: t.item1Title,
      desc: t.item1Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#F39A16]" />,
      title: t.item2Title,
      desc: t.item2Desc,
    },
    {
      icon: <Navigation className="w-6 h-6 text-emerald-600" />,
      title: t.item3Title,
      desc: t.item3Desc,
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-sky-600" />,
      title: t.item4Title,
      desc: t.item4Desc,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 shadow-xs flex items-center justify-center mb-5">
                  {point.icon}
                </div>
                <h3 className="text-base font-bold text-[#0B3158] mb-2.5">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#0876C9]">
                <span>0{index + 1}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400 font-normal">معيار معتمد</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
