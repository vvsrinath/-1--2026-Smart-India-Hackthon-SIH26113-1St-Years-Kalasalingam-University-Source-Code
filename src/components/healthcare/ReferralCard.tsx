import { Avatar } from '../common/Avatar';
import { StatusBadge } from '../common/StatusBadge';
import { cn } from '../../utils/cn';
import type { Referral } from '../../types';

interface ReferralCardProps {
  referral: Referral;
  showReason?: boolean;
  className?: string;
}

export function ReferralCard({
  referral,
  showReason = false,
  className
}: ReferralCardProps) {
  return (
    <article
      className={cn(
        'flex items-center gap-3 rounded-card border border-line bg-white px-3 py-2.5',
        className
      )}>
      
      <Avatar name={referral.patientName} src={referral.patientPhoto || undefined} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-navy">
          {referral.patientName}
        </p>
        <p className="mt-0.5 truncate text-2xs text-ink-500">
          {referral.direction === 'sent' ?
          `Referred to ${referral.referredTo}` :
          `${referral.facility}`}
        </p>
        {showReason &&
        <p className="mt-1 truncate text-2xs text-ink-400">{referral.reason}</p>
        }
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="text-2xs text-ink-400">{referral.date}</span>
        <StatusBadge status={referral.status} />
      </div>
    </article>);

}