import { test, expect, type Page } from '@playwright/test';

async function noOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
}

for (const path of ['/', '/come-lavoro', '/chi-sono', '/psicologo-adhd-catania', '/faq', '/contatti']) {
  test(`layout and navigation ${path}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(path);
    await expect(page.locator('h1')).toBeVisible();
    await noOverflow(page);
    await page.getByRole('button', { name: 'Apri menu' }).click();
    await expect(page.getByRole('navigation', { name: 'Navigazione principale' })).toBeVisible();
    await page.getByRole('button', { name: 'Chiudi menu' }).press('Escape');
    await expect(page.getByRole('button', { name: 'Apri menu' })).toBeFocused();
    await expect(page.getByRole('navigation', { name: 'Navigazione principale' })).toBeHidden();
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await noOverflow(page);
    if (path === '/' || path === '/come-lavoro') {
      await testInfo.attach('large-text', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' });
    }
    expect(errors).toEqual([]);
  });
}

test('diagram stays centered and responds to touch and keyboard', async ({ page }) => {
  await page.goto('/come-lavoro');
  const bounds = await page.locator('.mind-map').boundingBox();
  const core = await page.locator('.mind-core').boundingBox();
  expect(bounds).not.toBeNull(); expect(core).not.toBeNull();
  expect(Math.abs((core!.x + core!.width / 2) - (bounds!.x + bounds!.width / 2))).toBeLessThan(1);
  for (const node of await page.locator('.mind-node').all()) {
    const box = await node.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(bounds!.x - 1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width + 1);
    expect(box!.height).toBeGreaterThanOrEqual(40);
  }
  await page.getByRole('button', { name: 'Pensieri', exact: true }).tap();
  await expect(page.locator('.mind-copy h3')).toHaveText('Pensieri');
  await page.getByRole('button', { name: 'Corpo', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('.mind-copy h3')).toHaveText('Corpo');
});

test('contact options, field focus and retry preserve the submission identity', async ({ page }, testInfo) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Scrivimi', exact: true }).tap();
  await expect(page.locator('#contact-options').getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', 'https://wa.me/393485686702');
  await page.getByRole('link', { name: /Scrivi dal modulo/ }).click();
  await expect(page).toHaveURL(/contatti#modulo-contatto/);
  await expect(page.locator('.contact-widget')).toBeHidden();
  for (const selector of ['input[name="name"]', 'input[name="contact"]', 'textarea']) {
    const input = page.locator(selector);
    await input.focus();
    await expect(input).toBeFocused();
    expect(await input.evaluate(el => parseFloat(getComputedStyle(el).fontSize))).toBeGreaterThanOrEqual(16);
  }
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill('Test mobile');
  await page.getByRole('textbox', { name: 'Email o telefono', exact: true }).fill('mobile@example.com');
  await page.getByRole('textbox', { name: 'Messaggio', exact: true }).fill('Messaggio sintetico di verifica');
  await page.getByRole('checkbox').check();
  const ids: string[] = [];
  await page.route('**/api/contact', async route => {
    ids.push(route.request().postDataJSON().submissionId);
    await route.fulfill({ status: ids.length === 1 ? 504 : 200, contentType: 'application/json', body: JSON.stringify(ids.length === 1 ? { message: 'Invio da verificare. Riprova.' } : { ok: true }) });
  });
  await page.getByRole('button', { name: 'Richiedi un primo colloquio', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Invio da verificare');
  await expect(page.getByRole('textbox', { name: 'Messaggio', exact: true })).toHaveValue('Messaggio sintetico di verifica');
  await page.getByRole('button', { name: 'Richiedi un primo colloquio', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Messaggio inviato');
  expect(ids).toHaveLength(2);
  expect(ids[0]).toMatch(/^[0-9a-f-]{36}$/);
  expect(ids[1]).toBe(ids[0]);
  await expect(page.getByRole('textbox', { name: 'Messaggio', exact: true })).toHaveValue('');
  await noOverflow(page);
  await testInfo.attach('contact-result', { body: await page.screenshot(), contentType: 'image/png' });
});
