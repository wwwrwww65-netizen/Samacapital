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
    <section className="py-16 sm:py-20 bg-[#EAF2F8] border-y border-[#E1E9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0876C9] uppercase tracking-wider block mb-2">
            {lang === 'ar' ? 'معايير الجودة والالتزام' : 'Quality & Operational Integrity'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {points.map((point, index) => (
            <div 
              key={index}
              className="p-7 rounded-3xl bg-white border border-[#E1E9F0] shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#0876C9]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] text-[#0876C9] shadow-2xs flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {point.icon}
                </div>
                <h3 className="text-base font-extrabold text-[#0B3158] mb-2.5 leading-snug">
                  {point.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {point.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E1E9F0] flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#0B3158] bg-[#F1F6FA] px-2.5 py-1 rounded-lg border border-[#E1E9F0] tabular-nums">
                  0{index + 1}
                </span>
                <span className="text-slate-400 font-sans font-medium text-[11px]">{lang === 'ar' ? 'معيار موثق' : 'Verified Pillar'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
