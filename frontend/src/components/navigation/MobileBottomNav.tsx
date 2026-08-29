import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { NavItem } from '../../data/navigation';

export function MobileBottomNav({ items }: { items: NavItem[] }) {
  // Filter out footer items like logout, take up to 5 items for the bottom nav
  const mainItems = items.filter(item => !item.footer).slice(0, 5);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur pb-safe md:hidden">
      <div 
        className="grid gap-1 px-2 py-2"
        style={{ gridTemplateColumns: `repeat(${mainItems.length}, minmax(0, 1fr))` }}
      >
        {mainItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium transition-colors min-h-[44px]',
                  isActive ? 'text-brand' : 'text-ink-500'
                )
              }
            >
              <Icon className="h-5 w-5" />
              <span className="truncate w-full text-center">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
