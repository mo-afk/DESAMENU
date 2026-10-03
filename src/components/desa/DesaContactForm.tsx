import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { submitInquiry } from '../../lib/api';

const VENUE_TYPES = ['Fine Dining Restaurant', 'Cafe / Coffee Shop', 'Lounge / Bar', 'Hotel / Hospitality Concept', 'Beach Club / Rooftop', 'Other'];

interface FormState {
  name: string;
  business: string;
  venueType: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL: FormState = { name: '', business: '', venueType: '', email: '', phone: '', message: '' };

const fieldClass =
  'w-full border border-bone/20 bg-transparent px-4 py-3.5 text-sm text-bone placeholder:text-smoke transition-colors focus:border-lime focus:outline-none';
const labelClass = 'font-mono text-[10px] uppercase tracking-[0.25em] text-fog';

export default function DesaContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<number | null>(null);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (form.business.trim().length < 2) e.business = 'Please enter your business name.';
    if (!form.venueType) e.venueType = 'Please choose a venue type.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
    if (form.message.trim().length > 0 && form.message.trim().length < 10) e.message = 'Tell us a little more (10+ characters).';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSending(true);
    setSubmitError(null);

    try {
      const res = await submitInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.business.trim(),
        project_type: `DESA Menu - ${form.venueType}`,
        message: [
          form.message.trim() || 'No menu details provided yet.',
          form.phone.trim() ? `Phone: ${form.phone.trim()}` : null,
          'Source: DESA Menu landing page',
        ]
          .filter(Boolean)
          .join('\n\n'),
      });
      setReference(res.id);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (reference !== null) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border border-lime/50 bg-lime/[0.05] p-10 text-center sm:p-14"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink">
          <Check className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-display text-3xl uppercase sm:text-4xl">Request received.</h3>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-bone/70">
          Thanks {form.name.split(' ')[0]} — our team will get back to you within one business day with a tailored DESA Menu walkthrough for your venue.
        </p>
        <p className="mt-6 inline-block border border-bone/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">
          Reference DESA-{String(reference).padStart(4, '0')}
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              setForm(INITIAL);
              setReference(null);
            }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-bone/70 underline-offset-4 hover:text-lime hover:underline"
          >
            Send another request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="border border-bone/15 bg-coal p-6 sm:p-8 lg:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="desa-name" className={labelClass}>
            Name *
          </label>
          <input
            id="desa-name"
            name="name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            autoComplete="name"
            placeholder="Alex Moreau"
            className={`mt-3 ${fieldClass}`}
          />
          {errors.name && <p className="mt-2 font-mono text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="desa-business" className={labelClass}>
            Business Name *
          </label>
          <input
            id="desa-business"
            name="business"
            value={form.business}
            onChange={(e) => set('business', e.target.value)}
            autoComplete="organization"
            placeholder="La Terrasse"
            className={`mt-3 ${fieldClass}`}
          />
          {errors.business && <p className="mt-2 font-mono text-xs text-red-400">{errors.business}</p>}
        </div>

        <div>
          <label htmlFor="desa-venue" className={labelClass}>
            Venue Type *
          </label>
          <select
            id="desa-venue"
            name="venueType"
            value={form.venueType}
            onChange={(e) => set('venueType', e.target.value)}
            className={`mt-3 ${fieldClass} ${form.venueType ? '' : 'text-smoke'}`}
          >
            <option value="" disabled className="bg-ink text-fog">
              Select a venue type
            </option>
            {VENUE_TYPES.map((type) => (
              <option key={type} value={type} className="bg-ink text-bone">
                {type}
              </option>
            ))}
          </select>
          {errors.venueType && <p className="mt-2 font-mono text-xs text-red-400">{errors.venueType}</p>}
        </div>

        <div>
          <label htmlFor="desa-email" className={labelClass}>
            Email *
          </label>
          <input
            id="desa-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            autoComplete="email"
            placeholder="you@venue.com"
            className={`mt-3 ${fieldClass}`}
          />
          {errors.email && <p className="mt-2 font-mono text-xs text-red-400">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="desa-phone" className={labelClass}>
            Phone <span className="text-smoke">(optional)</span>
          </label>
          <input
            id="desa-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            autoComplete="tel"
            placeholder="+212 6 00 00 00 00"
            className={`mt-3 ${fieldClass}`}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="desa-message" className={labelClass}>
          What would you like to show on your menu?
        </label>
        <textarea
          id="desa-message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Signature dishes, signature cocktails, daily specials, loyalty programme…"
          className={`mt-3 resize-none leading-relaxed ${fieldClass}`}
        />
        {errors.message && <p className="mt-2 font-mono text-xs text-red-400">{errors.message}</p>}
      </div>

      {submitError && <p className="mt-6 border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-300">{submitError}</p>}

      <div className="mt-8 flex flex-col gap-5 border-t border-bone/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">No spam, no obligation — just a tailored walkthrough.</p>
        <button
          type="submit"
          disabled={sending}
          className="group inline-flex items-center justify-center gap-2 bg-lime px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? 'Sending…' : 'Request Demo'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
