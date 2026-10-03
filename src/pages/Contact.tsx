import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, Clock, Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '../components/Reveal';
import { submitInquiry } from '../lib/api';

const PROJECT_TYPES = ['Brand Identity', 'Website Design & Build', 'Campaign / Launch', 'Growth Retainer', 'Design Sprint', 'Something else'];
const BUDGETS = ['Under $10k', '$10k - $25k', '$25k - $50k', '$50k - $100k', '$100k+'];
const TIMELINES = ['ASAP', '1 - 3 months', '3 - 6 months', 'Flexible / exploring'];
const STEPS = ['Project', 'Budget & timing', 'Details', 'Review'];

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
    if (s === 0 && !form.project_type) e.project_type = 'Please choose a project type.';
    if (s === 1) {
      if (!form.budget) e.budget = 'Please choose a budget range.';
      if (!form.timeline) e.timeline = 'Please choose a timeline.';
    }
    if (s === 2) {
      if (form.name.trim().length < 2) e.name = 'Please enter your name.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.';
      if (form.message.trim().length < 20) e.message = 'Tell us a little more (20+ characters).';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

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
      setSubmitError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
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
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-mono text-xs uppercase tracking-[0.3em] text-fog">05 - Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-8xl lg:text-[7vw]">Let us make <span className="font-serif normal-case italic font-medium text-lime">noise.</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.25 }} className="mt-6 max-w-2xl text-base leading-relaxed text-bone/70 sm:text-lg">Four steps, two minutes, zero commitment. Tell us what you are building and a partner - not a bot - replies within 24 hours.</motion.p>
        </div>
      </section>
      <section className="mx-auto max-w-[1600px] px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            {reference !== null ? (
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="border border-lime/50 bg-lime/[0.05] p-10 text-center sm:p-16">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime text-ink"><Check className="h-8 w-8" /></span>
                <h2 className="mt-6 font-display text-4xl uppercase sm:text-5xl">Brief received.</h2>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-bone/70">Thanks {form.name.split(' ')[0]} - your project brief is with the team. Expect a personal reply within 24 hours (usually much faster).</p>
                <p className="mt-6 inline-block border border-bone/20 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-fog">Reference DG-{String(reference).padStart(4, '0')}</p>
                <div className="mt-8">
                  <button onClick={() => { setForm(INITIAL); setReference(null); setStep(0); }} className="font-mono text-xs uppercase tracking-[0.2em] text-bone/70 underline-offset-4 hover:text-lime hover:underline">Send another brief</button>
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
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">What are we building?</h2>
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">{PROJECT_TYPES.map((t) => <Option key={t} group="project_type" value={t} />)}</div>
                            {errors.project_type && <p className="mt-3 font-mono text-xs text-red-400">{errors.project_type}</p>}
                          </div>
                        )}
                        {step === 1 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">Budget and timing</h2>
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">Investment range</p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{BUDGETS.map((b) => <Option key={b} group="budget" value={b} />)}</div>
                            {errors.budget && <p className="mt-3 font-mono text-xs text-red-400">{errors.budget}</p>}
                            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">Ideal kickoff</p>
                            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{TIMELINES.map((t) => <Option key={t} group="timeline" value={t} />)}</div>
                            {errors.timeline && <p className="mt-3 font-mono text-xs text-red-400">{errors.timeline}</p>}
                          </div>
                        )}
                        {step === 2 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">The details</h2>
                            <div className="mt-6 grid gap-5 sm:grid-cols-2">
                              <div>
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">Your name *</label>
                                <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ada Lovelace" className="mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                                {errors.name && <p className="mt-2 font-mono text-xs text-red-400">{errors.name}</p>}
                              </div>
                              <div>
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">Email *</label>
                                <input value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="ada@company.com" type="email" className="mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                                {errors.email && <p className="mt-2 font-mono text-xs text-red-400">{errors.email}</p>}
                              </div>
                              <div className="sm:col-span-2">
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">Company / brand</label>
                                <input value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Analytical Engines Inc." className="mt-2 w-full border border-bone/20 bg-ink px-4 py-3.5 text-sm text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                              </div>
                              <div className="sm:col-span-2">
                                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">About the project *</label>
                                <textarea value={form.message} onChange={(e) => set('message', e.target.value)} rows={5} placeholder="Goals, context, links, competitors you admire - anything that helps us think." className="mt-2 w-full resize-none border border-bone/20 bg-ink px-4 py-3.5 text-sm leading-relaxed text-bone placeholder:text-smoke focus:border-lime focus:outline-none" />
                                {errors.message && <p className="mt-2 font-mono text-xs text-red-400">{errors.message}</p>}
                              </div>
                            </div>
                          </div>
                        )}
                        {step === 3 && (
                          <div>
                            <h2 className="font-display text-2xl uppercase sm:text-3xl">Review and send</h2>
                            <dl className="mt-6 space-y-0 border-t border-bone/10">
                              {[['Project', form.project_type], ['Budget', form.budget], ['Timeline', form.timeline], ['Name', form.name], ['Email', form.email], ['Company', form.company || '-']].map(([k, v]) => (
                                <div key={k} className="grid grid-cols-3 gap-4 border-b border-bone/10 py-4">
                                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">{k}</dt>
                                  <dd className="col-span-2 text-sm text-bone/85">{v}</dd>
                                </div>
                              ))}
                              <div className="border-b border-bone/10 py-4">
                                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog">Brief</dt>
                                <dd className="mt-2 text-sm leading-relaxed text-bone/85">{form.message}</dd>
                              </div>
                            </dl>
                            {submitError && <p className="mt-4 border border-red-500/30 bg-red-500/10 p-4 font-mono text-xs text-red-300">{submitError}</p>}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    <div className="mt-10 flex items-center justify-between border-t border-bone/10 pt-6">
                      <button onClick={back} disabled={step === 0} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-bone/60 hover:text-bone disabled:opacity-30"><ArrowLeft className="h-4 w-4" /> Back</button>
                      {step < 3 ? (
                        <button onClick={next} className="group inline-flex items-center gap-2 bg-bone px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:bg-lime">Continue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></button>
                      ) : (
                        <button onClick={submit} disabled={sending} className="group inline-flex items-center gap-2 bg-lime px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-transform hover:scale-105 disabled:opacity-60">{sending ? 'Sending...' : 'Send brief'} <ArrowUpRight className="h-4 w-4" /></button>
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
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">New business</p>
                  <a href="mailto:hello@dg-agency.co" className="link-sweep mt-1 inline-block font-display text-lg uppercase">hello@dg-agency.co</a>
                </div>
                <div className="bg-ink p-6">
                  <Phone className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Prefer to talk?</p>
                  <a href="tel:+12125550194" className="link-sweep mt-1 inline-block font-display text-lg uppercase">+1 (212) 555-0194</a>
                </div>
                <div className="bg-ink p-6">
                  <MapPin className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Studios</p>
                  <p className="mt-1 text-sm leading-relaxed text-bone/80">New York - 77 Greene St, SoHo<br />London - 14 Rivington St<br />Tokyo - 2-11-3 Meguro</p>
                </div>
                <div className="bg-ink p-6">
                  <Clock className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Response time</p>
                  <p className="mt-1 font-display text-lg uppercase">Under 24 hours</p>
                </div>
                <div className="bg-ink p-6">
                  <Building2 className="h-5 w-5 text-lime" strokeWidth={1.5} />
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fog">Press and careers</p>
                  <p className="mt-1 text-sm text-bone/80">press@dg-agency.co<br />talent@dg-agency.co</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
