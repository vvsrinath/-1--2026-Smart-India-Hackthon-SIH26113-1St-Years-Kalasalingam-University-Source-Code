export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8000';

export interface ChatMeta {
  session_id: string;
  agent: string;
  lang: string;
  emergency: boolean;
}

export interface ChatDone {
  session_id: string;
  agent?: string;
}

export interface ChatStreamOptions {
  sessionId?: string;
  message: string;
  lang?: string;
  role?: string;
  features?: string[];
  onMeta?: (meta: ChatMeta) => void;
  onDelta?: (text: string) => void;
  onDone?: (done: ChatDone) => void;
  signal?: AbortSignal;
}

export function createSessionId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID().replace(/-/g, '')
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
}

export async function getHealth(): Promise<{ status: string; model: string; groq: boolean }> {
  const res = await fetch(`${API_BASE_URL}/api/v1/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}

/**
 * Streams a chat turn over SSE. Resolves when the stream ends.
 * Throws on non-2xx so the UI can surface a friendly error.
 */
export async function streamChat({
  sessionId,
  message,
  lang = 'auto',
  role = 'patient',
  features = [],
  onMeta,
  onDelta,
  onDone,
  signal,
}: ChatStreamOptions): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/v1/chat/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message, lang, role, features }),
    signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => '');
    throw new Error(detail || `Assistant replied with HTTP ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  let streamDone = false;
  while (!streamDone) {
    const { done, value } = await reader.read();
    streamDone = done;
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let boundary = buffer.indexOf('\n\n');
    while (boundary !== -1) {
      const rawEvent = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      boundary = buffer.indexOf('\n\n');

      const eventType = rawEvent.startsWith('event:')
        ? rawEvent.slice(6).trim().split('\n')[0]
        : 'message';
      const dataLine = rawEvent
        .split('\n')
        .find((line) => line.startsWith('data:'));
      if (!dataLine) continue;

      try {
        const data = JSON.parse(dataLine.slice(5).trim());
        if (eventType === 'meta') onMeta?.(data as ChatMeta);
        else if (eventType === 'delta') onDelta?.(data.text ?? '');
        else if (eventType === 'done') onDone?.(data as ChatDone);
      } catch {
        // ignore a malformed event and keep the stream going
      }
    }
  }
}

export async function translate(text: string, to: string): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/api/v1/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, to }),
  });
  if (!res.ok) throw new Error(`Translation failed: ${res.status}`);
  const body = (await res.json()) as { text: string };
  return body.text;
}