import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  MessageCircle, 
  Printer, 
  AlertCircle,
  Ship,
  Plane,
  Truck,
  FileCheck
} from 'lucide-react';
import { Language, QuoteRequest } from '../../types';
import { translations } from '../../i18n/translations';
import { SERVICES_LIST } from '../../data/companyData';
import { AppStore } from '../../services/store';

interface QuoteRequestFormProps {
  lang: Language;
  preSelectedServiceId?: string;
  whatsappNumber: string;
  initialOrigin?: string;
  initialDestination?: string;
  initialShippingType?: 'sea' | 'air';
  initialVolumeCbm?: number;
  initialWeightKg?: number;
  initialNotes?: string;
}

export const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ 
  lang, 
  preSelectedServiceId,
  whatsappNumber,
  initialOrigin,
  initialDestination,
  initialShippingType,
  initialVolumeCbm,
  initialWeightKg,
  initialNotes
}) => {
  const t = translations[lang].quoteForm;
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrowIcon = isRtl ? ArrowRight : ArrowLeft;

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<QuoteRequest | null>(null);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form State
  const [serviceId, setServiceId] = useState<string>(preSelectedServiceId || 'sea-freight');
  const [clientType, setClientType] = useState<QuoteRequest['clientType']>('merchant');
  const [requestType, setRequestType] = useState<QuoteRequest['requestType']>('new_import');

  const [cargoDescription, setCargoDescription] = useState<string>('');
  const [cargoCategory, setCargoCategory] = useState<string>('بضائع عامة / Commercial Goods');
  const [originCountry, setOriginCountry] = useState<string>('الصين (China)');
  const [originCity, setOriginCity] = useState<string>(initialOrigin || 'Guangzhou / Yiwu');
  const [destinationCity, setDestinationCity] = useState<string>(initialDestination || 'صنعاء (Sana\'a)');
  const [shippingType, setShippingType] = useState<QuoteRequest['shippingType']>(initialShippingType || 'sea');
  const [weightKg, setWeightKg] = useState<string>(initialWeightKg ? String(initialWeightKg) : '');
  const [volumeCbm, setVolumeCbm] = useState<string>(initialVolumeCbm ? String(initialVolumeCbm) : '');
  const [packagesCount, setPackagesCount] = useState<string>('');
  const [readyDate, setReadyDate] = useState<string>('');
  const [needsCustomsClearance, setNeedsCustomsClearance] = useState<boolean>(true);
  const [needsDomesticTransport, setNeedsDomesticTransport] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>(initialNotes || '');

  const [clientName, setClientName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [preferredContact, setPreferredContact] = useState<QuoteRequest['preferredContact']>('whatsapp');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(true);

  useEffect(() => {
    if (preSelectedServiceId) setServiceId(preSelectedServiceId);
    if (initialOrigin) setOriginCity(initialOrigin);
    if (initialDestination) setDestinationCity(initialDestination);
    if (initialShippingType) setShippingType(initialShippingType);
    if (initialVolumeCbm) setVolumeCbm(String(initialVolumeCbm));
    if (initialWeightKg) setWeightKg(String(initialWeightKg));
    if (initialNotes) setNotes(initialNotes);
  }, [preSelectedServiceId, initialOrigin, initialDestination, initialShippingType, initialVolumeCbm, initialWeightKg, initialNotes]);

  const selectedServiceObj = SERVICES_LIST.find(s => s.id === serviceId);

  // Step 1 Validation
  const validateStep1 = () => {
    if (!serviceId) {
      setValidationError(t.errorRequired);
      return false;
    }
    setValidationError(null);
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (!cargoDescription.trim() || !originCity.trim() || !destinationCity.trim()) {
      setValidationError(t.errorRequired);
      return false;
    }
    setValidationError(null);
    return true;
  };

  // Step 3 Validation
  const validateStep3 = () => {
    if (!clientName.trim() || !phone.trim()) {
      setValidationError(t.errorRequired);
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    else if (currentStep === 3 && validateStep3()) setCurrentStep(4);
  };

  const handleBack = () => {
    setValidationError(null);
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) {
      setValidationError(lang === 'ar' ? 'يرجى الموافقة على سياسة الخصوصية للمتابعة.' : 'Please agree to the privacy policy to submit.');
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      const newQuote = AppStore.addQuote({
        serviceId,
        serviceName: selectedServiceObj ? (lang === 'ar' ? selectedServiceObj.titleAr : selectedServiceObj.titleEn) : 'الشحن والاستيراد',
        clientType,
        requestType,
        cargoDescription,
        cargoCategory,
        originCountry,
        originCity,
        destinationCity,
        shippingType,
        weightKg: weightKg ? parseFloat(weightKg) : undefined,
        volumeCbm: volumeCbm ? parseFloat(volumeCbm) : undefined,
        packagesCount: packagesCount ? parseInt(packagesCount, 10) : undefined,
        readyDate: readyDate || undefined,
        needsCustomsClearance,
        needsDomesticTransport,
        notes: notes.trim() || undefined,
        clientName,
        companyName: companyName.trim() || undefined,
        phone,
        email: email.trim() || undefined,
        preferredContact,
        preferredLanguage: lang,
      });

      setSubmissionSuccess(newQuote);
    } catch (err) {
      console.error(err);
      setValidationError(lang === 'ar' ? 'حدث خطأ أثناء حفظ الطلب، يرجى المحاولة مرة أخرى أو الاتصال بنا.' : 'An error occurred while saving your request. Please try again or call us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (!submissionSuccess) return;
    navigator.clipboard.writeText(submissionSuccess.referenceNumber);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 3000);
  };

  const handleResetForm = () => {
    setSubmissionSuccess(null);
    setCurrentStep(1);
    setCargoDescription('');
    setWeightKg('');
    setVolumeCbm('');
    setPackagesCount('');
    setNotes('');
    setClientName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
  };

  // If already submitted successfully, display receipt
  if (submissionSuccess) {
    const whatsappMsg = lang === 'ar'
      ? `مرحباً سما كابيتال، قمت بتقديم طلب عرض سعر برقم مرجعي: ${submissionSuccess.referenceNumber} باسم ${submissionSuccess.clientName} لخدمة ${submissionSuccess.serviceName}. أرجو تزويدي بالتفاصيل.`
      : `Hello Sama Capital, I submitted a quote request with reference: ${submissionSuccess.referenceNumber} under name ${submissionSuccess.clientName} for ${submissionSuccess.serviceName}. Please provide rates.`;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-3xl border border-[#E1E9F0] shadow-xl p-6 sm:p-10 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-5 shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-[#0B3158]">
            {t.successTitle}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            {t.successDesc}
          </p>

          {/* Reference Card */}
          <div className="mt-8 p-6 bg-[#F1F6FA] border-2 border-dashed border-[#0876C9]/40 rounded-2xl max-w-md mx-auto">
            <span className="text-xs text-slate-500 uppercase tracking-wider block font-medium">
              {t.successRefMsg}
            </span>
            <span className="text-2xl sm:text-3xl font-mono font-black text-[#0B3158] my-2 block tracking-wider">
              {submissionSuccess.referenceNumber}
            </span>
            <button
              onClick={handleCopyReference}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#E1E9F0] text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRef ? t.copied : t.copyRef}</span>
            </button>
          </div>

          {/* Summary Checklist */}
          <div className="mt-8 text-start max-w-md mx-auto bg-[#F1F6FA] p-5 rounded-2xl border border-[#E1E9F0] text-xs space-y-2">
            <div className="flex justify-between py-1 border-b border-[#E1E9F0]">
              <span className="text-slate-500">{lang === 'ar' ? 'الخدمة:' : 'Service:'}</span>
              <span className="font-semibold text-slate-900">{submissionSuccess.serviceName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E1E9F0]">
              <span className="text-slate-500">{lang === 'ar' ? 'المسار:' : 'Route:'}</span>
              <span className="font-semibold text-slate-900">{submissionSuccess.originCity} ➔ {submissionSuccess.destinationCity}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">{lang === 'ar' ? 'وسيلة التواصل:' : 'Preferred Contact:'}</span>
              <span className="font-semibold text-[#0876C9]">{submissionSuccess.preferredContact} ({submissionSuccess.phone})</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.shareWhatsapp}</span>
            </a>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3.5 bg-white border border-[#E1E9F0] text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'ar' ? 'طباعة / حفظ الإشعار' : 'Print / Save Receipt'}</span>
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-3.5 text-slate-500 hover:text-slate-800 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              {t.newRequestBtn}
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-3xl border border-[#E1E9F0] shadow-xl overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-gradient-to-r from-[#071B33] via-[#0B3158] to-[#0876C9] text-white p-6 sm:p-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#F39A16] uppercase tracking-wider block mb-1">
              {lang === 'ar' ? 'استيراد وشحن وتخليص جمركي' : 'Import, Freight & Customs Clearance'}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {t.title}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="mt-8 grid grid-cols-4 gap-2 text-xs font-semibold">
            {[1, 2, 3, 4].map((stepNum) => {
              const isActive = currentStep === stepNum;
              const isDone = currentStep > stepNum;
              return (
                <div key={stepNum} className="flex flex-col items-center sm:items-start">
                  <div className={`h-1.5 w-full rounded-full mb-2 transition-all ${
                    isDone 
                      ? 'bg-emerald-400' 
                      : isActive 
                      ? 'bg-[#F39A16]' 
                      : 'bg-white/20'
                  }`} />
                  <span className={`hidden sm:inline ${isActive ? 'text-white font-bold' : 'text-slate-400'}`}>
                    {stepNum === 1 && t.step1}
                    {stepNum === 2 && t.step2}
                    {stepNum === 3 && t.step3}
                    {stepNum === 4 && t.step4}
                  </span>
                  <span className="sm:hidden text-[10px] text-slate-300">
                    {stepNum}/4
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {validationError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* STEP 1: SERVICE & CLIENT TYPE */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#0B3158] mb-2.5">
                    {t.serviceLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {SERVICES_LIST.map((srv) => {
                      const isSelected = serviceId === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setServiceId(srv.id)}
                          className={`text-start p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isSelected
                              ? 'border-[#0876C9] bg-white ring-2 ring-[#0876C9]/20 shadow-xs'
                              : 'border-[#E1E9F0] bg-[#F1F6FA] hover:bg-white hover:border-[#0876C9]/40'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                            isSelected ? 'border-[#0876C9] bg-[#0876C9]' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <div>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                              {lang === 'ar' ? srv.titleAr : srv.titleEn}
                            </span>
                            <span className="text-[11px] text-slate-600 line-clamp-2 mt-1 block leading-relaxed">
                              {lang === 'ar' ? srv.shortDescAr : srv.shortDescEn}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.clientTypeLabel}
                    </label>
                    <select
                      value={clientType}
                      onChange={(e) => setClientType(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] text-xs sm:text-sm bg-[#F1F6FA] focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    >
                      <option value="merchant">{t.merchant}</option>
                      <option value="company">{t.company}</option>
                      <option value="individual">{t.individual}</option>
                      <option value="other">{t.other}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.requestTypeLabel}
                    </label>
                    <select
                      value={requestType}
                      onChange={(e) => setRequestType(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] text-xs sm:text-sm bg-[#F1F6FA] focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    >
                      <option value="new_import">{t.reqNew}</option>
                      <option value="in_transit">{t.reqTransit}</option>
                      <option value="customs_only">{t.reqCustoms}</option>
                      <option value="general_inquiry">{t.reqGeneral}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CARGO DETAILS */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.cargoDescLabel}
                  </label>
                  <input
                    type="text"
                    value={cargoDescription}
                    onChange={(e) => setCargoDescription(e.target.value)}
                    placeholder={t.cargoDescPlaceholder}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.originCityLabel}
                    </label>
                    <input
                      type="text"
                      value={originCity}
                      onChange={(e) => setOriginCity(e.target.value)}
                      placeholder={t.originCityPlaceholder}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.destCityLabel}
                    </label>
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      placeholder={t.destCityPlaceholder}
                      required
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Shipping Mode */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.shippingTypeLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setShippingType('sea')}
                      className={`p-3.5 rounded-2xl border text-start flex items-center gap-2.5 cursor-pointer transition-all ${
                        shippingType === 'sea'
                          ? 'border-[#0876C9] bg-white ring-2 ring-[#0876C9]/20 text-[#0876C9] font-bold shadow-xs'
                          : 'border-[#E1E9F0] bg-[#F1F6FA] text-slate-700 hover:bg-white hover:border-[#0876C9]/40'
                      }`}
                    >
                      <Ship className="w-4 h-4 shrink-0 text-[#0876C9]" />
                      <span className="text-xs">{t.seaFreight}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingType('air')}
                      className={`p-3.5 rounded-2xl border text-start flex items-center gap-2.5 cursor-pointer transition-all ${
                        shippingType === 'air'
                          ? 'border-[#0876C9] bg-white ring-2 ring-[#0876C9]/20 text-[#0876C9] font-bold shadow-xs'
                          : 'border-[#E1E9F0] bg-[#F1F6FA] text-slate-700 hover:bg-white hover:border-[#0876C9]/40'
                      }`}
                    >
                      <Plane className="w-4 h-4 shrink-0 text-sky-500" />
                      <span className="text-xs">{t.airFreight}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingType('undecided')}
                      className={`p-3.5 rounded-2xl border text-start flex items-center gap-2.5 cursor-pointer transition-all ${
                        shippingType === 'undecided'
                          ? 'border-[#0876C9] bg-white ring-2 ring-[#0876C9]/20 text-[#0876C9] font-bold shadow-xs'
                          : 'border-[#E1E9F0] bg-[#F1F6FA] text-slate-700 hover:bg-white hover:border-[#0876C9]/40'
                      }`}
                    >
                      <Truck className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span className="text-xs">{t.undecided}</span>
                    </button>
                  </div>
                </div>

                {/* Quantities & Dimensions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {t.weightLabel}
                    </label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {t.volumeLabel}
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={volumeCbm}
                      onChange={(e) => setVolumeCbm(e.target.value)}
                      placeholder="e.g. 4.5"
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">
                      {t.packagesCountLabel}
                    </label>
                    <input
                      type="number"
                      value={packagesCount}
                      onChange={(e) => setPackagesCount(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                {/* Additional services checkboxes */}
                <div className="p-4 rounded-2xl bg-[#F1F6FA] border border-[#E1E9F0] space-y-2.5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-800 select-none">
                    <input
                      type="checkbox"
                      checked={needsCustomsClearance}
                      onChange={(e) => setNeedsCustomsClearance(e.target.checked)}
                      className="w-4 h-4 text-[#0876C9] rounded border-[#E1E9F0] focus:ring-[#0876C9]"
                    />
                    <span className="font-semibold">{t.customsClearanceCheck}</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-800 select-none">
                    <input
                      type="checkbox"
                      checked={needsDomesticTransport}
                      onChange={(e) => setNeedsDomesticTransport(e.target.checked)}
                      className="w-4 h-4 text-[#0876C9] rounded border-[#E1E9F0] focus:ring-[#0876C9]"
                    />
                    <span className="font-semibold">{t.domesticTransportCheck}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    {t.notesLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT INFORMATION */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.fullNameLabel}
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      placeholder={lang === 'ar' ? 'الاسم الثلاثي أو الثنائي' : 'First and Last Name'}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.companyNameLabel}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={lang === 'ar' ? 'اسم المؤسسة أو المحل' : 'Company Name'}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder={t.phonePlaceholder}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-2xl border border-[#E1E9F0] bg-[#F1F6FA] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#0876C9] focus:outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {t.preferredContactLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPreferredContact('whatsapp')}
                      className={`p-3 rounded-2xl border text-center text-xs font-medium cursor-pointer transition-all ${
                        preferredContact === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold shadow-2xs'
                          : 'border-[#E1E9F0] bg-[#F1F6FA] text-slate-700 hover:bg-white'
                      }`}
                    >
                      {t.contactWhatsapp}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreferredContact('phone')}
                      className={`p-3 rounded-2xl border text-center text-xs font-medium cursor-pointer transition-all ${
                        preferredContact === 'phone'
                          ? 'border-[#0876C9] bg-white ring-2 ring-[#0876C9]/20 text-[#0876C9] font-bold shadow-2xs'
                          : 'border-[#E1E9F0] bg-[#F1F6FA] text-slate-700 hover:bg-white'
                      }`}
                    >
                      {t.contactPhone}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreferredContact('email')}
                      className={`p-3 rounded-2xl border text-center text-xs font-medium cursor-pointer transition-all ${
                        preferredContact === 'email'
                          ? 'border-[#0B3158] bg-[#0B3158] text-white font-bold shadow-2xs'
                          : 'border-[#E1E9F0] bg-[#F1F6FA] text-slate-700 hover:bg-white'
                      }`}
                    >
                      {t.contactEmail}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: REVIEW & CONFIRM */}
            {currentStep === 4 && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-[#0B3158]">
                  {lang === 'ar' ? 'مراجعة ملخص بيانات الطلب قبل الإرسال الرسمي' : 'Review Dossier Summary Prior to Official Submission'}
                </h3>

                <div className="bg-[#F1F6FA] rounded-2xl p-6 border border-[#E1E9F0] space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#E1E9F0]">
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'الخدمة المطلوبة:' : 'Service:'}</span>
                      <span className="font-bold text-slate-900">{selectedServiceObj ? (lang === 'ar' ? selectedServiceObj.titleAr : selectedServiceObj.titleEn) : serviceId}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'طريقة الشحن:' : 'Mode:'}</span>
                      <span className="font-bold text-slate-900">{shippingType.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#E1E9F0]">
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'وصف البضاعة:' : 'Cargo Description:'}</span>
                      <span className="font-bold text-slate-900">{cargoDescription}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'المسار:' : 'Route:'}</span>
                      <span className="font-bold text-slate-900">{originCity} ➔ {destinationCity}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pb-3 border-b border-[#E1E9F0]">
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'الوزن التقريبي:' : 'Weight:'}</span>
                      <span className="font-medium text-slate-800">{weightKg ? `${weightKg} kg` : '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'الحجم التقريبي:' : 'Volume:'}</span>
                      <span className="font-medium text-slate-800">{volumeCbm ? `${volumeCbm} CBM` : '-'}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'التخليص والنقل:' : 'Clearance & Trucking:'}</span>
                      <span className="font-medium text-slate-800">
                        {needsCustomsClearance ? (lang === 'ar' ? 'تخليص مطلوب' : 'Clearance Incl.') : ''}
                        {needsDomesticTransport ? (lang === 'ar' ? ' + نقل داخلي' : ' + Haulage') : ''}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'مقدم الطلب:' : 'Client Name:'}</span>
                      <span className="font-bold text-slate-900">{clientName} {companyName ? `(${companyName})` : ''}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">{lang === 'ar' ? 'التواصل:' : 'Contact:'}</span>
                      <span className="font-mono text-[#0876C9] font-bold">{phone} ({preferredContact})</span>
                    </div>
                  </div>
                </div>

                {/* Privacy Consent */}
                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 text-[#0876C9] rounded border-slate-300 focus:ring-[#0876C9]"
                    />
                    <span>{t.privacyConsent}</span>
                  </label>
                </div>
              </div>
            )}

            {/* Modern Stepper Action Controls */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-3 rounded-2xl border-2 border-slate-200 text-slate-700 hover:bg-slate-100 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <BackArrowIcon className="w-4 h-4" />
                  <span>{t.prevBtn}</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#0876C9] to-[#0B3158] hover:from-sky-600 hover:to-blue-900 text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2 cursor-pointer transition-all shadow-lg hover:shadow-sky-500/25 active:scale-95"
                >
                  <span>{t.nextBtn}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-9 py-3.5 bg-gradient-to-r from-emerald-600 to-[#0876C9] hover:from-emerald-500 hover:to-sky-600 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
                >
                  <span>{isSubmitting ? t.submitting : t.submitBtn}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
