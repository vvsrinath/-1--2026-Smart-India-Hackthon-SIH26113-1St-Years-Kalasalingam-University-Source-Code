import { useEffect, useRef, useState } from 'react';
import { BotIcon, RotateCcwIcon, SendIcon, SparklesIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import { createSessionId, streamChat, API_BASE_URL } from '../../api/backend';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  emergency?: boolean;
  agent?: string;
}

interface ChatPanelProps {
  variant?: 'widget' | 'page';
}

const FEATURES = [
  'appointments',
  'records',
  'referrals',
  'medicines',
  'find-healthcare',
  'consult-online',
];

export function ChatPanel({ variant = 'page' }: ChatPanelProps) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState<null | boolean>(null);
  const sessionIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE_URL}/api/v1/health`)
      .then((res) => res.json())
      .then((body) => !cancelled && setReady(body.groq === true))
      .catch(() => !cancelled && setReady(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function resetConversation() {
    sessionIdRef.current = null;
    setMessages([]);
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || busy) return;

    const sessionId = sessionIdRef.current ?? createSessionId();
    sessionIdRef.current = sessionId;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setBusy(true);

    setMessages((prev) => [...prev, { role: 'assistant', content: '', agent: 'Swasthya Mitra' }]);

    let emergency = false;
    try {
      await streamChat({
        sessionId,
        message: text,
        lang: 'auto',
        role: 'patient',
        features: FEATURES,
        onMeta: (meta) => {
          emergency = meta.emergency;
        },
        onDelta: (chunk) => {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === 'assistant') {
              next[next.length - 1] = {
                ...last,
                content: last.content + chunk,
                emergency: emergency || last.emergency,
              };
            }
            return next;
          });
        },
      });
    } catch (err) {
      const detail =
        err instanceof Error && err.message.includes('GROQ_API_KEY')
          ? t('chat.backendNotConfigured')
          : t('chat.error');
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last && last.role === 'assistant' && !last.content) {
          next[next.length - 1] = { ...last, content: detail };
        } else if (last && last.role === 'assistant') {
          next[next.length - 1] = { ...last, content: `${last.content}\n\n${detail}` };
        }
        return next;
      });
    } finally {
      setBusy(false);
    }
  }

  const isPage = variant === 'page';

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card',
        isPage ? 'h-[calc(100dvh-7.5rem)] md:h-[calc(100dvh-6.5rem)]' : 'h-[min(68vh,520px)]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-line bg-brand-tint px-3 py-2.5 sm:px-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-brand text-white">
            <BotIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-navy">{t('chat.title')}</p>
            <p className="flex items-center gap-1 text-2xs text-ink-500">
              <SparklesIcon className="h-3 w-3" />
              {t('chat.subtitle')}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={resetConversation}
          aria-label={t('chat.reset')}
          title={t('chat.reset')}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] text-ink-500 transition-colors duration-150 ease-out hover:bg-brand-tint2 hover:text-brand"
        >
          <RotateCcwIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Connection state */}
      {ready === false && (
        <p className="border-b border-warn-tint bg-warn-tint px-3 py-1.5 text-2xs text-warn">
          {t('chat.backendOffline')}
        </p>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-card bg-brand-tint text-brand">
              <SparklesIcon className="h-6 w-6" />
            </span>
            <p className="text-sm font-semibold text-navy">{t('chat.emptyTitle')}</p>
            <p className="max-w-[30ch] text-2xs leading-5 text-ink-500">{t('chat.emptyHint')}</p>
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'max-w-[85%] whitespace-pre-wrap rounded-card px-3 py-2 text-xs leading-5',
              message.role === 'user'
                ? 'ml-auto bg-brand text-white'
                : message.emergency
                  ? 'border border-warn-tint bg-warn-tint text-navy'
                  : 'border border-line bg-line-soft text-navy',
            )}
          >
            {message.content}
          </div>
        ))}
        {busy && !messages[messages.length - 1]?.content && (
          <div className="flex items-center gap-1.5 text-xs text-ink-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void sendMessage();
        }}
        className="flex items-end gap-2 border-t border-line px-3 py-2.5 sm:px-4"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              void sendMessage();
            }
          }}
          rows={1}
          placeholder={t('chat.placeholder')}
          className="max-h-28 min-h-[42px] flex-1 resize-none rounded-chip border border-line bg-white px-3 py-2.5 text-xs text-navy placeholder:text-ink-400 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15"
        />
        <button
          type="submit"
          disabled={!input.trim() || busy}
          aria-label={t('chat.send')}
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-chip bg-brand text-white transition-colors duration-150 ease-out hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}