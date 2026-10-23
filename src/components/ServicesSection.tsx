import React, { useState } from 'react';
import {
  Globe,
  ShoppingCart,
  Palette,
  Workflow,
  Bot,
  MessageSquare,
  Wrench,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Users2,
} from 'lucide-react';
import { Language, ServiceItem } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ServicesSectionProps {
  currentLang: Language;
  onSelectServiceForQuote: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onSelectServiceForQuote,
}) => {
  const t = TRANSLATIONS[currentLang].services;
  const [selectedServiceId, setSelectedServiceId] = useState<string>(t.items[0].id);

  const activeService = t.items.find((s) => s.id === selectedServiceId) || t.items[0];

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'web-dev':
        return <Globe className="h-5 w-5 text-[#10B981]" />;
      case 'ecommerce':
        return <ShoppingCart className="h-5 w-5 text-[#10B981]" />;
      case 'branding':
        return <Palette className="h-5 w-5 text-[#10B981]" />;
      case 'automation':
        return <Workflow className="h-5 w-5 text-[#10B981]" />;
      case 'ai-solutions':
        return <Bot className="h-5 w-5 text-[#10B981]" />;
      case 'whatsapp-catalogs':
        return <MessageSquare className="h-5 w-5 text-[#10B981]" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5 text-[#10B981]" />;
      default:
        return <Globe className="h-5 w-5 text-[#10B981]" />;
    }
  };

  return (
    <section id="servicios" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
            <span className="text-[#10B981]">01</span>
            <span aria-hidden="true">/</span>
            <span>{t.sectionKicker}</span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            {t.title}
          </h2>

          <p className="mt-4 text-base text-neutral-400 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Master-Detail Interactive Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: 7 Services List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {t.items.map((service: ServiceItem) => {
              const isSelected = service.id === activeService.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`group flex items-start gap-4 rounded-xl border p-4.5 text-left transition-all ${
                    isSelected
                      ? 'border-[#10B981]/50 bg-[#121614] shadow-lg'
                      : 'border-[#1E2320] bg-[#0D100F] hover:border-neutral-700 hover:bg-[#121514]'
                  }`}
                >
                  <div className="mt-0.5 rounded-lg border border-[#1E2320] bg-[#090B0A] p-2 shrink-0">
                    {getServiceIcon(service.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono font-semibold text-neutral-400">
                        {service.categoryNumber}
                      </span>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-[#10B981] flex items-center gap-1">
                          Activo
                        </span>
                      )}
                    </div>

                    <h3 className={`mt-1 text-base font-bold transition-colors ${
                      isSelected ? 'text-white' : 'text-neutral-200 group-hover:text-white'
                    }`}>
                      {service.title}
                    </h3>

                    <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep-Dive Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 rounded-2xl border border-[#1E2320] bg-[#0D100F] p-6 lg:p-8">
              {/* Header of Active Service */}
              <div className="flex items-center justify-between border-b border-[#1E2320] pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
                    <span>ÁREA TÉCNICA {activeService.categoryNumber}</span>
                  </div>
                  <h3 className="mt-1 text-2xl font-extrabold text-white">
                    {activeService.title}
                  </h3>
                </div>

                <div className="rounded-xl border border-[#1E2320] bg-[#121514] p-3">
                  {getServiceIcon(activeService.id)}
                </div>
              </div>

              {/* Tag row - zero-pill discipline (quiet typographic separators) */}
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-400">
                {activeService.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < activeService.tags.length - 1 && (
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* The Business Problem */}
              <div className="mt-6 rounded-xl border border-[#232B26] bg-[#111613] p-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <AlertCircle className="h-4 w-4" />
                  <span>{t.problemLabel}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                  {activeService.problem}
                </p>
              </div>

              {/* Tangible Benefits */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  {t.benefitsLabel}
                </h4>
                <ul className="mt-3 space-y-3">
                  {activeService.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Business Profile */}
              <div className="mt-6 border-t border-[#1E2320] pt-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400">
                  <Users2 className="h-4 w-4 text-[#10B981]" />
                  <span>{t.audienceLabel}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  {activeService.targetAudience}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-[#1E2320] pt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => onSelectServiceForQuote(activeService.id)}
                  className="group inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-xs font-bold text-neutral-950 transition-all hover:bg-[#0ea572]"
                >
                  <span>{t.ctaServiceQuote}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <span className="text-xs text-neutral-400">
                  Evaluación inicial sin coste
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
