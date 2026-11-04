import React, { useState, useEffect } from 'react';
import { MessageCircle, Bell } from 'lucide-react';
import { Language, CompanySettings } from './types';
import { AppStore } from './services/store';
import { TopBar } from './components/layout/TopBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { QuickQuoteBar } from './components/sections/QuickQuoteBar';
import { ServicesSection } from './components/sections/ServicesSection';
import { ShippingRoutesMatrix } from './components/sections/ShippingRoutesMatrix';
import { VolumeCalculator } from './components/sections/VolumeCalculator';
import { WhyUsSection } from './components/sections/WhyUsSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { DestinationsSection } from './components/sections/DestinationsSection';
import { TrackingSection } from './components/sections/TrackingSection';
import { FaqSection } from './components/sections/FaqSection';
import { QuoteRequestForm } from './components/forms/QuoteRequestForm';
import { ContactSection } from './components/forms/ContactSection';
import { AboutView, PrivacyPolicyView, TermsOfServiceView } from './components/sections/LegalViews';
import { AdminPortal } from './components/admin/AdminPortal';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  
  // Dynamic Quote Prefill State
  const [quotePrefill, setQuotePrefill] = useState<{
    origin?: string;
    destination?: string;
    mode?: 'sea' | 'air';
    volumeCbm?: number;
    weightKg?: number;
    notes?: string;
  }>({});

  const [settings, setSettings] = useState<CompanySettings>(AppStore.getSettings());

  // Synchronize HTML lang and dir attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    setSelectedServiceForQuote(serviceId);
    handleNavigate('quote');
  };

  // Called from Hero or Corridors Matrix
  const handleQuickRouteSelect = (origin: string, destination: string, mode: string) => {
    setQuotePrefill({
      origin,
      destination,
      mode: mode === 'air' ? 'air' : 'sea',
    });
    setSelectedServiceForQuote(mode === 'air' ? 'air-freight' : 'sea-freight');
    handleNavigate('quote');
  };

  // Called from Volume Calculator
  const handleApplyCalculatedQuote = (volumeCbm: number, weightKg: number, notes: string) => {
    setQuotePrefill({
      volumeCbm,
      weightKg,
      notes,
      mode: 'sea'
    });
    setSelectedServiceForQuote('sea-freight');
    handleNavigate('quote');
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#F4F7FA] text-slate-900 ${isRtl ? 'text-right' : 'text-left'}`}>
      
      {/* Top Bar with Contacts & Language Toggle */}
      {currentView !== 'admin' && (
        <>
          <TopBar 
            lang={lang} 
            onToggleLang={toggleLanguage} 
            settings={settings} 
          />

          {/* Operational Announcement Banner */}
          {settings.isAnnouncementActive && (
            <div className="bg-gradient-to-r from-amber-500/15 via-amber-500/10 to-amber-500/15 border-b border-amber-200/60 py-2 px-4 text-center text-xs text-amber-900 flex items-center justify-center gap-2">
              <Bell className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="font-medium">
                {lang === 'ar' ? settings.announcementAr : settings.announcementEn}
              </span>
            </div>
          )}

          {/* Main Navigation Bar */}
          <Navbar 
            lang={lang} 
            currentView={currentView} 
            onNavigate={handleNavigate} 
          />
        </>
      )}

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-24 lg:pb-0">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <>
            <HeroSection 
              lang={lang} 
              onNavigate={handleNavigate} 
              whatsappNumber={settings.whatsappNumber} 
              onQuickRouteSelect={handleQuickRouteSelect}
            />

            <QuickQuoteBar 
              lang={lang} 
              onNavigate={handleNavigate} 
            />

            {/* Direct Maritime & Air Corridors */}
            <ShippingRoutesMatrix 
              lang={lang} 
              onSelectRouteForQuote={handleQuickRouteSelect}
            />

            {/* Services Bento Grid */}
            <ServicesSection 
              lang={lang} 
              onSelectServiceForQuote={handleSelectServiceForQuote} 
            />

            {/* Commercial Importer Volume & CBM Calculator */}
            <section className="py-16 bg-[#F4F7FA] border-y border-[#E1E9F0]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <VolumeCalculator 
                  lang={lang} 
                  onApplyCalculatedQuote={handleApplyCalculatedQuote}
                />
              </div>
            </section>

            <WhyUsSection 
              lang={lang} 
            />

            <HowItWorksSection 
              lang={lang} 
              onNavigate={handleNavigate} 
            />

            <DestinationsSection 
              lang={lang} 
            />

            <TrackingSection 
              lang={lang} 
              onNavigate={handleNavigate} 
              whatsappNumber={settings.whatsappNumber} 
            />

            <FaqSection 
              lang={lang} 
              onNavigate={handleNavigate} 
              whatsappNumber={settings.whatsappNumber} 
            />

            <ContactSection 
              lang={lang} 
              settings={settings} 
            />
          </>
        )}

        {/* VIEW: ABOUT */}
        {currentView === 'about' && (
          <AboutView 
            lang={lang} 
            onNavigate={handleNavigate} 
            settings={settings} 
          />
        )}

        {/* VIEW: SERVICES */}
        {currentView === 'services' && (
          <div className="py-10 bg-[#EAF2F8] min-h-[85vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
              <span className="text-xs font-bold text-[#0876C9] uppercase tracking-wider block mb-1">
                {lang === 'ar' ? 'سما كابيتال — حلول لوجستية' : 'Sama Capital — Logistics Solutions'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B3158]">
                {lang === 'ar' ? 'دليل الخدمات اللوجستية المعتمدة' : 'Logistics Services Directory'}
              </h1>
            </div>
            <ServicesSection 
              lang={lang} 
              onSelectServiceForQuote={handleSelectServiceForQuote}
              showTitle={false}
            />
          </div>
        )}

        {/* VIEW: CORRIDORS */}
        {currentView === 'corridors' && (
          <div className="py-10 bg-[#F4F7FA] min-h-[85vh]">
            <ShippingRoutesMatrix 
              lang={lang} 
              onSelectRouteForQuote={handleQuickRouteSelect}
            />
          </div>
        )}

        {/* VIEW: CALCULATOR */}
        {currentView === 'calculator' && (
          <div className="py-12 bg-[#EAF2F8] min-h-[85vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <VolumeCalculator 
                lang={lang} 
                onApplyCalculatedQuote={handleApplyCalculatedQuote}
              />
            </div>
          </div>
        )}

        {/* VIEW: HOW IT WORKS */}
        {currentView === 'how-it-works' && (
          <div className="py-10 bg-[#F4F7FA] min-h-[85vh]">
            <HowItWorksSection 
              lang={lang} 
              onNavigate={handleNavigate} 
            />
          </div>
        )}

        {/* VIEW: DESTINATIONS */}
        {currentView === 'destinations' && (
          <div className="py-10 bg-[#EAF2F8] min-h-[85vh]">
            <DestinationsSection 
              lang={lang} 
            />
          </div>
        )}

        {/* VIEW: QUOTE REQUEST FORM */}
        {currentView === 'quote' && (
          <div className="py-10 bg-[#F4F7FA] min-h-[85vh]">
            <QuoteRequestForm 
              lang={lang} 
              preSelectedServiceId={selectedServiceForQuote} 
              whatsappNumber={settings.whatsappNumber} 
              initialOrigin={quotePrefill.origin}
              initialDestination={quotePrefill.destination}
              initialShippingType={quotePrefill.mode}
              initialVolumeCbm={quotePrefill.volumeCbm}
              initialWeightKg={quotePrefill.weightKg}
              initialNotes={quotePrefill.notes}
            />
          </div>
        )}

        {/* VIEW: TRACKING */}
        {currentView === 'track' && (
          <div className="py-10 bg-[#F4F7FA] min-h-[85vh]">
            <TrackingSection 
              lang={lang} 
              onNavigate={handleNavigate} 
              whatsappNumber={settings.whatsappNumber} 
            />
          </div>
        )}

        {/* VIEW: FAQ */}
        {currentView === 'faq' && (
          <div className="py-6 bg-[#EAF2F8] min-h-[85vh]">
            <FaqSection 
              lang={lang} 
              onNavigate={handleNavigate} 
              whatsappNumber={settings.whatsappNumber} 
            />
          </div>
        )}

        {/* VIEW: CONTACT */}
        {currentView === 'contact' && (
          <div className="py-6 bg-[#F4F7FA] min-h-[85vh]">
            <ContactSection 
              lang={lang} 
              settings={settings} 
            />
          </div>
        )}

        {/* VIEW: PRIVACY */}
        {currentView === 'privacy' && (
          <div className="py-10 bg-[#F4F7FA] min-h-[85vh]">
            <PrivacyPolicyView lang={lang} />
          </div>
        )}

        {/* VIEW: TERMS */}
        {currentView === 'terms' && (
          <div className="py-10 bg-[#F4F7FA] min-h-[85vh]">
            <TermsOfServiceView lang={lang} />
          </div>
        )}

        {/* VIEW: ADMIN PORTAL */}
        {currentView === 'admin' && (
          <AdminPortal 
            lang={lang} 
            onNavigateHome={() => handleNavigate('home')} 
            settings={settings}
            onUpdateSettings={(newSettings) => setSettings(newSettings)}
          />
        )}

      </main>

      {/* Floating WhatsApp Quick Action Button (Public Views Only, adjusted above mobile bottom dock) */}
      {currentView !== 'admin' && (
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
            lang === 'ar' ? 'السلام عليكم سما كابيتال، أود الاستفسار عن خدمات الشحن' : 'Hello Sama Capital, I would like to inquire about freight services'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 lg:bottom-6 end-5 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-3 sm:p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label="Direct WhatsApp Contact"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pe-1">
            {lang === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp'}
          </span>
        </a>
      )}

      {/* Mobile Floating App-Style Navigation Dock */}
      {currentView !== 'admin' && (
        <MobileBottomNav 
          lang={lang} 
          currentView={currentView} 
          onNavigate={handleNavigate} 
        />
      )}

      {/* Footer */}
      {currentView !== 'admin' && (
        <Footer 
          lang={lang} 
          onNavigate={handleNavigate} 
          settings={settings} 
        />
      )}

    </div>
  );
}
