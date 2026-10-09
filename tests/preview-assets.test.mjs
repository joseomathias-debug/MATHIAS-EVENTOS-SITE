import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Run against the retained local preview: node --test tests/preview-assets.test.mjs
const origin = process.env.PREVIEW_ORIGIN ?? 'http://127.0.0.1:3000';

test('Prévia entrega os CSS e JS referenciados pela página de tendas', async () => {
  const page = await fetch(new URL('/tendas', origin));
  assert.equal(page.status, 200);
  const html = await page.text();
  const urls = [...new Set([...html.matchAll(/(?:href|src)="([^"]+\.(?:css|js))"/g)].map((match) => match[1]))];
  assert.ok(urls.some((url) => url.endsWith('.css')));
  assert.ok(urls.some((url) => url.endsWith('.js')));
  for (const url of urls) {
    const response = await fetch(new URL(url, origin));
    assert.equal(response.status, 200, url);
    assert.match(response.headers.get('content-type'), url.endsWith('.css') ? /text\/css/ : /javascript/);
    assert.ok((await response.arrayBuffer()).byteLength > 0, url);
  }
});

test('Prévia entrega os 32 PNGs finais sem alterar seu conteúdo', async () => {
  const manifest = JSON.parse((await readFile(new URL('../public/assets/tendas/finais/manifest.json', import.meta.url), 'utf8')).replace(/^\uFEFF/, ''));
  assert.equal(manifest.length, 32);
  for (const asset of manifest) {
    const response = await fetch(new URL(asset.path, origin));
    assert.equal(response.status, 200, asset.path);
    assert.match(response.headers.get('content-type'), /image\/png/);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256, asset.path);
  }
});

test('Prévia mantém os metadados internos do build fora dos assets públicos', async () => {
  const response = await fetch(new URL('/.vite/manifest.json', origin));
  assert.notEqual(response.status, 200);
});
