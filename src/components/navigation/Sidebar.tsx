import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';
import { cn } from '../../utils/cn';
import type { NavItem } from '../../data/navigation';

interface SidebarProps {
  items: NavItem[];
  workspaceLabel: string;
}

export function Sidebar({ items, workspaceLabel }: SidebarProps) {
  const main = items.filter((item) => !item.footer);
  const footer = items.filter((item) => item.footer);

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    return (
      <NavLink
        key={item.to + item.label}
        to={item.to}
        end={item.end}
        className={({ isActive }) =>
        cn(
          'group flex items-center gap-2.5 rounded-chip px-2.5 py-[7px] text-xs transition-colors duration-150 ease-out',
          isActive ?
          'bg-brand-tint font-medium text-brand' :
          'text-ink-500 hover:bg-line-soft hover:text-navy'
        )
        }>
        
        {({ isActive }) =>
        <>
            <Icon
            className={cn(
              'h-[15px] w-[15px] shrink-0',
              isActive ? 'text-brand' : 'text-ink-400 group-hover:text-navy'
            )} />
          
            <span className="truncate">{item.label}</span>
          </>
        }
      </NavLink>);

  };

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-14 items-center border-b border-line-soft px-4">
        <Logo />
      </div>
      <nav
        aria-label={`${workspaceLabel} navigation`}
        className="ss-scroll flex flex-1 flex-col gap-0.5 overflow-y-auto px-2.5 py-3">
        
        {main.map(renderItem)}
      </nav>
      {footer.length > 0 &&
      <div className="border-t border-line-soft px-2.5 py-3">
          {footer.map(renderItem)}
        </div>
      }
    </aside>);

}