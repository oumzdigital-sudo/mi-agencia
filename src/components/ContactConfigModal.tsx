import React, { useState } from 'react';
import { X, Check, RotateCcw, Shield } from 'lucide-react';
import { Language, AgencyContactConfig } from '../types/index.ts';
import { TRANSLATIONS, DEFAULT_CONTACT_CONFIG } from '../data/translations.ts';

interface ContactConfigModalProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
  config: AgencyContactConfig;
  onSaveConfig: (newConfig: AgencyContactConfig) => void;
}

export const ContactConfigModal: React.FC<ContactConfigModalProps> = ({
  currentLang,
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const t = TRANSLATIONS[currentLang].configModal;

  const [formData, setFormData] = useState<AgencyContactConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setFormData({ ...DEFAULT_CONTACT_CONFIG });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="config-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-[#1E2320] bg-[#0E1110] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-2 text-neutral-400 hover:bg-[#181D1A] hover:text-white"
          aria-label="Cerrar modal de configuración"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-[#10B981]">
          <Shield className="h-4 w-4" />
          <span>CONFIGURACIÓN OFICIAL OUMEX</span>
        </div>

        <h3 id="config-modal-title" className="mt-2 text-xl font-bold text-white">
          {t.title}
        </h3>

        <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
          {t.description}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300">
              {t.email}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300">
              {t.phone}
            </label>
            <input
              type="text"
              value={formData.phoneWhatsapp}
              onChange={(e) => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
              required
              placeholder="+22370000000"
              className="mt-1 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300">
              {t.phoneDisplay}
            </label>
            <input
              type="text"
              value={formData.whatsappFormatted}
              onChange={(e) => setFormData({ ...formData, whatsappFormatted: e.target.value })}
              required
              placeholder="+223 70 00 00 00"
              className="mt-1 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300">
              {t.city}
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              className="mt-1 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300">
              {t.hours}
            </label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
              required
              className="mt-1 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none"
            />
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 rounded-lg bg-[#10B981]/10 p-3 text-xs font-bold text-[#10B981] border border-[#10B981]/30">
              <Check className="h-4 w-4" />
              <span>Coordenadas actualizadas con éxito</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#1E2320]">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{t.reset}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#232B26] px-3 py-2 text-xs text-neutral-300 hover:bg-[#181D1A]"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#10B981] px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-[#0ea572]"
              >
                {t.save}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
