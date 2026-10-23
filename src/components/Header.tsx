import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onRequestQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onRequestQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const languages: { code: Language; label: string; currency: string }[] = [
    { code: 'es', label: 'ES', currency: 'EUR' },
    { code: 'fr', label: 'FR', currency: 'FCFA' },
    { code: 'en', label: 'EN', currency: 'EUR' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1E2320] bg-[#090B0A]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark (Strict single-element contract) */}
        <a
          href="#"
          className="group flex items-baseline gap-1.5 text-2xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
          aria-label="OUMEX Home"
        >
          <span className="font-['Plus_Jakarta_Sans'] font-extrabold tracking-[-0.04em]">
            OUMEX
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981] group-hover:scale-125 transition-transform" />
        </a>

        {/* Zone 2: Navigation Links (Clean single-line text links) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a
            href="#servicios"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#servicios');
            }}
            className="transition-colors hover:text-white hover:underline underline-offset-8 decoration-[#10B981] whitespace-nowrap shrink-0"
          >
            {t.nav.services}
          </a>
          <a
            href="#proyectos"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#proyectos');
            }}
            className="transition-colors hover:text-white hover:underline underline-offset-8 decoration-[#10B981] whitespace-nowrap shrink-0"
          >
            {t.nav.projects}
          </a>
          <a
            href="#soluciones"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#soluciones');
            }}
            className="transition-colors hover:text-white hover:underline underline-offset-8 decoration-[#10B981] whitespace-nowrap shrink-0"
          >
            {t.nav.solutions}
          </a>
          <a
            href="#proceso"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#proceso');
            }}
            className="transition-colors hover:text-white hover:underline underline-offset-8 decoration-[#10B981] whitespace-nowrap shrink-0"
          >
            {t.nav.process}
          </a>
          <a
            href="#tarifas"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#tarifas');
            }}
            className="transition-colors hover:text-white hover:underline underline-offset-8 decoration-[#10B981] whitespace-nowrap shrink-0"
          >
            {t.nav.pricing}
          </a>
          <a
            href="#faq"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#faq');
            }}
            className="transition-colors hover:text-white hover:underline underline-offset-8 decoration-[#10B981] whitespace-nowrap shrink-0"
          >
            {t.nav.faq}
          </a>
        </nav>

        {/* Zone 3: Language Selector & Primary CTA Button */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {/* Language Selector */}
          <div
            className="flex items-center gap-1 rounded-lg border border-[#1E2320] bg-[#121514] p-1 text-xs"
            role="group"
            aria-label="Language selector"
          >
            <div className="flex items-center px-1 text-neutral-400">
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            {languages.map((item) => {
              const isActive = currentLang === item.code;
              return (
                <button
                  key={item.code}
                  onClick={() => onLanguageChange(item.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1E2320] text-white text-[#10B981]'
                      : 'text-neutral-400 hover:text-white hover:bg-[#181D1A]'
                  }`}
                  aria-pressed={isActive}
                  title={`${item.label} (${item.currency})`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onRequestQuote}
            className="group inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-4 py-2.5 text-xs font-bold text-neutral-950 transition-all hover:bg-[#0ea572] focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090B0A] whitespace-nowrap shrink-0"
          >
            <span>{t.nav.requestQuote}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile controls: language + hamburger */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Mobile language compact */}
          <div className="flex items-center rounded-md border border-[#1E2320] bg-[#121514] p-0.5 text-xs">
            {languages.map((item) => (
              <button
                key={item.code}
                onClick={() => onLanguageChange(item.code)}
                className={`px-2 py-1 font-semibold rounded ${
                  currentLang === item.code ? 'bg-[#1E2320] text-[#10B981]' : 'text-neutral-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-neutral-300 hover:bg-[#121514] hover:text-white focus-visible:ring-2 focus-visible:ring-[#10B981]"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1E2320] bg-[#0E1110] px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-neutral-200">
            <a
              href="#servicios"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#servicios');
              }}
              className="py-2 hover:text-[#10B981] transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#proyectos"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#proyectos');
              }}
              className="py-2 hover:text-[#10B981] transition-colors"
            >
              {t.nav.projects}
            </a>
            <a
              href="#soluciones"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#soluciones');
              }}
              className="py-2 hover:text-[#10B981] transition-colors"
            >
              {t.nav.solutions}
            </a>
            <a
              href="#proceso"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#proceso');
              }}
              className="py-2 hover:text-[#10B981] transition-colors"
            >
              {t.nav.process}
            </a>
            <a
              href="#tarifas"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#tarifas');
              }}
              className="py-2 hover:text-[#10B981] transition-colors"
            >
              {t.nav.pricing}
            </a>
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#faq');
              }}
              className="py-2 hover:text-[#10B981] transition-colors"
            >
              {t.nav.faq}
            </a>
            <div className="pt-4 border-t border-[#1E2320]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#10B981] py-3 text-sm font-bold text-neutral-950 hover:bg-[#0ea572]"
              >
                <span>{t.nav.requestQuote}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
