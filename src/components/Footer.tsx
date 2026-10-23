import React, { useState } from 'react';
import { ArrowUpRight, Shield, Globe } from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onRequestQuote,
}) => {
  const t = TRANSLATIONS[currentLang].footer;
  const nav = TRANSLATIONS[currentLang].nav;
  const services = TRANSLATIONS[currentLang].services.items;

  const [activeLegalModal, setActiveLegalModal] = useState<'terms' | 'privacy' | 'cookies' | null>(
    null
  );

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1E2320] bg-[#070908] text-neutral-400">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <a
              href="#"
              className="flex items-baseline gap-1.5 text-2xl font-black tracking-tight text-white"
            >
              <span className="font-['Plus_Jakarta_Sans'] tracking-[-0.04em]">OUMEX</span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#10B981]" />
            </a>

            <p className="mt-3 text-xs font-semibold text-neutral-200">
              “{t.slogan}”
            </p>

            <p className="mt-3 text-xs text-neutral-400 max-w-sm leading-relaxed">
              {t.brandDesc}
            </p>

            {/* Language Switcher in Footer */}
            <div className="mt-8 flex items-center gap-2 text-xs">
              <Globe className="h-3.5 w-3.5 text-neutral-400" />
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'es' ? 'text-[#10B981] font-bold bg-[#121614]' : 'hover:text-white'
                }`}
              >
                Español (€)
              </button>
              <span className="text-neutral-700">·</span>
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'fr' ? 'text-[#10B981] font-bold bg-[#121614]' : 'hover:text-white'
                }`}
              >
                Français (FCFA)
              </button>
              <span className="text-neutral-700">·</span>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors ${
                  currentLang === 'en' ? 'text-[#10B981] font-bold bg-[#121614]' : 'hover:text-white'
                }`}
              >
                English (€)
              </button>
            </div>
          </div>

          {/* Services Column (4 cols) - Strictly the 7 services */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.servicesCol}
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              {services.map((item) => (
                <li key={item.id}>
                  <a
                    href="#servicios"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('#servicios');
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav & Legal (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {t.companyCol}
            </h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <a
                  href="#proyectos"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#proyectos');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {nav.projects}
                </a>
              </li>
              <li>
                <a
                  href="#soluciones"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#soluciones');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {nav.solutions}
                </a>
              </li>
              <li>
                <a
                  href="#proceso"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#proceso');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {nav.process}
                </a>
              </li>
              <li>
                <a
                  href="#tarifas"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#tarifas');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {nav.pricing}
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#contacto');
                  }}
                  className="hover:text-white transition-colors"
                >
                  {nav.contact}
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <button
                onClick={onRequestQuote}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
              >
                <span>{nav.requestQuote}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-14 border-t border-[#161B18] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-neutral-400">
            © {new Date().getFullYear()} OUMEX. {t.rights}
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors"
            >
              {t.terms}
            </button>
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors"
            >
              {t.privacy}
            </button>
            <button
              onClick={() => setActiveLegalModal('cookies')}
              className="hover:text-white transition-colors"
            >
              {t.cookies}
            </button>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-neutral-400 text-center md:text-left">
          {t.legalNoticeText}
        </p>
      </div>

      {/* Legal Dialog */}
      {activeLegalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
        >
          <div className="relative w-full max-w-lg rounded-xl border border-[#1E2320] bg-[#0E1110] p-6 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
              <Shield className="h-4 w-4" />
              <span>AVISO LEGAL OFICIAL · OUMEX</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-white capitalize">
              {activeLegalModal === 'terms' && t.terms}
              {activeLegalModal === 'privacy' && t.privacy}
              {activeLegalModal === 'cookies' && t.cookies}
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-neutral-300">
              {activeLegalModal === 'terms' &&
                'Los servicios ofrecidos por OUMEX se formalizan mediante contrato de prestación técnica y cronograma acordado. Las tarifas reflejadas en la web son orientativas y sujetas a confirmación según las especificaciones definitivas del proyecto.'}
              {activeLegalModal === 'privacy' &&
                'Los datos transmitidos mediante los formularios de contacto de OUMEX se destinan exclusivamente a la evaluación y preparación de presupuestos comerciales. No se ceden ni comercializan a terceros bajo ningún concepto.'}
              {activeLegalModal === 'cookies' &&
                'Este sitio web utiliza almacenamiento técnico local únicamente para recordar las preferencias de idioma y conservar las solicitudes de prueba del usuario. No se emplean cookies de rastreo publicitario invasivas.'}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="rounded-lg bg-[#121614] border border-[#232B26] px-4 py-2 text-xs font-semibold text-white hover:bg-[#181D1A]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
