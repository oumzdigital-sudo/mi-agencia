import React from 'react';
import { ArrowUpRight, ChevronRight, ShieldCheck, Cpu, Code2 } from 'lucide-react';
import { Language } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface HeroProps {
  currentLang: Language;
  onRequestQuote: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onRequestQuote,
  onExploreServices,
}) => {
  const t = TRANSLATIONS[currentLang].hero;

  return (
    <section className="relative overflow-hidden border-b border-[#1E2320] bg-[#090B0A] pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background ambient lighting - subtle, disciplined */}
      <div
        className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-[#10B981]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Unboxed Kicker with quiet typographic separator */}
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
              <span className="text-[#10B981]">OUMEX</span>
              <span aria-hidden="true">·</span>
              <span>{t.kicker}</span>
            </div>

            {/* Dominant Typographic Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-2xl text-balance leading-[1.08]">
              {t.headlineStart}{' '}
              <span className="text-[#10B981]">{t.headlineAccent}</span>
              {t.headlineEnd}
            </h1>

            {/* Official Slogan */}
            <p className="mt-4 text-base font-semibold text-neutral-200 tracking-tight">
              “{t.slogan}”
            </p>

            {/* Concise Value Description */}
            <p className="mt-4 text-base lg:text-lg leading-relaxed text-neutral-400 max-w-xl">
              {t.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onRequestQuote}
                className="group inline-flex items-center gap-2.5 rounded-lg bg-[#10B981] px-6 py-3.5 text-sm font-bold text-neutral-950 transition-all hover:bg-[#0ea572] focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090B0A]"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onExploreServices}
                className="group inline-flex items-center gap-2 rounded-lg border border-[#262E2A] bg-[#121514] px-6 py-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
              >
                <span>{t.ctaSecondary}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Assurance text */}
            <div className="mt-8 flex items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                <span>Presupuesto sin compromiso</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Code2 className="h-4 w-4 text-[#10B981]" />
                <span>Arquitectura propietaria</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-xl border border-[#1E2320] bg-[#121514] shadow-2xl">
              {/* Media image */}
              <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3] lg:aspect-[16/11]">
                <img
                  src="/src/assets/images/oumex_hero_tech_1792787180626.jpg"
                  alt="OUMEX Digital Architecture & High-Tech Infrastructure"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090B0A] via-transparent to-transparent opacity-80" />
              </div>

              {/* Quiet caption bar */}
              <div className="border-t border-[#1E2320] p-4 bg-[#0D100F] flex items-center justify-between text-xs text-neutral-400">
                <span className="truncate max-w-[280px]">{t.heroImageCaption}</span>
                <span className="font-mono text-[#10B981] text-[11px] shrink-0">OUMEX LAB</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Pillar Technical Strip in full-width row below hero split */}
        <div className="mt-16 grid grid-cols-1 divide-y divide-[#1E2320] rounded-xl border border-[#1E2320] bg-[#0E1110] sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
          <div className="p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <Code2 className="h-4 w-4 text-[#10B981]" />
              <span>{t.stats[0].label}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-white tracking-tight">
              {t.stats[0].value}
            </p>
          </div>

          <div className="p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <Cpu className="h-4 w-4 text-[#10B981]" />
              <span>{t.stats[1].label}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-white tracking-tight">
              {t.stats[1].value}
            </p>
          </div>

          <div className="p-6 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span>{t.stats[2].label}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-white tracking-tight">
              {t.stats[2].value}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
