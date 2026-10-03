import { inquiries as seedInquiries } from './seed-data.js';

const TIMEOUT_MS = 4000;

async function getDb() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
    const mod = await import('./db-client.js');
    return mod.default || null;
  } catch {
    return null;
  }
}

function withTimeout(promise) {
  return Promise.race([
    Promise.resolve(promise).then(
      (v) => ({ ok: true, v }),
      (e) => ({ ok: false, e })
    ),
    new Promise((resolve) => setTimeout(() => resolve({ ok: false, e: new Error('db timeout'), timeout: true }), TIMEOUT_MS)),
  ]);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('inquiries').select('id, name, company, project_type, budget, timeline, status, created_at').order('created_at', { ascending: false }).limit(100));
          if (r.ok && !r.v.error) return res.status(200).json(r.v.data || []);
        } catch { /* fall through */ }
      }
      return res.status(200).json([...seedInquiries].reverse());
    }
    if (req.method === 'POST') {
      const { name, email, company, project_type, budget, timeline, message } = req.body || {};
      if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' });
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) return res.status(400).json({ error: 'Please provide a valid email address' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('inquiries').insert({ name, email, company: company || null, project_type: project_type || 'General', budget: budget || null, timeline: timeline || null, message, status: 'new' }).select().single());
          if (r.ok && !r.v.error) return res.status(201).json(r.v.data);
        } catch { /* fall through */ }
      }
      const row = { id: 1000 + seedInquiries.length + 1, name, email, company: company || null, project_type: project_type || 'General', budget: budget || null, timeline: timeline || null, message, status: 'new', created_at: new Date().toISOString() };
      seedInquiries.push(row);
      return res.status(201).json(row);
    }
    if (req.method === 'PUT') {
      const { id, status } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('inquiries').update({ status: status || 'read' }).eq('id', id).select().single());
          if (r.ok && !r.v.error) return res.status(200).json(r.v.data);
        } catch { /* fall through */ }
      }
      const row = seedInquiries.find((i) => String(i.id) === String(id));
      if (row) row.status = status || 'read';
      return res.status(200).json(row || { ok: true });
    }
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('inquiries').delete().eq('id', id));
          if (r.ok && !r.v.error) return res.status(200).json({ ok: true });
        } catch { /* fall through */ }
      }
      const idx = seedInquiries.findIndex((i) => String(i.id) === String(id));
      if (idx >= 0) seedInquiries.splice(idx, 1);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (inquiries):', err);
    res.status(500).json({ error: err.message });
  }
}
