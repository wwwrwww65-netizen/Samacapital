import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  Search, 
  Ship, 
  Plane, 
  FileCheck, 
  ShieldCheck, 
  Navigation, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { IMAGES } from '../../data/companyData';

interface HeroSectionProps {
  lang: Language;
  onNavigate: (view: string) => void;
  whatsappNumber: string;
  onQuickRouteSelect?: (origin: string, destination: string, mode: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  lang, 
  onNavigate, 
  whatsappNumber,
  onQuickRouteSelect
}) => {
  const t = translations[lang].hero;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'quote' | 'track'>('quote');
  const [heroOrigin, setHeroOrigin] = useState<string>('نينغبو (Ningbo)');
  const [heroDestination, setHeroDestination] = useState<string>('صنعاء (Sana\'a)');
  const [heroMode, setHeroMode] = useState<'sea' | 'air'>('sea');
  const [quickTrackCode, setQuickTrackCode] = useState<string>('');

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuickRouteSelect) {
      onQuickRouteSelect(heroOrigin, heroDestination, heroMode);
    } else {
      onNavigate('quote');
    }
  };

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('track');
  };

  return (
    <section className="relative bg-[#071B33] text-white overflow-hidden border-b border-[#0f2d52]">
      
      {/* Background Graphic & Modern Ambient Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.portAerial}
          alt="Modern International Container Seaport"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071B33] via-[#071B33]/85 to-[#071B33]/90" />
        
        {/* Subtle decorative grid mesh */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24">
        
        {/* Top Operational Status Ticker Strip */}
        <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-sky-200 mb-8 shadow-xs overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-[#F39A16] shrink-0" />
          <span className="font-semibold text-white shrink-0">SAMA CAPITAL</span>
          <span className="text-slate-400 shrink-0">·</span>
          <span className="truncate sm:whitespace-normal">{lang === 'ar' ? 'رحلات بحرية وجوية منتظمة بين موانئ الصين وكافة المحافظات اليمنية' : 'Regular Sea & Air rotations linking China hubs to all Yemeni cities'}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Typography & Call to Action (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
              {lang === 'ar' ? (
                <>
                  شحنك واستيرادك… <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#0876C9] to-[#F39A16]">
                    بإجراءات أوضح وخطوات أسهل
                  </span>
                </>
              ) : (
                <>
                  International Freight & Import, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-[#0876C9] to-[#F39A16]">
                    Engineered with Absolute Clarity
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              {t.subheadline}
            </p>

            {/* CTAs Button Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('quote')}
                className="px-6 py-3.5 bg-gradient-to-r from-[#0876C9] to-sky-500 hover:from-[#0987e3] hover:to-sky-400 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-sky-500/25 transition-all flex items-center gap-3 cursor-pointer group active:scale-98"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  lang === 'ar' ? 'السلام عليكم سما كابيتال، أود الاستفسار عن تفاصيل الشحن والاستيراد' : 'Hello Sama Capital, I would like to inquire about freight & import services'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-sm sm:text-base rounded-xl transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>{t.ctaSecondary}</span>
              </a>
            </div>

            {/* Verified Operational Badges Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#F39A16] shrink-0" />
                <span>{t.trustItem1}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>{t.trustItem2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.trustItem3}</span>
              </div>
            </div>

          </div>

          {/* Interactive Modern Freight Control Console in Hero (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-5 sm:p-6 text-slate-900">
              
              {/* Tab Header: Fast Quote vs Track */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setActiveTab('quote')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'quote'
                      ? 'bg-white text-[#0B3158] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Ship className="w-3.5 h-3.5 text-[#0876C9]" />
                  <span>{lang === 'ar' ? 'طلب تسعير مسار فوري' : 'Instant Corridor Quote'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('track')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'track'
                      ? 'bg-white text-[#0B3158] shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-[#F39A16]" />
                  <span>{lang === 'ar' ? 'تتبع شحنة / بوليصة' : 'Track Waybill / Quote'}</span>
                </button>
              </div>

              {/* TAB 1: Fast Corridor Quote */}
              {activeTab === 'quote' && (
                <form onSubmit={handleQuickQuoteSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'ميناء أو مركز الإرسال (الصين):' : 'Origin Gateway (China):'}
                    </label>
                    <select
                      value={heroOrigin}
                      onChange={(e) => setHeroOrigin(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden"
                    >
                      <option value="نينغبو (Ningbo)">نينغبو — ميناء الحاويات الرئيسي (Ningbo)</option>
                      <option value="إيوو (Yiwu)">إيوو — مركز التجميع والشحن الجزئي (Yiwu)</option>
                      <option value="غوانزو (Guangzhou)">غوانزو — مركز الجنوب والشحن الجوي (Guangzhou)</option>
                      <option value="شنجن (Shenzhen)">شنجن — الإلكترونيات والميناء (Shenzhen)</option>
                      <option value="شنغهاي (Shanghai)">شنغهاي — ميناء عالمي (Shanghai)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'مدينة وميناء الوصول (اليمن):' : 'Destination Hub (Yemen):'}
                    </label>
                    <select
                      value={heroDestination}
                      onChange={(e) => setHeroDestination(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-900 focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden"
                    >
                      <option value="صنعاء (Sana'a)">صنعاء — المركز اللوجستي دار سلم</option>
                      <option value="عدن (Aden)">عدن — ميناء الحاويات والتخليص</option>
                      <option value="الحديدة (Hodeidah)">الحديدة — الميناء والمحافظات الغربية</option>
                      <option value="المكلا (Mukalla)">المكلا — حضرموت والمحافظات الشرقية</option>
                      <option value="تعز وإب ومأرب">تعز / إب / مأرب — توصيل مباشر للمستودع</option>
                    </select>
                  </div>

                  {/* Mode buttons */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      {lang === 'ar' ? 'نوع وسيلة الشحن:' : 'Freight Mode:'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHeroMode('sea')}
                        className={`p-2 rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                          heroMode === 'sea'
                            ? 'border-[#0876C9] bg-sky-50 text-[#0876C9] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Ship className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'شحن بحري (حاويات/LCL)' : 'Ocean Freight'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHeroMode('air')}
                        className={`p-2 rounded-lg border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                          heroMode === 'air'
                            ? 'border-[#0876C9] bg-sky-50 text-[#0876C9] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Plane className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'شحن جوي سريع' : 'Air Cargo'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0876C9] hover:bg-[#0B3158] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>{lang === 'ar' ? 'تجهيز عرض سعر لهذا المسار' : 'Get Rate for This Corridor'}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: Quick Track */}
              {activeTab === 'track' && (
                <form onSubmit={handleQuickTrackSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      {lang === 'ar' ? 'رقم الشحنة أو الرقم المرجعي:' : 'Tracking or Reference Number:'}
                    </label>
                    <input
                      type="text"
                      value={quickTrackCode}
                      onChange={(e) => setQuickTrackCode(e.target.value)}
                      placeholder="مثال: SAMA-2026-N492 أو SAMA-TRK-78901"
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 font-mono text-xs focus:ring-2 focus:ring-[#0876C9]"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                    <p>
                      {lang === 'ar' 
                        ? 'نظام التتبع المعتمد يتيح لك الاطلاع على التحديثات التشغيلية الحقيقية والمراحل الجمركية المعتمدة.' 
                        : 'Displays real verified milestones and customs processing updates recorded in our system.'}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0B3158] hover:bg-[#0876C9] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-[#F39A16]" />
                      <span>{lang === 'ar' ? 'استعلام وتتبع الآن' : 'Track Consignment Now'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Bottom quick contact phone snippet */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{lang === 'ar' ? 'مكتب صنعاء (دار سلم):' : 'Sana\'a Office:'}</span>
                <a href="tel:+967783339992" className="font-mono text-[#0876C9] font-bold" dir="ltr">
                  +967 783 339 992
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
