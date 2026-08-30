import { StarIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingProps {
  value: number;
  reviews?: number;
  className?: string;
}

export function Rating({ value, reviews, className }: RatingProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-2xs text-navy', className)}>
      <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
      <span className="font-medium">{value.toFixed(1)}</span>
      {typeof reviews === 'number' &&
      <span className="text-ink-400">({reviews} reviews)</span>
      }
    </span>);

}