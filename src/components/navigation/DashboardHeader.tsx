import React from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, MailIcon } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { Logo } from './Logo';
import { LiveDateTime } from './LiveDateTime';
import { Avatar } from '../common/Avatar';

interface DashboardHeaderProps {
  userName: string;
  userMeta: string;
  photo?: string;
  notificationsTo: string;
  messagesTo: string;
  profileTo: string;
}

export function DashboardHeader({
  userName,
  userMeta,
  photo,
  notificationsTo,
  messagesTo,
  profileTo
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 min-w-0 items-center gap-3 border-b border-line bg-white/95 px-3 backdrop-blur sm:px-5">
      <div className="min-w-0 md:hidden">
        <Logo />
      </div>
      <div className="hidden min-w-0 md:block">
        <p className="truncate text-xs font-semibold text-navy">{userName}</p>
        <p className="truncate text-2xs text-ink-400">{userMeta}</p>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center px-2">
        <LiveDateTime className="hidden md:flex" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <LanguageSelector className="hidden w-[112px] sm:flex" />
        <Link
          to={messagesTo}
          aria-label="Messages"
          className="rounded-chip border border-line p-1.5 text-ink-500 transition-colors duration-150 ease-out hover:border-brand/30 hover:text-navy">
          
          <MailIcon className="h-3.5 w-3.5" />
        </Link>
        <Link
          to={notificationsTo}
          aria-label="Notifications"
          className="relative rounded-chip border border-line p-1.5 text-ink-500 transition-colors duration-150 ease-out hover:border-brand/30 hover:text-navy">
          
          <BellIcon className="h-3.5 w-3.5" />
          <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-brand" />
        </Link>
        <Link to={profileTo} aria-label="Profile settings">
          <Avatar name={userName} src={photo} size="sm" />
        </Link>
      </div>
    </header>);

}