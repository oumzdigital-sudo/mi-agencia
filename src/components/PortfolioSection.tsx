import React, { useState } from 'react';
import { Layers, X, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import { Language, ProjectItem } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface PortfolioSectionProps {
  currentLang: Language;
  onRequestQuote: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  currentLang,
  onRequestQuote,
}) => {
  const t = TRANSLATIONS[currentLang].projects;
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  return (
    <section id="proyectos" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
              <span className="text-[#10B981]">02</span>
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

          <div className="text-xs text-neutral-400 border border-[#1E2320] bg-[#121514] px-4 py-2.5 rounded-lg shrink-0">
            {t.badgeNotice}
          </div>
        </div>

        {/* 3 Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.items.map((project: ProjectItem) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[#1E2320] bg-[#0E1110] transition-all hover:border-[#10B981]/40 hover:bg-[#121614]"
            >
              <div>
                {/* Visual Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161B18]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1110] via-transparent to-transparent opacity-60" />

                  {/* Concept Badge - explicit label required by brief */}
                  <div className="absolute top-3 left-3 rounded bg-[#090B0A]/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono font-medium text-[#10B981] border border-[#1E2320]">
                    {project.conceptBadge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs font-medium text-neutral-400">
                    {project.category}
                  </div>

                  <h3 className="mt-1 text-xl font-bold text-white group-hover:text-[#10B981] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-400 font-mono">
                    {project.technologies.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.technologies.length - 1 && (
                          <span aria-hidden="true" className="text-neutral-700">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="border-t border-[#1E2320] p-4 bg-[#0B0D0C] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-neutral-300 hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                >
                  <span>{t.viewDetails}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <span className="font-mono text-[11px] text-neutral-400">OUMEX SPEC</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Concept Specification Modal */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#1E2320] bg-[#0E1110] p-6 lg:p-8 shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 rounded-lg p-2 text-neutral-400 hover:bg-[#181D1A] hover:text-white"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
              <span>{activeModalProject.conceptBadge}</span>
              <span aria-hidden="true">·</span>
              <span>{activeModalProject.category}</span>
            </div>

            <h3 id="modal-title" className="mt-2 text-2xl font-bold text-white">
              {activeModalProject.title}
            </h3>

            {/* Image Preview */}
            <div className="mt-4 overflow-hidden rounded-xl border border-[#1E2320]">
              <img
                src={activeModalProject.image}
                alt={activeModalProject.title}
                className="w-full aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              {activeModalProject.description}
            </p>

            {/* Scope / Specifications */}
            <div className="mt-6 border-t border-[#1E2320] pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Alcance y especificaciones técnicas
              </h4>
              <ul className="mt-3 space-y-2">
                {activeModalProject.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#10B981] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack */}
            <div className="mt-5 border-t border-[#1E2320] pt-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Code2 className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Stack empleado: {activeModalProject.technologies.join(' · ')}</span>
              </div>
            </div>

            {/* Modal actions */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#1E2320] pt-5">
              <button
                onClick={() => {
                  setActiveModalProject(null);
                  onRequestQuote();
                }}
                className="rounded-lg bg-[#10B981] px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-[#0ea572]"
              >
                Solicitar proyecto similar
              </button>

              <button
                onClick={() => setActiveModalProject(null)}
                className="rounded-lg border border-[#232B26] px-4 py-2.5 text-xs font-medium text-neutral-300 hover:bg-[#181D1A]"
              >
                {t.closeDetails}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
