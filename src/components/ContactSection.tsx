import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  Trash2,
  Settings,
  ShieldCheck,
  Inbox,
} from 'lucide-react';
import { Language, AgencyContactConfig, InquiryData } from '../types/index.ts';
import { TRANSLATIONS } from '../data/translations.ts';

interface ContactSectionProps {
  currentLang: Language;
  contactConfig: AgencyContactConfig;
  onOpenConfigModal: () => void;
  selectedServicePreload?: string;
  selectedPlanPreload?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  contactConfig,
  onOpenConfigModal,
  selectedServicePreload,
  selectedPlanPreload,
}) => {
  const t = TRANSLATIONS[currentLang].contact;
  const servicesList = TRANSLATIONS[currentLang].services.items;

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceId, setServiceId] = useState(selectedServicePreload || servicesList[0].id);
  const [budgetRange, setBudgetRange] = useState(t.form.budgetRanges[1]);
  const [message, setMessage] = useState(
    selectedPlanPreload ? `Interés en contratar: ${selectedPlanPreload}` : ''
  );

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ id: string; serviceTitle: string } | null>(
    null
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  // Local Inquiries Inbox State
  const [showInbox, setShowInbox] = useState(false);
  const [localInquiries, setLocalInquiries] = useState<InquiryData[]>(() => {
    try {
      const stored = localStorage.getItem('oumex_inquiries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validation
    if (!fullName.trim()) {
      setValidationError('Por favor, indica tu nombre y apellidos.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Por favor, introduce un correo electrónico corporativo válido.');
      return;
    }
    if (!message.trim()) {
      setValidationError('Por favor, incluye una breve descripción de tu necesidad o proyecto.');
      return;
    }

    setIsSubmitting(true);

    const generatedRefId = `OMX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const selectedServiceObj = servicesList.find((s) => s.id === serviceId);
    const serviceTitle = selectedServiceObj ? selectedServiceObj.title : serviceId;

    const newInquiry: InquiryData = {
      id: generatedRefId,
      date: new Date().toISOString(),
      fullName,
      email,
      company,
      serviceId,
      budgetRange,
      message,
      language: currentLang,
    };

    setTimeout(() => {
      try {
        const existing = localStorage.getItem('oumex_inquiries');
        const list: InquiryData[] = existing ? JSON.parse(existing) : [];
        const updated = [newInquiry, ...list];
        localStorage.setItem('oumex_inquiries', JSON.stringify(updated));
        setLocalInquiries(updated);
      } catch (err) {
        console.warn('Could not store inquiry in localStorage:', err);
      }

      setIsSubmitting(false);
      setSubmittedData({ id: generatedRefId, serviceTitle });
    }, 400);
  };

  const handleResetForm = () => {
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setCompany('');
    setMessage('');
  };

  const handleClearInbox = () => {
    localStorage.removeItem('oumex_inquiries');
    setLocalInquiries([]);
  };

  // Build direct WhatsApp message
  const getWhatsAppMessageUrl = () => {
    const rawText = `*Solicitud de Presupuesto OUMEX*\n*Ref:* ${submittedData?.id || 'Nuevo Proyecto'}\n*Nombre:* ${fullName}\n*Empresa:* ${company || 'Particular / No indicada'}\n*Servicio:* ${submittedData?.serviceTitle || serviceId}\n*Presupuesto:* ${budgetRange}\n*Detalles:* ${message}`;
    return `https://wa.me/${contactConfig.phoneWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
      rawText
    )}`;
  };

  return (
    <section id="contacto" className="border-b border-[#1E2320] bg-[#090B0A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-neutral-400">
            <span className="text-[#10B981]">07</span>
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

        {/* 2-Column Contact Grid */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Interactive Form or Success State (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#1E2320] bg-[#0E1110] p-6 lg:p-8">
              {submittedData ? (
                /* Success Confirmation State */
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {t.form.successTitle}
                  </h3>

                  <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    {t.form.successMessage}
                  </p>

                  <div className="mt-6 inline-block rounded-lg border border-[#1E2320] bg-[#121614] px-4 py-2 font-mono text-xs text-[#10B981]">
                    {t.form.referenceCode} <span className="font-bold text-white">{submittedData.id}</span>
                  </div>

                  {/* Immediate WhatsApp Dispatch Option */}
                  <div className="mt-8 rounded-xl border border-[#232E27] bg-[#101713] p-6 text-left">
                    <p className="text-xs text-neutral-300">
                      {t.form.whatsappFallbackText}
                    </p>
                    <a
                      href={getWhatsAppMessageUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-xs font-bold text-neutral-950 hover:bg-[#20ba5a] transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{t.form.whatsappButton}</span>
                    </a>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={handleResetForm}
                      className="text-xs text-neutral-400 hover:text-white underline underline-offset-4"
                    >
                      {t.form.sendAnother}
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Quote Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        {t.form.fullName} <span className="text-[#10B981]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t.form.fullNamePlaceholder}
                        className="mt-1.5 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        {t.form.email} <span className="text-[#10B981]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.form.emailPlaceholder}
                        className="mt-1.5 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300">
                      {t.form.company}
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.form.companyPlaceholder}
                      className="mt-1.5 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        {t.form.serviceLabel}
                      </label>
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3 py-2.5 text-xs text-white focus:border-[#10B981] focus:outline-none"
                      >
                        {servicesList.map((srv) => (
                          <option key={srv.id} value={srv.id} className="bg-[#121614] text-white">
                            {srv.categoryNumber}. {srv.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300">
                        {t.form.budgetLabel}
                      </label>
                      <select
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3 py-2.5 text-xs text-white focus:border-[#10B981] focus:outline-none"
                      >
                        {t.form.budgetRanges.map((range) => (
                          <option key={range} value={range} className="bg-[#121614] text-white">
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300">
                      {t.form.message} <span className="text-[#10B981]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.form.messagePlaceholder}
                      className="mt-1.5 w-full rounded-lg border border-[#232B26] bg-[#121614] px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#10B981] focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {validationError && (
                    <div className="rounded-lg bg-red-950/40 border border-red-800/50 p-3 text-xs text-red-300">
                      {validationError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#10B981] py-3.5 text-xs font-bold text-neutral-950 hover:bg-[#0ea572] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{t.form.submitting}</span>
                      ) : (
                        <>
                          <span>{t.form.submitButton}</span>
                          <Send className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right: Direct Verified Channels & Agency Config Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="rounded-2xl border border-[#1E2320] bg-[#0E1110] p-6 lg:p-8">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {t.directChannels.title}
              </h3>

              <div className="mt-6 space-y-5">
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="rounded-lg border border-[#1E2320] bg-[#121514] p-2.5 shrink-0 text-[#10B981]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-400 block">
                      {t.directChannels.emailLabel}
                    </span>
                    <a
                      href={`mailto:${contactConfig.email}`}
                      className="text-xs font-bold text-white hover:text-[#10B981] transition-colors"
                    >
                      {contactConfig.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="rounded-lg border border-[#1E2320] bg-[#121514] p-2.5 shrink-0 text-[#10B981]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-400 block">
                      {t.directChannels.whatsappLabel}
                    </span>
                    <a
                      href={`https://wa.me/${contactConfig.phoneWhatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-white hover:text-[#10B981] transition-colors"
                    >
                      {contactConfig.whatsappFormatted}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="rounded-lg border border-[#1E2320] bg-[#121514] p-2.5 shrink-0 text-[#10B981]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-400 block">
                      {t.directChannels.locationLabel}
                    </span>
                    <span className="text-xs text-neutral-200">
                      {contactConfig.city}
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="rounded-lg border border-[#1E2320] bg-[#121514] p-2.5 shrink-0 text-[#10B981]">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-400 block">
                      {t.directChannels.hoursLabel}
                    </span>
                    <span className="text-xs text-neutral-200">
                      {contactConfig.operatingHours}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editable Coordinates Notice & Button */}
              <div className="mt-8 border-t border-[#1E2320] pt-6">
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  {t.directChannels.configNotice}
                </p>
                <button
                  type="button"
                  onClick={onOpenConfigModal}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[#2A332E] bg-[#121614] px-3.5 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" />
                  <span>{t.directChannels.configButton}</span>
                </button>
              </div>
            </div>

            {/* Test Inbox Inspector Trigger */}
            <div className="rounded-xl border border-[#1E2320] bg-[#0E1110] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Inbox className="h-4 w-4 text-[#10B981]" />
                <span>Solicitudes locales: {localInquiries.length}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowInbox(!showInbox)}
                className="text-xs text-[#10B981] hover:underline"
              >
                {showInbox ? 'Ocultar buzón' : t.inboxToggle}
              </button>
            </div>
          </div>
        </div>

        {/* Local Inquiries Inbox Drawer/Viewer */}
        {showInbox && (
          <div className="mt-8 rounded-2xl border border-[#1E2320] bg-[#0D100F] p-6 lg:p-8">
            <div className="flex items-center justify-between border-b border-[#1E2320] pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                <h4 className="text-sm font-bold text-white">{t.inboxTitle}</h4>
              </div>
              {localInquiries.length > 0 && (
                <button
                  onClick={handleClearInbox}
                  className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>{t.inboxClear}</span>
                </button>
              )}
            </div>

            {localInquiries.length === 0 ? (
              <p className="py-8 text-center text-xs text-neutral-400">{t.inboxEmpty}</p>
            ) : (
              <div className="mt-4 space-y-3">
                {localInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="rounded-lg border border-[#1E2320] bg-[#111413] p-4 text-xs"
                  >
                    <div className="flex items-center justify-between text-neutral-400 font-mono text-[11px]">
                      <span className="text-[#10B981] font-bold">{inq.id}</span>
                      <span>{new Date(inq.date).toLocaleString()}</span>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <span className="text-neutral-400 block">Cliente:</span>
                        <span className="font-bold text-white">{inq.fullName}</span>
                        {inq.company && <span className="text-neutral-400 block text-[11px]">{inq.company}</span>}
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Email:</span>
                        <a href={`mailto:${inq.email}`} className="text-neutral-200 hover:underline">
                          {inq.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-neutral-400 block">Presupuesto:</span>
                        <span className="text-neutral-200 font-mono">{inq.budgetRange}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-neutral-300 bg-[#0A0C0B] p-2.5 rounded border border-[#1E2320]">
                      {inq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
