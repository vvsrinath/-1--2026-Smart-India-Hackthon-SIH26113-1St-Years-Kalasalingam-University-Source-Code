import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import type { HealthTip } from '../../types';

interface HealthTipCardProps {
  tip: HealthTip;
  onRead?: (tip: HealthTip) => void;
}

export function HealthTipCard({ tip, onRead }: HealthTipCardProps) {
  return (
    <article className="flex items-center gap-3 rounded-card border border-line bg-white p-3 shadow-card">
      <img
        src={tip.image}
        alt=""
        className="h-14 w-16 shrink-0 rounded-[6px] border border-line object-cover" />
      
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-semibold text-navy">{tip.title}</h3>
        <p className="ss-clamp-2 mt-1 text-2xs leading-[17px] text-ink-500">
          {tip.description}
        </p>
        <p className="mt-1 text-2xs text-ink-400">
          {tip.category} · {tip.readTime}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onRead?.(tip)}
        className="inline-flex shrink-0 items-center gap-1 self-start text-2xs font-medium text-brand transition-colors duration-150 ease-out hover:text-brand-dark">
        
        Read More
        <ArrowRightIcon className="h-3 w-3" />
      </button>
    </article>);

}