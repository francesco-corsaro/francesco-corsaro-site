import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pageMetadata } from '../lib/seo';
import sitemap from '../app/sitemap';
import robots from '../app/robots';
import { isPublicSite, site } from '../lib/site';

test('public sitemap lists only existing, indexable pages with canonical URLs', () => {
  const entries = sitemap();
  if (!isPublicSite) {
    assert.deepEqual(entries, []);
    assert.deepEqual(robots().rules, { userAgent: '*', disallow: '/' });
    return;
  }
  assert.equal(entries.length, 12);
  assert.equal(new Set(entries.map(entry => entry.url)).size, entries.length);
  for (const entry of entries) {
    const url = new URL(entry.url);
    assert.equal(url.origin, site.url);
    assert.ok(!['/privacy', '/cookie-policy', '/articoli'].includes(url.pathname));
    const source = readFileSync(`app${url.pathname === '/' ? '' : url.pathname}/page.tsx`, 'utf8');
    assert.doesNotMatch(source, /noIndex\s*:\s*true/);
    const metadata = pageMetadata({ title: 'Test', description: 'Test', path: url.pathname });
    assert.equal(metadata.alternates?.canonical, entry.url);
    assert.equal((metadata.robots as { index: boolean }).index, true);
  }
  assert.deepEqual(robots().rules, { userAgent: '*', allow: '/', disallow: '/api/' });
  assert.equal(robots().sitemap, `${site.url}/sitemap.xml`);
});

test('homepage includes the professional name and intentional exclusions stay noindex', () => {
  const home = pageMetadata({ title: 'Psicologo e Psicoterapeuta a Catania', description: 'Test', path: '/' });
  assert.deepEqual(home.title, { absolute: 'Psicologo e Psicoterapeuta a Catania | Francesco Corsaro' });
  const excluded = pageMetadata({ title: 'Articoli', description: 'Test', path: '/articoli', noIndex: true });
  assert.equal((excluded.robots as { index: boolean }).index, false);
  for (const path of ['privacy', 'cookie-policy']) {
    assert.match(readFileSync(`app/${path}/layout.tsx`, 'utf8'), /index:\s*false/);
  }
});
