import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { LiveDateTime } from './LiveDateTime';
import { publicNav } from '../../data/navigation';
import { cn } from '../../utils/cn';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-shell items-center gap-6 px-6">
        <Logo />

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center gap-5 lg:flex">
          
          {publicNav.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
            cn(
              'text-xs transition-colors duration-150 ease-out',
              isActive ?
              'font-medium text-brand' :
              'text-ink-500 hover:text-navy'
            )
            }>
            
              {item.label}
            </NavLink>
          )}
        </nav>

        <div className="ml-auto hidden items-center gap-2.5 lg:flex">
          <LiveDateTime className="hidden xl:flex" />
          <LanguageSelector />
          <Link
            to="/login"
            className="inline-flex h-8 items-center rounded-chip bg-brand px-4 text-xs font-medium text-white transition-colors duration-150 ease-out hover:bg-brand-dark">
            
            Login
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto rounded-[4px] p-1.5 text-navy transition-colors duration-150 ease-out hover:bg-line-soft lg:hidden">
          
          {open ? <XIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
        </button>
      </div>

      {open &&
      <div className="border-t border-line bg-white px-6 py-3 lg:hidden">
          <nav aria-label="Mobile navigation" className="grid gap-1">
            {publicNav.map((item) =>
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
            cn(
              'rounded-chip px-2 py-2 text-xs transition-colors duration-150 ease-out',
              isActive ?
              'bg-brand-tint font-medium text-brand' :
              'text-ink-500 hover:bg-line-soft hover:text-navy'
            )
            }>
            
                {item.label}
              </NavLink>
          )}
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-line-soft pt-3">
            <LanguageSelector className="w-[128px]" />
            <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="inline-flex h-8 items-center rounded-chip bg-brand px-4 text-xs font-medium text-white">
            
              Login
            </Link>
          </div>
        </div>
      }
    </header>);

}