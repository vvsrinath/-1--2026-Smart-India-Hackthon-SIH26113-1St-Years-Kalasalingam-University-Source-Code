import React, { useEffect } from 'react';
import { XIcon } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy/20"
        onClick={onClose}
        aria-hidden="true" />
      
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md rounded-card border border-line bg-white shadow-pop">
        
        <div className="flex items-start justify-between gap-4 border-b border-line-soft px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-navy">{title}</h2>
            {description &&
            <p className="mt-0.5 text-2xs text-ink-500">{description}</p>
            }
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-[4px] p-1 text-ink-400 transition-colors duration-150 ease-out hover:bg-line-soft hover:text-navy">
            
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        {children && <div className="px-4 py-4 text-xs text-ink-500">{children}</div>}
        {footer &&
        <div className="flex items-center justify-end gap-2 border-t border-line-soft px-4 py-3">
            {footer}
          </div>
        }
      </div>
    </div>);

}