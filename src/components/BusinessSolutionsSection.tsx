import React from 'react';
import { Target, Zap, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Language, BusinessSolutionPoint } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface BusinessSolutionsSectionProps {
  currentLang: Language;
  onRequestQuote: () => void;
}

export const BusinessSolutionsSection: React.FC<BusinessSolutionsSectionProps> = ({
  currentLang,
  onRequestQuote,
}) => {
  const t = TRANSLATIONS[currentLang].solutions;

  const getPointIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Target className="h-5 w-5 text-[#10B981]" />;
      case 1:
        return <Zap className="h-5 w-5 text-[#10B981]" />;
      case 2:
        return <Clock className="h-5 w-5 text-[#10B981]" />;
      case 3:
        return <ShieldCheck className="h-5 w-5 text-[#10B981]" />;
      default:
        return <Target className="h-5 w-5 text-[#10B981]" />;
    }
  };

  return (
    <section id="soluciones" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
            <span className="text-[#10B981]">04</span>
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

        {/* 4 Solutions Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {t.points.map((point: BusinessSolutionPoint, idx: number) => (
            <div
              key={point.id}
              className="flex flex-col justify-between rounded-xl border border-[#1E2320] bg-[#0D100F] p-8 transition-colors hover:border-[#10B981]/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="rounded-lg border border-[#1E2320] bg-[#121514] p-3">
                    {getPointIcon(idx)}
                  </div>
                  <span className="font-mono text-xs text-neutral-400">
                    OUMEX OPERATIONAL PILLAR 0{idx + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-white tracking-tight">
                  {point.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                  {point.description}
                </p>
              </div>

              {/* Concrete business impact */}
              <div className="mt-6 rounded-lg border border-[#1A221E] bg-[#101412] p-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981] block">
                  Impacto operativo directo:
                </span>
                <p className="mt-1 text-xs font-medium text-neutral-200">
                  {point.impact}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 rounded-xl border border-[#1E2320] bg-[#0E1110] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white">
              ¿Quieres evaluar qué procesos de tu empresa se pueden digitalizar o automatizar?
            </h4>
            <p className="mt-1 text-xs text-neutral-400">
              Analizamos tus herramientas actuales y te proponemos un esquema de integración paso a paso.
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="group inline-flex items-center gap-2 rounded-lg bg-[#10B981] px-5 py-3 text-xs font-bold text-neutral-950 hover:bg-[#0ea572] whitespace-nowrap shrink-0"
          >
            <span>Solicitar diagnóstico empresarial</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
