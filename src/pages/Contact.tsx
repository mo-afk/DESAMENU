import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import { submitInquiry } from '../lib/api';
import { useI18n } from '../i18n';

interface FormState {
  project_type: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
}

const INITIAL: FormState = { project_type: '', budget: '', timeline: '', name: '', email: '', company: '', message: '' };

export default function Contact() {
  const { t, tl, dict } = useI18n();
  const c = dict.contactPage;
  const PROJECT_TYPES = tl('contactPage.projectTypes');
  const BUDGETS = tl('contactPage.budgets');
  const TIMELINES = tl('contactPage.timelines');
  const STEPS = tl('contactPage.steps');
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<number | null>(null);

  const set = (k: keyof FormState, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (s: number): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0 && !form.project_type) e.project_type = c.errors.projectType;
    if (s === 1) {
      if (!form.budget) e.budget = c.errors.budget;
      if (!form.timeline) e.timeline = c.errors.timeline;
    }
    if (s === 2) {
      if (form.name.trim().length < 2) e.name = c.errors.name;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = c.errors.email;
      if (form.message.trim().length < 20) e.message = c.errors.message;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  useEffect(() => {
    const previous = document.title;
    document.title = t('meta.contact');
    return () => {
      document.title = previous;
    };
  }, [t]);

  const next = () => { if (validate(step)) setStep((s) => Math.min(s + 1, 3)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    const ok0 = validate(0);
    const ok1 = validate(1);
    const ok2 = validate(2);
    if (!ok0 || !ok1 || !ok2) { setStep(!ok0 ? 0 : !ok1 ? 1 : 2); return; }
    setSending(true);
    setSubmitError(null);
    try {
      const res = await submitInquiry({ name: form.name.trim(), email: form.email.trim(), company: form.company.trim(), project_type: form.project_type, budget: form.budget, timeline: form.timeline, message: form.message.trim() });
      setReference(res.id);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : c.errors.generic);
    } finally {
      setSending(false);
    }
  };

  const Option = ({ group, value }: { group: 'project_type' | 'budget' | 'timeline'; value: string }) => {
    const active = form[group] === value;
    return (
      <button type="button" onClick={() => set(group, value)} className={`border px-5 py-4 text-left font-mono text-xs uppercase tracking-[0.15em] transition-all ${active ? 'border-lime bg-lime text-ink' : 'border-bone/20 text-bone/75 hover:border-bone hover:text-bone'}`}>
        <span className="flex items-center justify-between gap-3">{value}{active && <Check className="h-4 w-4" />}</span>
      </button>
    );
  };

  return (
    <div className="pt-[72px]">
      <section className="bg-blueprint border-b border-bone/10">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:py-20">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">{c.index} - {c.eyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="display-page mt-6 break-words font-display uppercase">{dict.contact.title} <span className="font-serif font-medium italic normal-case text-lime">{dict.contact.accent}</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">{c.intro}</motion.p>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {reference !== null ? (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="border border-lime/50 bg-lime/[0.05] p-10 text-center sm:p-16">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink"><Check className="h-8 w-8" /></span>
                <h2 className="mt-6 font-display text-4xl uppercase sm:text-5xl">{c.successTitle}</h2>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-bone/70">{c.successBody.replace('{name}', form.name.split(' ')[0])}</p>
                <p className="mt-6 inline-block border border-bone/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">{c.reference} <span dir="ltr">DESA-{String(reference).padStart(4, '0')}</span></p>
                <div className="mt-8">
                  <button onClick={() => { setForm(INITIAL); setReference(null); setStep(0); }} className="font-mono text-xs uppercase tracking-[0.2em] text-bone/70 underline-offset-4 hover:text-lime hover:underline">{c.sendAnother}</button>
                </div>
              </motion.div>
            ) : (
              <Reveal>
                <div className="border border-bone/15 bg-coal">
                  <div className="grid grid-cols-4 border-b border-bone/10">
                    {STEPS.map((label, i) => (
                      <div key={label} className={`border-t-2 px-2 py-4 text-center sm:px-4 ${i <= step ? 'border-lime' : 'border-transparent'}`}>
                        <p className={`font-mono text-[10px] uppercase tracking-[0.15em] sm:text-[11px] ${i <= step ? 'text-bone' : 'text-smoke'}`}>0{i + 1}</p>
                        <p className={`mt-1 hidden font-mono text-[10px] uppercase tracking-[0.15em] sm:block ${i <= step ? 'text-bone/80' : 'text-smoke'}`}>{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 sm:p-10">
                    <AnimatePresence mode="wait">
                      <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        {step === 0 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">{c.step1Title}</h2>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">{PROJECT_TYPES.map((t) => <Option key={t} group="project_type" value={t} />)}</div>
                            {errors.project_type && <p className="mt-3 font-mono text-xs text-red-400">{errors.project_type}</p>}
                          </div>
                        )}
                        {step === 1 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">{c.step2Title}</h2>
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{c.investmentRange}</p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{BUDGETS.map((b) => <Option key={b} group="budget" value={b} />)}</div>
                            {errors.budget && <p className="mt-3 font-mono text-xs text-red-400">{errors.budget}</p>}
                            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{c.idealKickoff}</p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{TIMELINES.map((t) => <Option key={t} group="timeline" value={t} />)}</div>
                            {errors.timeline && <p className="mt-3 font-mono text-xs text-red-400">{errors.timeline}</p>}
                          </div>
                        )}
                        {step === 2 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">{c.step3Title}</h2>
                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                              <div>
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{c.yourName}</label>
                                <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Alex Moreau" className="mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                                {errors.name && <p className="mt-2 font-mono text-xs text-red-400">{errors.name}</p>}
                              </div>
                              <div>
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{c.emailLabel}</label>
                                <input value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@venue.com" type="email" dir="ltr" className="mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                                {errors.email && <p className="mt-2 font-mono text-xs text-red-400">{errors.email}</p>}
                              </div>
                              <div className="sm:col-span-2">
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{c.venueName}</label>
                                <input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="La Terrasse" className="mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                              </div>
                              <div className="sm:col-span-2">
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{dict.contact.form.messageLabel} *</label>
                                <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={5} placeholder={t('contact.form.messagePlaceholder')} className="mt-2 w-full resize-none border border-bone/20 bg-ink px-4 py-3.5 text-sm leading-relaxed text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                                {errors.message && <p className="mt-2 font-mono text-xs text-red-400">{errors.message}</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {step === 3 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">{c.step4Title}</h2>
                            <dl className="mt-6 space-y-0 border-t border-bone/10">
                              {[[c.rowMenu, form.project_type], [c.rowBudget, form.budget], [c.rowTimeline, form.timeline], [c.rowName, form.name], [c.rowEmail, form.email], [c.rowVenue, form.company || '-']].map(([k, v]) => (
                                <div key={k} className="grid grid-cols-3 gap-4 border-b border-bone/10 py-4">
                                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{k}</dt>
                                  <dd className="col-span-2 text-sm text-bone/85">{v}</dd>
                                </div>
                              ))}
                              <div className="border-b border-bone/10 py-4">
                                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{c.menuNotes}</dt>
                                <dd className="mt-2 text-sm leading-relaxed text-bone/85">{form.message}</dd>
                              </div>
                            </dl>
                            {submitError && <p className="mt-4 border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-300">{submitError}</p>}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-10 flex items-center justify-between border-t border-bone/10 pt-6">
                      <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-bone disabled:opacity-30"><ArrowLeft className="h-4 w-4" /> {c.back}</button>
                      {step < 3 ? (
                        <button onClick={next} className="group inline-flex items-center gap-2 bg-bone px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-lime">{c.next} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></button>
                      ) : (
                        <button onClick={submit} disabled={sending} className="group inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-transform hover:scale-105 disabled:opacity-60">{sending ? c.sending : c.submit} <ArrowUpRight className="h-4 w-4" /></button>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.1}>
              <div className="space-y-px border border-bone/15 bg-bone/15">
                <div className="bg-ink p-6">
                  <Mail className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.newBusiness}</p>
                  <a href="mailto:hello@desamenu.com" className="link-sweep mt-1 inline-block font-display text-lg uppercase">hello@desamenu.com</a>
                </div>
                <div className="bg-ink p-6">
                  <Phone className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{c.sidebar.preferToTalk}</p>
                  <a href="tel:+12125550194" dir="ltr" className="link-sweep mt-1 inline-block font-display text-lg uppercase">+212 6 00 00 00 00</a>
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
                  <p className="mt-1 text-sm text-bone/80">hello@desamenu.com<br />support@desamenu.com</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
