import { team as seedTeam } from './seed-data.js';

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
          const r = await withTimeout(db.from('team').select('*').order('id', { ascending: true }));
          if (r.ok && !r.v.error) return res.status(200).json(r.v.data || []);
        } catch { /* fall through to seed */ }
      }
      return res.status(200).json([...seedTeam].sort((a, b) => a.id - b.id));
    }
    if (req.method === 'POST') {
      const { name, role, department, bio, initials, years } = req.body || {};
      if (!name || !role) return res.status(400).json({ error: 'name and role are required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('team').insert({ name, role, department, bio, initials, years }).select().single());
          if (r.ok && !r.v.error) return res.status(201).json(r.v.data);
        } catch { /* fall through */ }
      }
      const row = { id: Date.now(), name, role, department, bio, initials, years };
      seedTeam.push(row);
      return res.status(201).json(row);
    }
    if (req.method === 'PUT') {
      const { id, ...fields } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('team').update(fields).eq('id', id).select().single());
          if (r.ok && !r.v.error) return res.status(200).json(r.v.data);
        } catch { /* fall through */ }
      }
      const row = seedTeam.find((t) => String(t.id) === String(id));
      if (!row) return res.status(404).json({ error: 'Not found' });
      Object.assign(row, fields);
      return res.status(200).json(row);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('team').delete().eq('id', id));
          if (r.ok && !r.v.error) return res.status(200).json({ ok: true });
        } catch { /* fall through */ }
      }
      const idx = seedTeam.findIndex((t) => String(t.id) === String(id));
      if (idx >= 0) seedTeam.splice(idx, 1);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (team):', err);
    res.status(500).json({ error: err.message });
  }
}
