import { projects as seedProjects } from './seed-data.js';

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

function seedFiltered(query) {
  const { slug, category, industry, featured } = query;
  let data = [...seedProjects].sort((a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year || a.id - b.id);
  if (category) data = data.filter((p) => p.category === category);
  if (industry) data = data.filter((p) => p.industry === industry);
  if (featured === 'true') data = data.filter((p) => p.featured);
  if (slug) return data.find((p) => p.slug === slug) || null;
  return data;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      const { slug, category, featured } = req.query;
      const db = await getDb();
      if (db) {
        try {
          let query = db.from('projects').select('*').order('featured', { ascending: false }).order('year', { ascending: false }).order('id', { ascending: true });
          if (slug) query = query.eq('slug', slug);
          if (category) query = query.eq('category', category);
          if (featured === 'true') query = query.eq('featured', true);
          const r = await withTimeout(query);
          if (r.ok && !r.v.error) {
            const data = r.v.data || [];
            if (slug) return res.status(200).json(data.length > 0 ? data[0] : null);
            return res.status(200).json(data);
          }
        } catch { /* fall through to seed */ }
      }
      return res.status(200).json(seedFiltered(req.query));
    }
    if (req.method === 'POST') {
      const { slug, title, client, category, industry, year, tagline, description, image_url, services, games, metrics, featured, timeline } = req.body || {};
      if (!slug || !title || !client) return res.status(400).json({ error: 'slug, title and client are required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('projects').insert({ slug, title, client, category, industry, year, tagline, description, image_url, services: services || [], games: games || [], metrics: metrics || [], featured: !!featured, timeline }).select().single());
          if (r.ok && !r.v.error) return res.status(201).json(r.v.data);
        } catch { /* fall through */ }
      }
      const row = { id: Date.now(), slug, title, client, category, industry, year, tagline, description, image_url, services: services || [], games: games || [], metrics: metrics || [], featured: !!featured, timeline };
      seedProjects.push(row);
      return res.status(201).json(row);
    }
    if (req.method === 'PUT') {
      const { id, ...fields } = req.body || {};
      if (!id) return res.status(400).json({ error: 'id is required' });
      const db = await getDb();
      if (db) {
        try {
          const r = await withTimeout(db.from('projects').update(fields).eq('id', id).select().single());
          if (r.ok && !r.v.error) return res.status(200).json(r.v.data);
        } catch { /* fall through */ }
      }
      const row = seedProjects.find((p) => String(p.id) === String(id));
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
          const r = await withTimeout(db.from('projects').delete().eq('id', id));
          if (r.ok && !r.v.error) return res.status(200).json({ ok: true });
        } catch { /* fall through */ }
      }
      const idx = seedProjects.findIndex((p) => String(p.id) === String(id));
      if (idx >= 0) seedProjects.splice(idx, 1);
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error (projects):', err);
    res.status(500).json({ error: err.message });
  }
}
