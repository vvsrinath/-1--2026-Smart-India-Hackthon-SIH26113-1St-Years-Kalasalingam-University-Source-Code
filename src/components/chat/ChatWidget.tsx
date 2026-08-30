import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BotIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../context/LanguageContext';
import { ChatPanel } from './ChatPanel';

const WORKSPACE_PREFIXES = ['/patient', '/doctor', '/specialist', '/worker', '/phc', '/admin'];

export function ChatWidget() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const inWorkspace = WORKSPACE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const onAssistantPage = pathname === '/patient/assistant';

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!inWorkspace || onAssistantPage) setOpen(false);
  }, [pathname, inWorkspace, onAssistantPage]);

  if (!inWorkspace || onAssistantPage) return null;

  return (
    <div className="fixed bottom-[4.75rem] right-4 z-50 md:bottom-6 md:right-6">
      {open && (
        <div className="mb-3 w-[min(calc(100vw-2rem),380px)]">
          <ChatPanel variant="widget" />
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? t('chat.close') : t('chat.open')}
        aria-expanded={open}
        className={cn(
          'ml-auto flex h-14 w-14 items-center justify-center rounded-full shadow-card transition-all duration-150 ease-out',
          open ? 'bg-navy text-white' : 'bg-brand text-white hover:bg-brand-dark active:scale-95'
        )}
      >
        {open ? <XIcon className="h-5 w-5" /> : <BotIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}