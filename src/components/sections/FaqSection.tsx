import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle, MessageCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { FAQS } from '../../data/companyData';

interface FaqSectionProps {
  lang: Language;
  onNavigate: (view: string) => void;
  whatsappNumber: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang, onNavigate, whatsappNumber }) => {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    '0-0': true, // Open the first item by default
  });

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isRtl = lang === 'ar';

  return (
    <section id="faq" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex p-2.5 rounded-xl bg-sky-100 text-[#0876C9] mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {lang === 'ar' ? 'الأسئلة الشائعة والأجوبة المعتمدة' : 'Frequently Asked Questions'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            {lang === 'ar' 
              ? 'إجابات واضحة ودقيقة عن استفسارات الاستيراد، الشحن، التخليص، وحساب التكاليف.' 
              : 'Direct answers about sourcing, maritime/air transit, customs, and pricing.'}
          </p>

          {/* Quick search input */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 start-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث في الأسئلة الشائعة...' : 'Search questions...'}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0876C9]"
            />
          </div>
        </div>

        {/* Categories & Questions */}
        <div className="space-y-8">
          {FAQS.map((category, catIdx) => {
            const filteredQuestions = category.questions.filter(q => {
              const query = search.toLowerCase();
              const qText = (lang === 'ar' ? q.qAr : q.qEn).toLowerCase();
              const aText = (lang === 'ar' ? q.aAr : q.aEn).toLowerCase();
              return qText.includes(query) || aText.includes(query);
            });

            if (filteredQuestions.length === 0) return null;

            return (
              <div key={catIdx} className="space-y-3">
                <h3 className="text-sm font-bold text-[#0876C9] uppercase tracking-wider px-1">
                  {lang === 'ar' ? category.categoryAr : category.categoryEn}
                </h3>

                <div className="space-y-3">
                  {filteredQuestions.map((item, qIdx) => {
                    const itemKey = `${catIdx}-${qIdx}`;
                    const isOpen = !!openItems[itemKey];

                    return (
                      <div
                        key={qIdx}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                      >
                        <button
                          onClick={() => toggleItem(itemKey)}
                          className="w-full text-start p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0B3158] hover:text-[#0876C9] transition-colors focus:outline-hidden"
                          aria-expanded={isOpen}
                        >
                          <span>{lang === 'ar' ? item.qAr : item.qEn}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#0876C9]' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                            <p className="pt-3">
                              {lang === 'ar' ? item.aAr : item.aEn}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Didn't find answer? CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="text-start">
            <h4 className="text-sm font-bold text-[#0B3158]">
              {lang === 'ar' ? 'لديك استفسار خاص بنوع بضاعتك أو مسار شحنك؟' : 'Have a specialized inquiry regarding your cargo?'}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'ar' ? 'فريقنا متاح للرد المباشر وتقديم استشارة لوجستية.' : 'Our team is ready to consult on your exact requirements.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('contact')}
              className="px-4 py-2 bg-[#0B3158] hover:bg-[#0876C9] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </button>
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
