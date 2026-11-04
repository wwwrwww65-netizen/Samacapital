import React, { useState } from 'react';
import { Ship, Plane, Navigation, Clock, Calendar, ArrowRight, ArrowLeft, Anchor, CheckCircle } from 'lucide-react';
import { Language } from '../../types';
import { SHIPPING_CORRIDORS, ShippingCorridor } from '../../data/companyData';

interface ShippingRoutesMatrixProps {
  lang: Language;
  onSelectRouteForQuote: (origin: string, destination: string, mode: string) => void;
}

export const ShippingRoutesMatrix: React.FC<ShippingRoutesMatrixProps> = ({ 
  lang, 
  onSelectRouteForQuote 
}) => {
  const [filterMode, setFilterMode] = useState<string>('all');
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const filtered = filterMode === 'all'
    ? SHIPPING_CORRIDORS
    : SHIPPING_CORRIDORS.filter(c => {
        if (filterMode === 'sea') return c.mode.startsWith('sea');
        if (filterMode === 'air') return c.mode === 'air';
        return true;
      });

  return (
    <section className="py-16 sm:py-20 bg-[#F4F7FA] border-t border-[#E1E9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0876C9] mb-2">
              <Navigation className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'شبكة الملاحة والمسارات المباشرة' : 'Direct Corridors & Schedules'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
              {lang === 'ar' ? 'أهم مسارات الشحن المعتمدة بين الصين واليمن' : 'Operational Cargo Corridors (China ⇄ Yemen)'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl">
              {lang === 'ar' 
                ? 'رحلات بحرية وجوية منتظمة تربط أهم مراكز التصدير الصينية بموانئ ومحافظات الجمهورية اليمنية.' 
                : 'Direct maritime sailings and air cargo rotations linking prime Chinese hubs with Yemeni discharge nodes.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white/90 border border-[#E1E9F0] rounded-2xl self-start md:self-auto shrink-0 text-xs font-semibold shadow-xs">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                filterMode === 'all' ? 'bg-[#0B3158] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-[#0B3158]'
              }`}
            >
              {lang === 'ar' ? 'جميع المسارات' : 'All Routes'}
            </button>
            <button
              onClick={() => setFilterMode('sea')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'sea' ? 'bg-[#0B3158] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-[#0B3158]'
              }`}
            >
              <Ship className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'ar' ? 'شحن بحري' : 'Sea Freight'}</span>
            </button>
            <button
              onClick={() => setFilterMode('air')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                filterMode === 'air' ? 'bg-[#0B3158] text-white shadow-xs font-bold' : 'text-slate-600 hover:text-[#0B3158]'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              <span>{lang === 'ar' ? 'شحن جوي' : 'Air Freight'}</span>
            </button>
          </div>
        </div>

        {/* Corridors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((corridor) => (
            <div 
              key={corridor.id}
              className="bg-white border border-[#E1E9F0] rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#0876C9]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                
                {/* Route Header Info */}
                <div className="flex items-center justify-between pb-4 border-b border-[#E1E9F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#F1F6FA] text-[#0876C9] border border-[#E1E9F0] shadow-2xs group-hover:scale-105 transition-transform">
                      {corridor.mode === 'air' ? (
                        <Plane className="w-4 h-4 text-sky-500" />
                      ) : (
                        <Ship className="w-4 h-4 text-[#0876C9]" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#0B3158] tracking-wide">
                      {lang === 'ar' ? corridor.modeLabelAr : corridor.modeLabelEn}
                    </span>
                  </div>

                  <span className="text-xs font-mono font-bold text-[#0B3158] bg-[#F1F6FA] px-2.5 py-1 rounded-lg border border-[#E1E9F0] tabular-nums">
                    {corridor.originCode} ➔ {corridor.destinationCode}
                  </span>
                </div>

                {/* Main Origin & Destination Big Display */}
                <div className="py-6 flex items-center justify-between gap-4">
                  <div className="text-start">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      {lang === 'ar' ? 'ميناء / مركز الإرسال:' : 'Origin Gateway:'}
                    </span>
                    <span className="text-base sm:text-lg font-black text-slate-900 mt-1 block tracking-tight">
                      {lang === 'ar' ? corridor.originNameAr : corridor.originNameEn}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center px-3">
                    <div className="w-full flex items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0876C9] shrink-0 shadow-xs" />
                      <div className="flex-1 border-t-2 border-dashed border-[#0876C9]/35" />
                      <ArrowIcon className="w-4 h-4 text-[#0876C9] shrink-0" />
                    </div>
                  </div>

                  <div className="text-end">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
                      {lang === 'ar' ? 'الوجهة في اليمن:' : 'Destination Node:'}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#0B3158] mt-1 block tracking-tight">
                      {lang === 'ar' ? corridor.destinationNameAr : corridor.destinationNameEn}
                    </span>
                  </div>
                </div>

                {/* Transit Specs Strip */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F1F6FA] rounded-2xl border border-[#E1E9F0] text-xs">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#F39A16] shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">{lang === 'ar' ? 'المدة التقديرية:' : 'Typical Duration:'}</span>
                      <span className="font-bold text-slate-900 font-mono tabular-nums">{lang === 'ar' ? corridor.typicalDurationAr : corridor.typicalDurationEn}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#0876C9] shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">{lang === 'ar' ? 'التكرار والجدول:' : 'Departure:'}</span>
                      <span className="font-bold text-slate-900">{lang === 'ar' ? corridor.departureFrequencyAr : corridor.departureFrequencyEn}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Anchor className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {lang === 'ar' ? corridor.clearancePortAr : corridor.clearancePortEn}
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-[#E1E9F0] flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  {lang === 'ar' ? 'تخليص جمركي ونقل داخلي متاح' : 'Clearance & Trucking Available'}
                </span>

                <button
                  onClick={() => onSelectRouteForQuote(
                    lang === 'ar' ? corridor.originNameAr : corridor.originNameEn,
                    lang === 'ar' ? corridor.destinationNameAr : corridor.destinationNameEn,
                    corridor.mode.startsWith('sea') ? 'sea' : 'air'
                  )}
                  className="px-5 py-2.5 bg-[#0B3158] hover:bg-[#0876C9] text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer active:scale-95 shrink-0"
                >
                  <span>{lang === 'ar' ? 'طلب تسعير لهذا المسار' : 'Book This Corridor'}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
