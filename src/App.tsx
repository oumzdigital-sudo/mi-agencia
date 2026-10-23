import React, { useState, useEffect } from 'react';
import { Language, AgencyContactConfig } from './types/index.ts';
import { DEFAULT_CONTACT_CONFIG, TRANSLATIONS } from './data/translations.ts';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PortfolioSection } from './components/PortfolioSection.tsx';
import { ProcessSection } from './components/ProcessSection.tsx';
import { BusinessSolutionsSection } from './components/BusinessSolutionsSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { ContactConfigModal } from './components/ContactConfigModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  // Language state with localStorage persistence
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('oumex_lang');
      if (saved === 'es' || saved === 'fr' || saved === 'en') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'es';
  });

  // Agency contact coordinates with localStorage persistence
  const [contactConfig, setContactConfig] = useState<AgencyContactConfig>(() => {
    try {
      const saved = localStorage.getItem('oumex_contact_config');
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT_CONFIG;
    } catch {
      return DEFAULT_CONTACT_CONFIG;
    }
  });

  // Contact form pre-fill states
  const [selectedServicePreload, setSelectedServicePreload] = useState<string | undefined>(
    undefined
  );
  const [selectedPlanPreload, setSelectedPlanPreload] = useState<string | undefined>(undefined);

  // Modal state
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Synchronize document title and html lang attribute whenever language changes
  useEffect(() => {
    document.documentElement.lang = currentLang;

    const titles: Record<Language, string> = {
      es: 'OUMEX — Agencia Digital Internacional | Web, Automatización & Soluciones Tecnológicas',
      fr: 'OUMEX — Agence Digitale Internationale | Web, Automatisation & Solutions Technologiques',
      en: 'OUMEX — International Digital Agency | Web, Automation & Business Solutions',
    };

    document.title = titles[currentLang];
    try {
      localStorage.setItem('oumex_lang', currentLang);
    } catch {
      // storage quota or private mode
    }
  }, [currentLang]);

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang);
  };

  const handleSaveContactConfig = (newConfig: AgencyContactConfig) => {
    setContactConfig(newConfig);
    try {
      localStorage.setItem('oumex_contact_config', JSON.stringify(newConfig));
    } catch (err) {
      console.warn('Could not save contact config:', err);
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contacto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceId: string) => {
    setSelectedServicePreload(serviceId);
    scrollToContact();
  };

  const handleSelectPlan = (planName: string, serviceCategory: string) => {
    setSelectedPlanPreload(planName);
    if (serviceCategory === 'plan-web') setSelectedServicePreload('web-dev');
    else if (serviceCategory === 'plan-business') setSelectedServicePreload('ecommerce');
    else if (serviceCategory === 'plan-automation-ai') setSelectedServicePreload('automation');
    else if (serviceCategory === 'plan-maintenance') setSelectedServicePreload('maintenance');
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#090B0A] text-white selection:bg-[#10B981] selection:text-neutral-950 font-sans">
      {/* Top Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onRequestQuote={scrollToContact}
      />

      <main id="main-content">
        {/* 1. Hero Section */}
        <Hero
          currentLang={currentLang}
          onRequestQuote={scrollToContact}
          onExploreServices={scrollToServices}
        />

        {/* 2. Services Section (Strictly the 7 categories, zero content creation) */}
        <ServicesSection
          currentLang={currentLang}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* 3. Selected Projects / Portfolio (Clearly marked demo concepts) */}
        <PortfolioSection
          currentLang={currentLang}
          onRequestQuote={scrollToContact}
        />

        {/* 4. Business Solutions (Enterprise Web + Automation + AI) */}
        <BusinessSolutionsSection
          currentLang={currentLang}
          onRequestQuote={scrollToContact}
        />

        {/* 5. Work Methodology / Process (5 structured steps) */}
        <ProcessSection currentLang={currentLang} />

        {/* 6. Indicative Pricing (Strict currency localization: EUR for ES/EN, FCFA for FR) */}
        <PricingSection
          currentLang={currentLang}
          onSelectPlan={handleSelectPlan}
          onRequestCustomQuote={scrollToContact}
        />

        {/* 7. Frequently Asked Questions */}
        <FAQSection currentLang={currentLang} />

        {/* 8. Contact & Quote Request Form */}
        <ContactSection
          key={`${currentLang}-${selectedServicePreload}-${selectedPlanPreload}`}
          currentLang={currentLang}
          contactConfig={contactConfig}
          onOpenConfigModal={() => setIsConfigModalOpen(true)}
          selectedServicePreload={selectedServicePreload}
          selectedPlanPreload={selectedPlanPreload}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onRequestQuote={scrollToContact}
      />

      {/* Agency Contact Coordinates Config Modal */}
      <ContactConfigModal
        currentLang={currentLang}
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={contactConfig}
        onSaveConfig={handleSaveContactConfig}
      />
    </div>
  );
}
