import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Mail, Send, CheckCircle2, Clock, Building } from 'lucide-react';
import { Language, CompanySettings } from '../../types';
import { translations } from '../../i18n/translations';
import { AppStore } from '../../services/store';

interface ContactSectionProps {
  lang: Language;
  settings: CompanySettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, settings }) => {
  const t = translations[lang].contactSection;
  const isRtl = lang === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setIsSubmitting(true);
    try {
      AppStore.addMessage({
        name,
        phone,
        email: email.trim() || undefined,
        subject: subject.trim() || (lang === 'ar' ? 'استفسار عام' : 'General Inquiry'),
        message,
      });

      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-[#F4F7FA] border-t border-[#E1E9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#0876C9] uppercase tracking-wider block mb-2">
            {lang === 'ar' ? 'التواصل المباشر وخدمة العملاء' : 'Customer Support & Dispatch'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158] tracking-tight">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Official Contact Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Yemen Headquarters Card */}
            <div className="bg-white rounded-3xl border border-[#E1E9F0] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E1E9F0]">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-[#F39A16] border border-amber-200/60 flex items-center justify-center font-bold text-sm shadow-2xs">
                  YE
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B3158]">
                    {t.yemenBranch}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {lang === 'ar' ? 'إدارة العمليات، المستودعات، والتخليص الجمركي' : 'Operations, Warehousing & Customs Clearance'}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#F39A16] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">{t.addressTitle}</span>
                    <span className="text-slate-900 font-semibold">{lang === 'ar' ? settings.addressAr : settings.addressEn}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0876C9] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">{lang === 'ar' ? 'هاتف وواتساب اليمن:' : 'Yemen Phone & WhatsApp:'}</span>
                    <a href={`tel:${settings.phoneYemen}`} className="text-slate-900 font-bold font-mono hover:text-[#0876C9]" dir="ltr">
                      {settings.phoneYemen}
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] flex items-center gap-3">
                  <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">{lang === 'ar' ? 'ساعات استقبال المراجعين:' : 'Visiting Hours:'}</span>
                    <span className="text-slate-800 font-medium">{lang === 'ar' ? settings.workingHoursAr : settings.workingHoursEn}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`tel:${settings.phoneYemen}`}
                  className="flex-1 py-2.5 px-3 text-center rounded-xl bg-gradient-to-r from-[#0876C9] to-[#0B3158] hover:from-sky-600 hover:to-blue-900 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.callNow}</span>
                </a>

                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 text-center rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.whatsappNow}</span>
                </a>
              </div>
            </div>

            {/* China Coordination Desk */}
            <div className="bg-white rounded-3xl border border-[#E1E9F0] p-6 sm:p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E1E9F0]">
                <div className="w-11 h-11 rounded-2xl bg-[#F1F6FA] text-[#0876C9] border border-[#E1E9F0] flex items-center justify-center font-bold text-sm shadow-2xs">
                  CN
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B3158]">
                    {t.chinaDesk}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {lang === 'ar' ? 'تنسيق المصانع، الفحص، وتجميع الشحنات' : 'Supplier Liaison, Auditing & Consolidation'}
                  </span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">{lang === 'ar' ? 'هاتف التنسيق في الصين:' : 'China Liaison Phone:'}</span>
                    <a href={`tel:${settings.phoneChina}`} className="text-slate-900 font-bold font-mono hover:text-[#0876C9]" dir="ltr">
                      {settings.phoneChina}
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] flex items-center gap-3">
                  <Building className="w-4 h-4 text-slate-500 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[11px] font-medium">{lang === 'ar' ? 'نطاق الخدمة في الصين:' : 'Operational Scope in China:'}</span>
                    <span className="text-slate-800 font-medium">Yiwu, Guangzhou, Shenzhen, Ningbo, Shanghai</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`tel:${settings.phoneChina}`}
                  className="w-full py-2.5 px-3 text-center rounded-xl border border-[#E1E9F0] bg-white text-slate-800 hover:bg-slate-50 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0876C9]" />
                  <span>{lang === 'ar' ? 'اتصال بمكتب الصين' : 'Call China Desk'}</span>
                </a>
              </div>
            </div>

            {/* Map location teaser */}
            <div className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] text-xs text-slate-600">
              <span className="font-bold text-[#0B3158] block mb-1">📍 {lang === 'ar' ? 'موقع المكتب الدقيق' : 'Precise Location'}</span>
              <p className="leading-relaxed">{t.mapNote}</p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#E1E9F0] p-6 sm:p-8 shadow-sm">
              
              <h3 className="text-xl font-bold text-[#0B3158] mb-2">
                {t.formTitle}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                {lang === 'ar' 
                  ? 'يرجى تزويدنا بتفاصيل استفسارك وسيتم الرد عليك مباشرة من قبل الموظف المختص.' 
                  : 'Please provide your inquiry details and a freight coordinator will respond directly.'}
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t.sentSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder={lang === 'ar' ? 'الاسم الكريم' : 'Your name'}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+967 783 339 992"
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.subjectLabel}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder={lang === 'ar' ? 'موضوع الاستفسار' : 'Inquiry subject'}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder={lang === 'ar' ? 'اكتب تفاصيل رسالتك أو استفسارك هنا...' : 'Write your message details here...'}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#0876C9] to-[#0B3158] hover:from-sky-600 hover:to-blue-900 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                  >
                    <span>{isSubmitting ? t.sending : t.sendBtn}</span>
                    <Send className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
