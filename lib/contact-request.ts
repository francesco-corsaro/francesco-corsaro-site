// Bound the stream itself: Content-Length can be missing or dishonest.
export class ContactBodyTooLarge extends Error {}
export async function readContactBody(request: Request, limit = 16_384) {
  if (Number(request.headers.get('content-length')) > limit) throw new ContactBodyTooLarge();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('Missing body');
  const decoder = new TextDecoder('utf-8', { fatal: true });
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > limit) {
        await reader.cancel();
        throw new ContactBodyTooLarge();
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return JSON.parse(text) as unknown;
  } finally {
    reader.releaseLock();
  }
}
