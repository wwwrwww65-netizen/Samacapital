import React from 'react';
import { Home, Package, Calculator, Search, PlusCircle, FileText } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface MobileBottomNavProps {
  lang: Language;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  lang, 
  currentView, 
  onNavigate 
}) => {
  const t = translations[lang].nav;

  const items = [
    { key: 'home', label: t.home, icon: <Home className="w-5 h-5" /> },
    { key: 'services', label: t.services, icon: <Package className="w-5 h-5" /> },
    { key: 'calculator', label: lang === 'ar' ? 'حاسبة CBM' : 'CBM Tool', icon: <Calculator className="w-5 h-5" /> },
    { key: 'track', label: t.track, icon: <Search className="w-5 h-5" /> },
    { 
      key: 'quote', 
      label: t.requestQuote, 
      icon: <FileText className="w-5 h-5" />, 
      isAction: true 
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-2xl pb-safe">
      <div className="grid grid-cols-5 h-16 items-center px-1 max-w-md mx-auto">
        {items.map((item) => {
          const isActive = currentView === item.key;

          if (item.isAction) {
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className="flex flex-col items-center justify-center -mt-5 cursor-pointer focus:outline-hidden"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0876C9] to-sky-400 text-white shadow-lg shadow-sky-500/40 flex items-center justify-center border-2 border-white active:scale-95 transition-transform">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-[#0876C9] mt-1 whitespace-nowrap">
                  {lang === 'ar' ? 'طلب تسعير' : 'Quote'}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer focus:outline-hidden ${
                isActive ? 'text-[#0876C9]' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-sky-50 text-[#0876C9]' : ''}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold mt-0.5 truncate max-w-[64px] ${
                isActive ? 'text-[#0876C9]' : 'text-slate-500 font-medium'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
