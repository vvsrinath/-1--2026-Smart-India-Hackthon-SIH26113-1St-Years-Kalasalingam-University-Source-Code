import { Panel } from "./Panel";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";
import { type LucideIcon } from "lucide-react";
interface WorkspacePlaceholderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
  actionLabel?: string;
  actionTo?: string;
}

/**
 * Shared shell for workspace destinations that keep navigation complete but are
 * intentionally minimal in this prototype.
 */
export function WorkspacePlaceholder({
  title,
  subtitle,
  icon: Icon,
  emptyTitle,
  emptyDescription,
  actionLabel,
  actionTo
}: WorkspacePlaceholderProps) {
  return <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold tracking-[-0.01em] text-navy">
          {title}
        </h1>
        <p className="mt-0.5 text-2xs text-ink-500">{subtitle}</p>
      </div>

      <Panel>
        <EmptyState icon={<Icon className="h-4 w-4" />} title={emptyTitle} description={emptyDescription} action={actionLabel && actionTo ? <Button variant="secondary" to={actionTo}>
                {actionLabel}
              </Button> : undefined} />
      </Panel>
    </div>;
}