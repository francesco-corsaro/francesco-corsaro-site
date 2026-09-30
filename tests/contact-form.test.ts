import { test } from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';

// Exercise the actual form UI; replace only the external challenge and mail API.
test('shows a focused success panel, preserves errors and prevents duplicate clicks', async () => {
  const dom = new JSDOM('<div id="root"></div>', {url:'https://example.com/contatti'});
  const originalFetch = globalThis.fetch;
  const oldKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const globals = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean; React: typeof React };
  Object.assign(globals, {self:dom.window,window:dom.window,document:dom.window.document,HTMLElement:dom.window.HTMLElement,FormData:dom.window.FormData,React,IS_REACT_ACT_ENVIRONMENT:true});
  Object.defineProperty(globals, 'navigator', {value:dom.window.navigator,configurable:true});
  globals.requestAnimationFrame = callback => Number(setTimeout(() => callback(0), 0));
  dom.window.HTMLElement.prototype.scrollIntoView = () => {};
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = 'test-only-sitekey';
  dom.window.turnstile = { render: (_element, options) => { options.callback('test-token'); return 'widget'; }, remove: () => {} };
  const { createRoot } = await import('react-dom/client');
  const { ContactForm } = await import('../components/ContactForm');
  const container = document.getElementById('root')!;
  const root = createRoot(container);
  const flush = () => act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
  let resolveRequest: (response: Response) => void = () => {};
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Promise<Response>(resolve => { resolveRequest = resolve; }); };
  try {
    await act(async () => { root.render(React.createElement(ContactForm)); });
    const script = document.querySelector('script[src*="challenges.cloudflare.com"]');
    assert.ok(script);
    await act(async () => { script.dispatchEvent(new dom.window.Event('load')); });
    const input = (name: string) => container.querySelector(`[name="${name}"]`) as HTMLInputElement;
    input('name').value = 'Test'; input('contact').value = 'test@example.com'; input('message').value = 'Informazioni'; input('privacy').checked = true;
    const form = container.querySelector('form')!;
    await act(async () => { form.dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})); form.dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})); });
    assert.equal(calls, 1);
    assert.equal(form.getAttribute('aria-busy'), 'true');
    await act(async () => { resolveRequest(Response.json({message:'Riprova più tardi'},{status:503})); });
    await flush();
    assert.match(container.textContent!, /Invio non confermato/);
    assert.equal(input('message').value, 'Informazioni');
    assert.equal(document.activeElement?.getAttribute('role'), 'alert');
    await act(async () => { form.dispatchEvent(new dom.window.Event('submit',{bubbles:true,cancelable:true})); });
    await act(async () => { resolveRequest(Response.json({ok:true})); });
    await flush();
    assert.match(container.textContent!, /Messaggio inviato/);
    assert.equal(container.querySelector('form'), null);
    assert.equal(document.activeElement?.getAttribute('aria-labelledby'), 'contact-success-title');
    const again = Array.from(container.querySelectorAll('button')).find(button => button.textContent === 'Scrivi un altro messaggio')!;
    await act(async () => { again.click(); });
    await flush();
    assert.ok(container.querySelector('form'));
    assert.equal(document.activeElement, input('name'));
    assert.equal(input('message').value, '');
  } finally {
    await act(async () => { root.unmount(); });
    globalThis.fetch = originalFetch;
    if (oldKey === undefined) delete process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; else process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = oldKey;
    dom.window.close();
  }
});
