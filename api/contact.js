import { Resend } from 'resend';

/**
 * POST /api/contact — delivers a lead to the DESA inbox through Resend.
 *
 * Every lead form on the site (the landing demo request, the four-step
 * /contact qualification form and the footer newsletter) posts here, so a
 * submission reaches the team as an email instead of relying on anyone
 * watching a dashboard. Nothing about the form's UX changes: the caller gets
 * JSON back and stays on the page.
 *
 * Configuration (all optional except the API key):
 *   RESEND_API_KEY  required — without it the route answers 503
 *   LEADS_INBOX     where leads go (default: the official DESA address)
 *   LEADS_FROM      sender identity; `onboarding@resend.dev` only works while
 *                   the account has no verified domain
 */

/** Keep in sync with `CONTACT` in src/lib/brand.ts. */
const DEFAULT_INBOX = 'desacontact.01@gmail.com';
const DEFAULT_FROM = 'DESA Menu Leads <onboarding@resend.dev>';

/** Caps that keep a junk payload from becoming a junk email. */
const LIMITS = { name: 120, email: 200, phone: 60, venue: 200, source: 120, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The only send failure a visitor ever sees. Provider details ("Invalid API
 * key", "Unable to fetch data") are logged server-side instead: they are
 * useless in a form and say more about the stack than anyone needs to know.
 */
const SEND_FAILED = 'We could not send your request just now. Please try again, or write to us directly.';

/* ------------------------------------------------------------- helpers --- */

/** Neutralises anything a visitor typed before it reaches the email body. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Trims, drops empties and caps a field. Returns '' when there is nothing. */
function clean(value, max) {
  const text = typeof value === 'string' ? value.trim() : '';
  return text.length > max ? `${text.slice(0, max)}…` : text;
}

function row(label, value, { dir = 'ltr' } = {}) {
  if (!value) return '';
  return `
        <tr>
          <td style="padding:0 0 18px 0;vertical-align:top;width:150px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#8d8b86;">${escapeHtml(label)}</td>
          <td style="padding:0 0 18px 0;vertical-align:top;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#f2efe9;" dir="${dir}">${value}</td>
        </tr>`;
}

function buildEmail(lead) {
  const message = escapeHtml(lead.message).replace(/\n/g, '<br />') || '<span style="color:#8d8b86;">No message provided.</span>';
  const subject = `New Lead: ${lead.name} - DESA Menu`;
  /* Built only when there is an address — `row()` drops empty values, so a
     lead with just a phone number gets no empty Email row. */
  const emailLink = lead.email
    ? `<a href="mailto:${escapeHtml(lead.email)}" style="color:#d7ff3f;text-decoration:none;">${escapeHtml(lead.email)}</a>`
    : '';
  const phoneLink = lead.phone
    ? `<a href="tel:${escapeHtml(lead.phone.replace(/[^\d+]/g, ''))}" style="color:#d7ff3f;text-decoration:none;">${escapeHtml(lead.phone)}</a>`
    : '';
  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0b;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0b;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#121214;border:1px solid rgba(242,239,233,0.14);">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid rgba(242,239,233,0.14);">
                <p style="margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:#d7ff3f;">DESA Menu &mdash; new lead</p>
                <h1 style="margin:12px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:24px;line-height:1.25;color:#f2efe9;">${escapeHtml(lead.name)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row('Email', emailLink)}
${row('Phone', phoneLink)}
${row('Venue / service', escapeHtml(lead.venue))}
${row('Source', escapeHtml(lead.source))}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 32px 32px;">
                <p style="margin:0 0 10px 0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:#8d8b86;">Message</p>
                <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.65;color:#f2efe9;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid rgba(242,239,233,0.14);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#8d8b86;">
                Received ${escapeHtml(lead.receivedAt)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    'DESA Menu — new lead',
    '',
    `Name:    ${lead.name}`,
    `Email:   ${lead.email}`,
    lead.phone ? `Phone:   ${lead.phone}` : null,
    lead.venue ? `Venue:   ${lead.venue}` : null,
    lead.source ? `Source:  ${lead.source}` : null,
    '',
    'Message:',
    lead.message || 'No message provided.',
    '',
    `Received ${lead.receivedAt}`,
  ]
    .filter(Boolean)
    .join('\n');

  return { subject, html, text };
}

/* --------------------------------------------------------------- route --- */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('api/contact: RESEND_API_KEY is not set');
    return res.status(503).json({ error: 'Email delivery is not configured on this server.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const lead = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    phone: clean(body.phone, LIMITS.phone),
    /* Accepts the naming each form already uses. */
    venue: clean(body.venue ?? body.service ?? body.business ?? body.company, LIMITS.venue),
    source: clean(body.source, LIMITS.source) || 'Website form',
    message: clean(body.message, LIMITS.message),
    receivedAt: new Date().toISOString(),
  };

  if (lead.name.length < 2) return res.status(400).json({ error: 'Please enter your name.' });
  /* Email is optional — the contact form treats the phone number as the
     reliable way back — but an address that is supplied has to be usable, and
     a lead needs at least one of the two. */
  if (lead.email && !EMAIL_RE.test(lead.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (!lead.email && lead.phone.replace(/\D/g, '').length < 6) {
    return res.status(400).json({ error: 'Please leave an email address or a phone number.' });
  }

  const { subject, html, text } = buildEmail(lead);

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.LEADS_FROM || DEFAULT_FROM,
      to: [process.env.LEADS_INBOX || DEFAULT_INBOX],
      /* So a reply from the team goes straight to the lead — when there is an
         address to reply to. */
      replyTo: lead.email || undefined,
      subject,
      html,
      text,
    });
    if (error) {
      console.error('api/contact: Resend rejected the send:', error);
      return res.status(502).json({ error: SEND_FAILED });
    }
    return res.status(200).json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error('api/contact: send failed:', err);
    return res.status(502).json({ error: SEND_FAILED });
  }
}
