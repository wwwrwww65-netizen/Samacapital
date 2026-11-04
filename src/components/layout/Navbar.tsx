import React, { useState } from 'react';
import { Menu, X, Shield, PlaneTakeoff, Ship } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { IMAGES } from '../../data/companyData';

interface NavbarProps {
  lang: Language;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { key: 'home', label: t.home },
    { key: 'services', label: t.services },
    { key: 'corridors', label: t.corridors },
    { key: 'calculator', label: t.calculator },
    { key: 'how-it-works', label: t.howItWorks },
    { key: 'destinations', label: t.destinations },
    { key: 'track', label: t.track },
    { key: 'faq', label: t.faq },
    { key: 'contact', label: t.contact },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-start group cursor-pointer focus:outline-hidden"
          >
            <div className="h-12 sm:h-14 w-12 sm:w-14 rounded-xl bg-white border border-slate-200 shadow-xs p-1 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#0876C9]/40 transition-colors">
              <img 
                src={IMAGES.logo} 
                alt="سما كابيتال | SAMA CAPITAL" 
                className="w-full h-full object-contain"
                loading="eager"
                decoding="sync"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden text-[#0B3158] font-bold text-xs items-center justify-center">
                SC
              </div>
            </div>
            <div className="flex flex-col whitespace-nowrap shrink-0">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B3158] group-hover:text-[#0876C9] transition-colors">
                {lang === 'ar' ? 'سما كابيتال' : 'SAMA CAPITAL'}
              </span>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                {lang === 'ar' ? 'الاستيراد والشحن والتخليص الجمركي' : 'Import, Shipping & Customs Clearance'}
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navItems.map((item) => {
              const isActive = currentView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'text-[#0876C9] font-semibold' 
                      : 'text-slate-600 hover:text-[#0B3158]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#0876C9] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary CTA Button + Portal Link */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('admin')}
              className={`text-xs px-2.5 py-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer ${
                currentView === 'admin' ? 'bg-slate-100 text-slate-900 font-semibold' : ''
              }`}
              title={t.adminPortal}
            >
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              <span className="whitespace-nowrap">{t.adminPortal}</span>
            </button>

            <button
              onClick={() => handleNavClick('quote')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0876C9] to-[#0B3158] hover:from-[#0987e3] hover:to-[#123e6e] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-98"
            >
              {t.requestQuote}
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('quote')}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#0876C9] rounded-md whitespace-nowrap"
            >
              {t.requestQuote}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === item.key
                    ? 'bg-sky-50 text-[#0876C9] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('quote')}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-[#0876C9] text-white text-sm font-bold shadow-sm"
              >
                {t.requestQuote}
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-center py-2 px-4 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>{t.adminPortal}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
