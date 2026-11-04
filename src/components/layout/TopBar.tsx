import React from 'react';
import { Phone, MessageCircle, Clock, Globe } from 'lucide-react';
import { Language, CompanySettings } from '../../types';
import { translations } from '../../i18n/translations';

interface TopBarProps {
  lang: Language;
  onToggleLang: () => void;
  settings: CompanySettings;
}

export const TopBar: React.FC<TopBarProps> = ({ lang, onToggleLang, settings }) => {
  const t = translations[lang].topBar;
  const isRtl = lang === 'ar';

  return (
    <div className="bg-[#0B3158] text-slate-100 text-xs border-b border-[#144272] overflow-hidden w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Hotlines */}
        <div className="flex items-center flex-wrap gap-4 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#F39A16]" />
            <span className="text-slate-400 font-medium">{t.yemenOffice}</span>
            <a 
              href={`tel:${settings.phoneYemen}`}
              className="text-white hover:text-[#F39A16] font-mono transition-colors"
              dir="ltr"
            >
              {settings.phoneYemen}
            </a>
          </div>

          <span className="hidden sm:inline text-slate-600" aria-hidden="true">|</span>

          <div className="hidden sm:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-slate-400 font-medium">{t.chinaOffice}</span>
            <a 
              href={`tel:${settings.phoneChina}`} 
              className="text-white hover:text-[#38BDF8] font-mono transition-colors"
              dir="ltr"
            >
              {settings.phoneChina}
            </a>
          </div>

          <span className="hidden md:inline text-slate-600" aria-hidden="true">|</span>

          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              lang === 'ar' ? 'مرحباً سما كابيتال، أود الاستفسار عن خدمات الشحن والاستيراد' : 'Hello Sama Capital, I would like to inquire about shipping and import services'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{t.whatsapp}</span>
          </a>
        </div>

        {/* Right: Working Hours & Language Switcher */}
        <div className="flex items-center gap-4 text-slate-300">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? settings.workingHoursAr : settings.workingHoursEn}</span>
          </div>

          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 py-0.5 px-2.5 rounded border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-white font-medium transition-colors"
            title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-[#F39A16]" />
            <span>{t.langToggle}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
