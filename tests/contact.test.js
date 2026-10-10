import { afterEach, test, mock } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

const originalKey = process.env.RESEND_API_KEY;

afterEach(() => {
  if (originalKey === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalKey;
  mock.restoreAll();
});

function request(body, localDev = false, headers = {}) {
  const result = { statusCode: 200, body: null };
  const res = {
    setHeader() { return res; },
    status(code) { result.statusCode = code; return res; },
    json(value) { result.body = value; return res; },
    end() { return res; },
  };
  return handler({ method: 'POST', body, localDev, headers }, res).then(() => result);
}

const validLead = { name: 'Ada Lovelace', email: 'ada@example.org', source: 'Contact form' };

test('missing key in Vite dev logs a validated lead and succeeds without sending', async () => {
  delete process.env.RESEND_API_KEY;
  const log = mock.method(console, 'info', () => {});
  const fetch = mock.method(globalThis, 'fetch', () => { throw new Error('must not send'); });

  const result = await request(validLead, true);
  assert.deepEqual(result, { statusCode: 200, body: { ok: true, id: null, mocked: true } });
  assert.equal(fetch.mock.callCount(), 0);
  assert.equal(log.mock.callCount(), 1);
  assert.match(log.mock.calls[0].arguments[0], /local mock submission \(NOT emailed\)/);
  assert.equal(log.mock.calls[0].arguments[1].email, validLead.email);
});

test('the example placeholder also uses local mock mode', async () => {
  process.env.RESEND_API_KEY = 're_your_key_here';
  mock.method(console, 'info', () => {});
  assert.equal((await request(validLead, true)).body.mocked, true);
});

test('invalid leads remain invalid even in local mock mode', async () => {
  delete process.env.RESEND_API_KEY;
  const log = mock.method(console, 'info', () => {});
  const result = await request({ name: 'A', email: 'not-an-email' }, true);
  assert.equal(result.statusCode, 400);
  assert.equal(log.mock.callCount(), 0);
});

test('production cannot opt in via request headers or body', async () => {
  delete process.env.RESEND_API_KEY;
  const log = mock.method(console, 'info', () => {});
  mock.method(console, 'error', () => {});
  const result = await request({ ...validLead, localDev: true }, false, { 'x-local-dev': 'true' });
  assert.equal(result.statusCode, 503);
  assert.deepEqual(result.body, { error: 'Email delivery is not configured on this server.' });
  assert.equal(log.mock.callCount(), 0);
});

test('a configured key sends through Resend rather than mocking', async () => {
  process.env.RESEND_API_KEY = 're_test_configured';
  const log = mock.method(console, 'info', () => {});
  const fetch = mock.method(globalThis, 'fetch', async (url, options) => {
    assert.match(url, /api\.resend\.com\/emails$/);
    assert.equal(options.headers.get('Authorization'), 'Bearer re_test_configured');
    assert.match(options.body, /Ada Lovelace/);
    return new Response(JSON.stringify({ id: 'email_123' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  });
  const result = await request(validLead, true);
  assert.deepEqual(result, { statusCode: 200, body: { ok: true, id: 'email_123' } });
  assert.equal(fetch.mock.callCount(), 1);
  assert.equal(log.mock.callCount(), 0);
});

test('a configured key does not fall back on provider failure', async () => {
  process.env.RESEND_API_KEY = 're_test_configured';
  mock.method(console, 'error', () => {});
  mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({
    name: 'validation_error', message: 'Invalid API key', statusCode: 401,
  }), { status: 401, headers: { 'content-type': 'application/json' } }));
  const result = await request(validLead, true);
  assert.equal(result.statusCode, 502);
  assert.ok(result.body.error);
  assert.equal(result.body.mocked, undefined);
});
