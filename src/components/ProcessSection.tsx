import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Language, WorkProcessStep } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ProcessSectionProps {
  currentLang: Language;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].process;

  return (
    <section id="proceso" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
            <span className="text-[#10B981]">03</span>
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

        {/* 5-Step Process Timeline Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {t.steps.map((step: WorkProcessStep, index: number) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-xl border border-[#1E2320] bg-[#0E1110] p-6 transition-colors hover:border-[#10B981]/40 hover:bg-[#121614]"
            >
              <div>
                {/* Step Number with clean editorial style */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-[#10B981]">
                    {step.number}
                  </span>
                  {index < t.steps.length - 1 && (
                    <ArrowRight className="hidden lg:block h-4 w-4 text-neutral-600" />
                  )}
                </div>

                <h3 className="mt-4 text-lg font-bold text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-1 text-xs font-semibold text-neutral-400">
                  {step.subtitle}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="mt-6 border-t border-[#1E2320] pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                  Entregables:
                </span>
                <ul className="space-y-1.5">
                  {step.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-xs text-neutral-300">
                      <CheckCircle2 className="h-3 w-3 shrink-0 text-[#10B981]" />
                      <span className="truncate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
