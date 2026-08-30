import { cn } from '../../utils/cn';

interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export function Tabs({
  tabs,
  active,
  onChange,
  variant = 'pill',
  className
}: TabsProps) {
  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        className={cn('ss-scroll flex min-w-0 items-center gap-6 overflow-x-auto border-b border-line', className)}>
        
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange(tab)}
              className={cn(
                '-mb-px border-b-2 pb-2.5 pt-1 text-xs font-medium transition-colors duration-150 ease-out',
                isActive ?
                'border-brand text-brand' :
                'border-transparent text-ink-500 hover:text-navy'
              )}>
              
              {tab}
            </button>);

        })}
      </div>);

  }

  return (
    <div
      role="tablist"
      className={cn(
        'ss-scroll inline-flex min-w-0 max-w-full items-center gap-1 overflow-x-auto rounded-chip border border-line bg-white p-1',
        className
      )}>
      
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={cn(
              'rounded-[4px] px-3 py-1.5 text-2xs font-medium transition-colors duration-150 ease-out',
              isActive ?
              'bg-brand-tint text-brand' :
              'text-ink-500 hover:bg-line-soft hover:text-navy'
            )}>
            
            {tab}
          </button>);

      })}
    </div>);

}