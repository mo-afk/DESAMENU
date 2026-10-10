import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadConfigFromFile } from 'vite';

const configFile = fileURLToPath(new URL('../vite.config.ts', import.meta.url));

test('Vite loads server-only env from .env.local and clears it when removed', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'desa-env-'));
  const originalCwd = process.cwd();
  const originalKey = process.env.RESEND_API_KEY;
  const envFile = path.join(dir, '.env');
  const localFile = path.join(dir, '.env.local');
  try {
    process.chdir(dir);
    writeFileSync(envFile, 'RESEND_API_KEY=re_dotenv_test\n');
    writeFileSync(localFile, 'RESEND_API_KEY=re_local_test\n');
    process.env.RESEND_API_KEY = 're_host_test';
    await loadConfigFromFile({ command: 'serve', mode: 'development' }, configFile);
    assert.equal(process.env.RESEND_API_KEY, 're_host_test');

    delete process.env.RESEND_API_KEY;
    await loadConfigFromFile({ command: 'serve', mode: 'development' }, configFile);
    assert.equal(process.env.RESEND_API_KEY, 're_local_test');

    unlinkSync(localFile);
    await loadConfigFromFile({ command: 'serve', mode: 'development' }, configFile);
    assert.equal(process.env.RESEND_API_KEY, 're_dotenv_test');

    unlinkSync(envFile);
    await loadConfigFromFile({ command: 'serve', mode: 'development' }, configFile);
    assert.equal(process.env.RESEND_API_KEY, undefined);
  } finally {
    process.chdir(originalCwd);
    if (originalKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalKey;
    rmSync(dir, { recursive: true, force: true });
  }
});
