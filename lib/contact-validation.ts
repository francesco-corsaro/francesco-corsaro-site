export const limits = { name: 100, contact: 160, message: 2000 };
export function contactType(value: string): 'email' | 'phone' | null {
  const input = value.trim();
  if (/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(input)) return 'email';
  if (/^\+?[\d\s().-]+$/.test(input) && /^\d{7,15}$/.test(input.replace(/\D/g, ''))) return 'phone';
  return null;
}
export function validateContact(data: Record<string, unknown>) {
  const values = { name: '', contact: '', message: '' };
  for (const key of Object.keys(values) as Array<keyof typeof values>) {
    if (typeof data[key] !== 'string') return { error: 'Compila tutti i campi richiesti.' };
    values[key] = data[key].trim();
    if (!values[key] || values[key].length > limits[key]) return { error: 'Controlla la lunghezza dei campi compilati.' };
  }
  if (!contactType(values.contact)) return { error: 'Inserisci un indirizzo email valido oppure un numero di telefono completo.' };
  if (values.message.length < 3) return { error: 'Scrivi un messaggio di almeno tre caratteri.' };
  if (data.privacy !== true) return { error: 'Conferma di aver letto l’informativa privacy.' };
  return { values };
}
