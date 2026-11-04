import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, Phone, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, ShipmentRecord } from '../../types';
import { translations } from '../../i18n/translations';
import { AppStore } from '../../services/store';

interface TrackingSectionProps {
  lang: Language;
  onNavigate: (view: string) => void;
  whatsappNumber: string;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ lang, onNavigate, whatsappNumber }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<ShipmentRecord | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');

  const t = translations[lang].trackingSection;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const sampleCodes = ['SAMA-2026-N492', 'SAMA-TRK-78901', 'SAMA-2026-C304'];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const found = AppStore.findShipment(searchQuery);
    setResult(found);
    setSearched(true);
  };

  const handleSampleClick = (code: string) => {
    setSearchQuery(code);
    const found = AppStore.findShipment(code);
    setResult(found);
    setSearched(true);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    AppStore.addMessage({
      name: inquiryName,
      phone: inquiryPhone,
      subject: `استفسار تتبع شحنة: ${searchQuery}`,
      message: `طلب استفسار ومتابعة لحالة شحنة أو معاملة برقم: ${searchQuery}. ملاحظات إضافية: ${inquiryNotes || 'لا توجد'}`
    });

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setInquirySubmitted(false);
    }, 2500);
  };

  return (
    <section id="tracking" className="py-16 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute top-1/2 -translate-y-1/2 start-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full ps-12 pe-4 py-3.5 rounded-2xl border border-slate-300 bg-white text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#0876C9] focus:border-[#0876C9] font-mono shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-gradient-to-r from-[#0876C9] to-[#0B3158] hover:from-sky-600 hover:to-blue-900 text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md hover:shadow-sky-500/25 shrink-0 cursor-pointer active:scale-95"
            >
              {t.searchBtn}
            </button>
          </form>

          {/* Sample quick codes */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="font-medium">{t.sampleCodesPrompt}</span>
            {sampleCodes.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleSampleClick(code)}
                className="font-mono text-[#0876C9] hover:underline bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs cursor-pointer font-bold"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        {searched && (
          <div>
            {result ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Result Header */}
                <div className="bg-[#0B3158] text-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#F39A16] font-bold uppercase tracking-wider block">
                      {t.resultFound}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-mono text-white mt-1">
                      {result.trackingNumber}
                    </h3>
                  </div>

                  <div className="text-xs sm:text-end text-slate-300">
                    <span className="block text-slate-400">{t.lastUpdate}</span>
                    <span className="font-mono text-white">
                      {new Date(result.lastUpdated).toLocaleString(lang === 'ar' ? 'ar-YE' : 'en-US')}
                    </span>
                  </div>
                </div>

                {/* Cargo Details Bar */}
                <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border-b border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-500 block">{t.client}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{result.customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.serviceType}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{result.serviceType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.route}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{result.origin} ➔ {result.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">{t.estArrival}</span>
                    <span className="font-semibold text-emerald-700 mt-0.5 block">{result.estimatedArrival}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="p-6 sm:p-8">
                  <h4 className="text-sm font-bold text-[#0B3158] mb-6">
                    {t.statusTimeline}
                  </h4>

                  <div className="space-y-6 relative before:absolute before:inset-0 before:start-3.5 before:w-0.5 before:bg-slate-200">
                    {result.events.map((ev) => (
                      <div key={ev.id} className="relative flex items-start gap-4">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                          ev.status === 'completed'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : ev.status === 'in_progress'
                            ? 'bg-[#F39A16] text-white shadow-xs'
                            : 'bg-slate-200 text-slate-500'
                        }`}>
                          {ev.status === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>

                        <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                              {lang === 'ar' ? ev.titleAr : ev.titleEn}
                            </h5>
                            <span className="text-[11px] font-mono text-slate-500">
                              {ev.date}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#0876C9] font-medium block mb-1">
                            📍 {lang === 'ar' ? ev.locationAr : ev.locationEn}
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {lang === 'ar' ? ev.detailsAr : ev.detailsEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      {lang === 'ar' ? 'هل لديك أي استفسار حول هذه المعاملة؟' : 'Have any questions regarding this consignment?'}
                    </span>

                    <a
                      href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        lang === 'ar' 
                          ? `استفسار حول الشحنة/المعاملة برقم ${result.trackingNumber}` 
                          : `Inquiry regarding consignment reference ${result.trackingNumber}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.contactOperations}</span>
                    </a>
                  </div>

                </div>

              </div>
            ) : (
              /* No Result State */
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center max-w-xl mx-auto">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0B3158]">
                  {t.noResultTitle}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {t.noResultDesc}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setInquiryModalOpen(true)}
                    className="px-4 py-2.5 bg-[#0876C9] hover:bg-[#0B3158] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {t.inquiryBtn}
                  </button>

                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      lang === 'ar' ? `استفسار عن شحنة برقم: ${searchQuery}` : `Inquiry about consignment: ${searchQuery}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'ar' ? 'استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Direct Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-[#0B3158] mb-1">
              {lang === 'ar' ? 'استفسار مباشر عن شحنة' : 'Direct Consignment Inquiry'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'ar' 
                ? 'سيرد فريق العمليات عليك عبر الهاتف أو واتساب بتفاصيل الشحنة الدقيقة.' 
                : 'Operations desk will review and contact you with shipment details.'}
            </p>

            {inquirySubmitted ? (
              <div className="py-8 text-center text-emerald-600 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <p className="text-xs font-bold">
                  {lang === 'ar' ? 'تم إرسال استفسارك بنجاح وسنتواصل معك قريباً!' : 'Inquiry sent successfully! Our team will reach out.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'رقم الشحنة أو بوليصة الشحن' : 'Tracking / B/L Reference'}
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'الاسم الكريم *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'رقم الهاتف (واتساب) *' : 'Phone / WhatsApp *'}
                  </label>
                  <input
                    type="tel"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    required
                    placeholder="+967 783 339 992"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    {lang === 'ar' ? 'ملاحظات إضافية' : 'Notes'}
                  </label>
                  <textarea
                    rows={2}
                    value={inquiryNotes}
                    onChange={(e) => setInquiryNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setInquiryModalOpen(false)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0876C9] hover:bg-[#0B3158] text-white font-bold rounded-lg"
                  >
                    {lang === 'ar' ? 'إرسال الاستفسار' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
