import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Language, FAQItem } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface FAQSectionProps {
  currentLang: Language;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
            <span className="text-[#10B981]">06</span>
            <span aria-hidden="true">/</span>
            <span>{t.sectionKicker}</span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl text-balance">
            {t.title}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="mt-12 space-y-4">
          {t.items.map((item: FAQItem, index: number) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`overflow-hidden rounded-xl border transition-all ${
                  isOpen
                    ? 'border-[#10B981]/50 bg-[#101412]'
                    : 'border-[#1E2320] bg-[#0D100F] hover:border-neutral-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-bold text-white transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#10B981] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-[#1E2320] px-5 pb-5 pt-3">
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
