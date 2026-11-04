import React from 'react';
import { MapPin, Navigation, Anchor, Building, Plane, CheckCircle } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { DESTINATIONS } from '../../data/companyData';

interface DestinationsSectionProps {
  lang: Language;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ lang }) => {
  const t = translations[lang].destinationsSection;
  const isRtl = lang === 'ar';

  const chinaData = DESTINATIONS.find(d => d.role === 'origin');
  const yemenData = DESTINATIONS.find(d => d.role === 'destination');

  return (
    <section id="destinations" className="py-16 sm:py-20 bg-[#EAF2F8] border-t border-[#E1E9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0876C9] uppercase tracking-wider block mb-2">
            {lang === 'ar' ? 'البنية التحتية والانتشار' : 'Network Footprint'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {t.sectionTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.sectionDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* China Loading Hubs */}
          <div className="bg-white rounded-3xl border border-[#E1E9F0] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E1E9F0] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F1F6FA] text-[#0876C9] border border-[#E1E9F0] flex items-center justify-center font-bold">
                    CN
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B3158]">
                      {t.chinaHubs}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {lang === 'ar' ? 'مستودعات التجميع ونقاط الإبحار والشحن الجوي' : 'Consolidation nodes, maritime berths & air gateways'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {chinaData?.hubs.map((hub, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] flex items-start gap-3 hover:bg-white hover:border-[#0876C9]/40 hover:shadow-xs transition-all"
                  >
                    <div className="p-2.5 rounded-xl bg-white border border-[#E1E9F0] shadow-2xs mt-0.5 text-[#0876C9]">
                      {hub.type === 'seaport' ? (
                        <Anchor className="w-4 h-4" />
                      ) : hub.type === 'port_airport' ? (
                        <Plane className="w-4 h-4" />
                      ) : (
                        <Building className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B3158]">
                        {lang === 'ar' ? hub.nameAr : hub.nameEn}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {lang === 'ar' ? hub.descAr : hub.nameEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E1E9F0] text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'ar' 
                  ? 'مكتب وممثل معتمد في الصين لمتابعة الاستلام والفحص (+8618629282407)' 
                  : 'Designated operations desk in China for reception and auditing (+8618629282407)'}
              </span>
            </div>
          </div>

          {/* Yemen Discharge Ports & Inland Haulage */}
          <div className="bg-white rounded-3xl border border-[#E1E9F0] p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E1E9F0] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F39A16] border border-amber-200/60 flex items-center justify-center font-bold">
                    YE
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B3158]">
                      {t.yemenHubs}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {lang === 'ar' ? 'الموانئ البحرية وشبكة النقل والتوزيع الداخلي' : 'Discharge seaports & domestic haulage network'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5">
                {yemenData?.hubs.map((hub, idx) => {
                  const isMainHq = hub.type === 'hq_hub';
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                        isMainHq 
                          ? 'bg-amber-50/70 border-amber-200/80 shadow-2xs' 
                          : 'bg-[#F1F6FA] border-[#E1E9F0] hover:bg-white hover:border-[#0876C9]/40 hover:shadow-xs'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl bg-white border border-[#E1E9F0] shadow-2xs mt-0.5 ${isMainHq ? 'text-[#F39A16]' : 'text-[#0876C9]'}`}>
                        {isMainHq ? (
                          <MapPin className="w-4 h-4" />
                        ) : hub.type === 'seaport' ? (
                          <Anchor className="w-4 h-4" />
                        ) : (
                          <Navigation className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0B3158]">
                            {lang === 'ar' ? hub.nameAr : hub.nameEn}
                          </h4>
                          {isMainHq && (
                            <span className="text-[10px] font-bold text-[#F39A16] bg-white px-2 py-0.5 rounded-md border border-[#F39A16]/20 shadow-2xs">
                              {t.mainOfficeBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {lang === 'ar' ? hub.descAr : hub.nameEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E1E9F0] text-xs text-slate-500 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {lang === 'ar' 
                  ? 'أسطول نقل وتوصيل بري يسلم الحاويات والبضائع حتى مستودع العميل' 
                  : 'Dedicated road transport fleet delivering cleared containers to customer premises'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
