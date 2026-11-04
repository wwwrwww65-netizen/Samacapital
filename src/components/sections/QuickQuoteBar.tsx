import React from 'react';
import { FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface QuickQuoteBarProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

export const QuickQuoteBar: React.FC<QuickQuoteBarProps> = ({ lang, onNavigate }) => {
  const t = translations[lang].quickQuoteBar;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="bg-gradient-to-r from-[#0876C9] to-[#0B3158] text-white py-5 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center md:text-start">
          <div className="p-2.5 rounded-lg bg-white/10 text-[#F39A16] shrink-0 hidden sm:block">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              {t.title}
            </h3>
            <p className="text-xs text-sky-100">
              {t.desc}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('quote')}
          className="px-5 py-2.5 bg-[#F39A16] hover:bg-[#e08b0f] text-slate-950 font-bold text-xs sm:text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-98"
        >
          <span>{t.btn}</span>
          <ArrowIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
