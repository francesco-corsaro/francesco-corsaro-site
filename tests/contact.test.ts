import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contactType, validateContact } from '../lib/contact-validation';
import { allowContact } from '../lib/contact-rate-limit';
test('accepts usable email and international phone, rejects malformed contacts', () => {
  assert.equal(contactType('test@example.com'), 'email');
  assert.equal(contactType('+39 348 568 6702'), 'phone');
  for (const value of ['abc', 'a@b', '123', 'test@example.com\nBcc:other@example.com']) assert.equal(contactType(value), null);
});
test('requires consent and rejects oversized messages without truncation', () => {
  const input = { name:'Test', contact:'test@example.com', message:'Informazioni', privacy:true };
  assert.ok(validateContact(input).values);
  assert.ok(validateContact({...input,privacy:false}).error);
  assert.ok(validateContact({...input,message:'a'.repeat(2001)}).error);
});
test('throttles a burst and allows retry after the time window', () => {
  for(let i=0;i<5;i++) assert.equal(allowContact('test-ip',1000),true);
  assert.equal(allowContact('test-ip',1001),false);
  assert.equal(allowContact('test-ip',601001),true);
});
