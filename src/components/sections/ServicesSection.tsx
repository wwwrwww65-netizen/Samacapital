import React, { useState } from 'react';
import { Ship, Plane, FileCheck, Truck, Package, Building2, ArrowRight, ArrowLeft, X, CheckCircle, FileText } from 'lucide-react';
import { Language, ServiceItem, ServiceCategory } from '../../types';
import { translations } from '../../i18n/translations';
import { SERVICES_LIST } from '../../data/companyData';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForQuote: (serviceId: string) => void;
  showTitle?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  lang, 
  onSelectServiceForQuote,
  showTitle = true 
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const t = translations[lang].servicesSection;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const categories = [
    { key: 'all', label: t.filterAll },
    { key: 'import', label: t.filterImport },
    { key: 'sea', label: t.filterSea },
    { key: 'air', label: t.filterAir },
    { key: 'clearance', label: t.filterClearance },
    { key: 'domestic', label: t.filterDomestic },
  ];

  const filteredServices = activeCategory === 'all' 
    ? SERVICES_LIST 
    : SERVICES_LIST.filter(s => s.category === activeCategory);

  const getServiceIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'sea':
        return <Ship className="w-5 h-5 text-[#0876C9]" />;
      case 'air':
        return <Plane className="w-5 h-5 text-sky-500" />;
      case 'clearance':
        return <FileCheck className="w-5 h-5 text-[#F39A16]" />;
      case 'domestic':
        return <Truck className="w-5 h-5 text-emerald-600" />;
      case 'import':
        return <Package className="w-5 h-5 text-indigo-600" />;
      case 'corporate':
        return <Building2 className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
              {t.sectionTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              {t.sectionDesc}
            </p>
          </div>
        )}

        {/* Category Filters (Modern Floating Segmented Pill - High Touch Mobile) */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl sm:rounded-full overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl sm:rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'bg-[#0876C9] text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid (Modern Asymmetric Bento Look) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const title = lang === 'ar' ? service.titleAr : service.titleEn;
            const desc = lang === 'ar' ? service.shortDescAr : service.shortDescEn;

            return (
              <div 
                key={service.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Service Card Image with High-End Overlay */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-4 start-4 p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-md">
                    {getServiceIcon(service.category)}
                  </div>

                  <div className="absolute bottom-4 inset-x-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#F39A16] block mb-1">
                      {service.category.toUpperCase()}
                    </span>
                    <h3 className="text-lg font-black text-white group-hover:text-sky-200 transition-colors">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {desc}
                  </p>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="text-xs font-bold text-[#0876C9] hover:text-[#0B3158] transition-colors flex items-center gap-1 cursor-pointer py-1.5"
                    >
                      <span>{t.viewDetails}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onSelectServiceForQuote(service.id)}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#0876C9] to-[#0B3158] hover:from-sky-600 hover:to-blue-900 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      {t.requestService}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Service Detailed Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-sky-50">
                {getServiceIcon(selectedServiceModal.category)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0B3158]">
                  {lang === 'ar' ? selectedServiceModal.titleAr : selectedServiceModal.titleEn}
                </h3>
                <span className="text-xs text-slate-500">
                  {lang === 'ar' ? 'سما كابيتال — خدمات لوجستية معتمدة' : 'Sama Capital — Certified Freight Services'}
                </span>
              </div>
            </div>

            <div className="space-y-5 text-sm text-slate-700">
              <p className="leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {lang === 'ar' ? selectedServiceModal.fullDescAr : selectedServiceModal.fullDescEn}
              </p>

              {/* Key Features */}
              <div>
                <h4 className="font-bold text-[#0B3158] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'أبرز مميزات الخدمة ونطاقها:' : 'Service Capabilities & Scope:'}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 ps-5 list-disc">
                  {(lang === 'ar' ? selectedServiceModal.featuresAr : selectedServiceModal.featuresEn).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Required Documents / Input */}
              <div>
                <h4 className="font-bold text-[#0B3158] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#F39A16]" />
                  <span>{lang === 'ar' ? 'البيانات أو الوثائق المطلوبة لتجهيز الطلب:' : 'Required Information & Documents:'}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 ps-5 list-disc">
                  {(lang === 'ar' ? selectedServiceModal.requirementsAr : selectedServiceModal.requirementsEn).map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {lang === 'ar' ? 'يتم تحديد التكلفة النهائية بناءً على الأوزان ومسار الشحن' : 'Final rate calculated based on exact cargo volume and routing'}
              </span>

              <button
                onClick={() => {
                  const serviceId = selectedServiceModal.id;
                  setSelectedServiceModal(null);
                  onSelectServiceForQuote(serviceId);
                }}
                className="px-5 py-2.5 bg-[#0876C9] hover:bg-[#0B3158] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                {t.requestService}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
