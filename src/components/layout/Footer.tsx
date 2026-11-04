import React from 'react';
import { Phone, MapPin, MessageCircle, Mail, Shield, ArrowUp } from 'lucide-react';
import { Language, CompanySettings } from '../../types';
import { translations } from '../../i18n/translations';
import { IMAGES, SERVICES_LIST } from '../../data/companyData';

interface FooterProps {
  lang: Language;
  onNavigate: (view: string) => void;
  settings: CompanySettings;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate, settings }) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B3158] text-slate-300 pt-16 pb-12 border-t border-[#144272]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-700/60">
          
          {/* Col 1: Brand & Official Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img 
                  src={IMAGES.logo} 
                  alt="سما كابيتال | SAMA CAPITAL" 
                  className="w-full h-full object-contain" 
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <span className="text-xl font-bold text-white block">
                  {lang === 'ar' ? 'سما كابيتال' : 'SAMA CAPITAL'}
                </span>
                <span className="text-xs text-[#F39A16] font-medium block">
                  {lang === 'ar' ? 'الاستيراد والشحن والتخليص الجمركي' : 'Import, Shipping & Customs Clearance'}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              {t.aboutSummary}
            </p>

            <div className="pt-2">
              <button
                onClick={() => { onNavigate('quote'); scrollToTop(); }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0876C9] hover:bg-[#0987e3] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>{navT.requestQuote}</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-700/50 pb-2">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button 
                  onClick={() => { onNavigate('home'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {navT.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('services'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {navT.services}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('how-it-works'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {navT.howItWorks}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('destinations'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {navT.destinations}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('track'); scrollToTop(); }}
                  className="hover:text-[#F39A16] font-medium transition-colors cursor-pointer"
                >
                  {navT.track}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('faq'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {navT.faq}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {navT.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Directory */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-700/50 pb-2">
              {t.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {SERVICES_LIST.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => { onNavigate('services'); scrollToTop(); }}
                    className="hover:text-white text-start transition-colors cursor-pointer"
                  >
                    {lang === 'ar' ? srv.titleAr : srv.titleEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Verified Contact Coordinates */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 border-b border-slate-700/50 pb-2">
              {t.contactInfo}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F39A16] shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {lang === 'ar' ? settings.addressAr : settings.addressEn}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0876C9] shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    {lang === 'ar' ? 'هاتف اليمن (مكالمات وواتساب):' : 'Yemen Phone & WhatsApp:'}
                  </span>
                  <a 
                    href={`tel:${settings.phoneYemen}`}
                    className="text-white hover:text-[#F39A16] font-mono"
                    dir="ltr"
                  >
                    {settings.phoneYemen}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[11px]">
                    {lang === 'ar' ? 'هاتف التنسيق في الصين:' : 'China Coordination Desk:'}
                  </span>
                  <a 
                    href={`tel:${settings.phoneChina}`}
                    className="text-white hover:text-[#38BDF8] font-mono"
                    dir="ltr"
                  >
                    {settings.phoneChina}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/30 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.rights}</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => { onNavigate('privacy'); scrollToTop(); }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {t.privacyPolicy}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => { onNavigate('terms'); scrollToTop(); }}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {t.termsOfService}
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => { onNavigate('admin'); scrollToTop(); }}
              className="hover:text-[#F39A16] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Shield className="w-3 h-3" />
              <span>{navT.adminPortal}</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors focus:outline-hidden"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
