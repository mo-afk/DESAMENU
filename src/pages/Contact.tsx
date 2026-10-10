import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Clock, Loader2, Mail, MailCheck, MapPin, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import { submitLead } from '../lib/api';
import { CONTACT } from '../lib/brand';
import { useI18n } from '../i18n';

interface FormState {
  name: string;
  phone: string;
  email: string;
  venue: string;
  message: string;
}

const INITIAL: FormState = { name: '', phone: '', email: '', venue: '', message: '' };

const fieldClass =
  'mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke transition-colors focus:border-lime focus:outline-none';
const labelClass = 'font-mono text-[11px] uppercase tracking-[0.2em] text-fog';
const errorClass = 'mt-2 font-mono text-xs text-red-400';

/**
 * Contact — one short form, one column.
 *
 * It replaced a four-step qualification wizard: budget, kickoff and project
 * type turned a two-minute conversation into a survey, and the phone number —
 * the detail the team actually calls back on — was not collected at all. Name
 * and phone are required; email, establishment and message are optional, so a
 * visitor can send a request in ten seconds.
 *
 * Submission goes to `POST /api/contact`, which emails the lead to the DESA
 * inbox. The visitor stays on the page: a spinner on the button, then an inline
 * confirmation or an inline error.
 */
export default function Contact() {
  const { t, dict } = useI18n();
  const c = dict.contactPage;
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.contact');
    return () => {
      document.title = previous;
    };
  }, [t]);

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSent(false);
    setSubmitError(null);
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = c.errors.name;
    /* Deliberately lenient: any international format, judged on digits. */
    if (form.phone.replace(/\D/g, '').length < 6) e.phone = c.errors.phone;
    /* Optional — but an address that is there has to be usable. */
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = c.errors.email;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending || !validate()) return;

    setSending(true);
    setSubmitError(null);
    setSent(false);

    try {
      await submitLead({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        venue: form.venue.trim() || undefined,
        /* No minimum length and no character cap on the visitor's side. */
        message: form.message.trim() || undefined,
        source: 'Contact page form',
      });
      setForm(INITIAL);
      setSent(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : c.errors.generic);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-20">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{c.index} - {c.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="display-type display-page mt-6 font-display uppercase">{dict.contact.title} <span className="font-serif font-medium italic normal-case text-lime">{dict.contact.accent}</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">{c.intro}</motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* One column, five fields, no steps. */}
          <div className="lg:col-span-8">
            <Reveal>
              <form onSubmit={submit} noValidate className="border border-bone/15 bg-coal p-6 sm:p-10">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>{c.name}</label>
                    <input
                      id="contact-name"
                      name="name"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      autoComplete="name"
                      placeholder="Alex Moreau"
                      className={fieldClass}
                    />
                    {errors.name && <p className={errorClass}>{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className={labelClass}>{c.phone}</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      dir="ltr"
                      value={form.phone}
                      onChange={(e) => set('phone', e.target.value)}
                      autoComplete="tel"
                      placeholder="+212 6 00 00 00 00"
                      className={fieldClass}
                    />
                    {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className={labelClass}>{c.email}</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      dir="ltr"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      autoComplete="email"
                      placeholder="you@venue.com"
                      className={fieldClass}
                    />
                    {errors.email && <p className={errorClass}>{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-venue" className={labelClass}>{c.venue}</label>
                    <input
                      id="contact-venue"
                      name="venue"
                      value={form.venue}
                      onChange={(e) => set('venue', e.target.value)}
                      autoComplete="organization"
                      placeholder="La Terrasse"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className={labelClass}>{c.message}</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder={c.messagePlaceholder}
                      className={`${fieldClass} resize-none leading-relaxed`}
                    />
                  </div>
                </div>

                {sent && (
                  <p role="status" className="mt-8 flex items-center gap-3 border border-lime/40 bg-lime/[0.06] p-4 text-sm leading-relaxed text-bone">
                    <MailCheck className="h-5 w-5 shrink-0 text-lime" aria-hidden />
                    {dict.contact.form.successInline}
                  </p>
                )}

                {submitError && (
                  <p role="alert" className="mt-8 border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-300">
                    {submitError}
                  </p>
                )}

                <div className="mt-8 flex flex-col gap-5 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{c.privacy}</p>
                  <button
                    type="submit"
                    disabled={sending}
                    aria-busy={sending}
                    className="group inline-flex items-center justify-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {sending ? c.sending : c.submit}
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>

          {/* Contact panel — unchanged: email, phone, locations, response time. */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="space-y-px border border-bone/15 bg-bone/15">
                <div className="bg-ink p-6">
                  <Mail className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.newBusiness}</p>
                  <a href={CONTACT.emailHref} dir="ltr" className="link-sweep mt-1 inline-block font-display text-lg uppercase">{CONTACT.email}</a>
                </div>
                <div className="bg-ink p-6">
                  <Phone className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.preferToTalk}</p>
                  <a href={CONTACT.phoneHref} dir="ltr" className="link-sweep mt-1 inline-block font-display text-lg uppercase">{CONTACT.phone}</a>
                </div>
                <div className="bg-ink p-6">
                  <MapPin className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.whereWeOperate}</p>
                  <p className="mt-1 text-sm leading-relaxed text-bone/80">
                    {c.sidebar.locations.split('|').map((line, i) => (
                      <span key={line} className="block">{line}{i === 0 && <br />}</span>
                    ))}
                  </p>
                </div>
                <div className="bg-ink p-6">
                  <Clock className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.responseTime}</p>
                  <p className="mt-1 font-display text-lg uppercase">{c.sidebar.responseValue}</p>
                </div>
                <div className="bg-ink p-6">
                  <Building2 className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.support}</p>
                  <a href={CONTACT.emailHref} dir="ltr" className="link-sweep mt-1 inline-block text-sm text-bone/80 hover:text-bone">{CONTACT.email}</a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
