"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { VENUE_TYPES } from "@/lib/site";
import { Button } from "../ui/Button";
import { Check, ChevronDown } from "../ui/Icons";

type Status = "idle" | "submitting" | "success";

const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.02] px-4 text-sm tracking-tight text-fg outline-none transition-all duration-300 ease-premium placeholder:text-muted/45 hover:border-white/20 focus:border-brand/45 focus:bg-white/[0.04] focus:shadow-glow-soft";

const labelClass =
  "mb-2.5 block font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted/70";

function Field({
  id,
  label,
  children,
  className,
}: {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");

    /* ------------------------------------------------------------------
       Wire this up to your CRM / email service before launch, e.g.
       await fetch("/api/leads", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget).entries())),
       });
       ------------------------------------------------------------------ */
    await new Promise((resolve) => setTimeout(resolve, 650));

    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-brand/25 bg-gradient-to-b from-brand/[0.06] to-transparent p-8 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-brand/40 bg-brand text-black">
          <Check className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h3 className="mt-6 text-xl font-medium tracking-[-0.025em] text-fg">
          Request received.
        </h3>
        <p className="mt-3 max-w-sm text-[0.875rem] leading-relaxed text-muted">
          Thank you — our team will get back to you within one business day with
          a tailored DESA Menu walkthrough for your venue.
        </p>
        <Button
          type="button"
          variant="secondary"
          size="md"
          className="mt-8"
          withArrow={false}
          onClick={() => setStatus("idle")}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.008] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Alex Moreau"
            className={fieldClass}
          />
        </Field>

        <Field id="business" label="Business Name">
          <input
            id="business"
            name="business"
            type="text"
            required
            autoComplete="organization"
            placeholder="La Terrasse"
            className={fieldClass}
          />
        </Field>

        <Field id="venue-type" label="Venue Type">
          <div className="relative">
            <select
              id="venue-type"
              name="venueType"
              required
              defaultValue=""
              className={`${fieldClass} appearance-none bg-ink pr-11`}
            >
              <option value="" disabled className="bg-ink text-muted">
                Select a venue type
              </option>
              {VENUE_TYPES.map((type) => (
                <option key={type} value={type} className="bg-ink text-fg">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field id="contact-details" label="Phone or Email">
          <input
            id="contact-details"
            name="contact"
            type="text"
            required
            autoComplete="email"
            placeholder="you@venue.com"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field
        id="message"
        label="What would you like to show on your menu?"
        className="mt-5"
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Signature dishes, signature cocktails, daily specials, loyalty programme…"
          className={`${fieldClass} h-auto resize-none py-3.5 leading-relaxed`}
        />
      </Field>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.75rem] leading-relaxed text-muted/70 sm:max-w-[16rem]">
          No spam, no obligation — just a tailored walkthrough of your venue.
        </p>
        <Button
          type="submit"
          size="lg"
          withArrow
          disabled={status === "submitting"}
          className="w-full shrink-0 sm:w-auto"
        >
          {status === "submitting" ? "Sending…" : "Request Demo"}
        </Button>
      </div>
    </form>
  );
}
