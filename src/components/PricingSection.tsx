import React from 'react';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Language, PricingPlan } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface PricingSectionProps {
  currentLang: Language;
  onSelectPlan: (planName: string, serviceCategory: string) => void;
  onRequestCustomQuote: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  currentLang,
  onSelectPlan,
  onRequestCustomQuote,
}) => {
  const t = TRANSLATIONS[currentLang].pricing;

  // Determine active currency strictly per language
  const isFrench = currentLang === 'fr';

  return (
    <section id="tarifas" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
              <span className="text-[#10B981]">05</span>
              <span aria-hidden="true">/</span>
              <span>{t.sectionKicker}</span>
            </div>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
              {t.title}
            </h2>

            <p className="mt-4 text-xs font-mono text-neutral-400">
              {t.currencyRuleNotice}
            </p>
          </div>

          <div className="rounded-lg border border-[#1E2320] bg-[#121514] px-4 py-2 text-xs text-neutral-300 font-mono">
            {isFrench ? 'Devise active : FCFA (XOF)' : 'Active Currency: EUR (€)'}
          </div>
        </div>

        {/* 4 Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {t.plans.map((plan: PricingPlan) => {
            const displayPrice = isFrench ? plan.priceXOF : plan.priceEUR;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-xl border p-6 transition-all ${
                  plan.highlight
                    ? 'border-[#10B981] bg-[#101412] shadow-xl ring-1 ring-[#10B981]/20'
                    : 'border-[#1E2320] bg-[#0E1110] hover:border-neutral-700 hover:bg-[#121514]'
                }`}
              >
                {/* Popular Badge if highlighted */}
                {plan.badge && (
                  <div className="absolute -top-3 left-6 rounded-md bg-[#10B981] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-950 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price Tag (Strictly localized) */}
                  <div className="mt-6 border-y border-[#1E2320] py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-3xl font-black text-white tracking-tight">
                        {displayPrice}
                      </span>
                      {plan.billingPeriod && (
                        <span className="text-xs font-mono text-neutral-400">
                          {plan.billingPeriod}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-neutral-400 mt-1 block">
                      Tarifa orientativa · Alcance definido
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block mb-3">
                      Incluye:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10B981]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="mt-8 border-t border-[#1E2320] pt-6">
                  <button
                    onClick={() => onSelectPlan(plan.name, plan.id)}
                    className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-bold transition-all ${
                      plan.highlight
                        ? 'bg-[#10B981] text-neutral-950 hover:bg-[#0ea572]'
                        : 'border border-[#262E2A] bg-[#141816] text-white hover:bg-[#1C221F]'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Quote Box for Big Projects */}
        <div className="mt-14 rounded-xl border border-[#1E2320] bg-[#0E1110] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
              <ShieldCheck className="h-4 w-4" />
              <span>PROYECTOS COMPLEJOS O A MEDIDA</span>
            </div>
            <h4 className="mt-2 text-xl font-bold text-white">
              {t.customQuoteTitle}
            </h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              {t.customQuoteDesc}
            </p>
          </div>

          <button
            onClick={onRequestCustomQuote}
            className="rounded-lg border border-[#2D3631] bg-[#121614] px-6 py-3 text-xs font-bold text-neutral-200 hover:border-[#10B981] hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            {t.customQuoteButton}
          </button>
        </div>
      </div>
    </section>
  );
};
