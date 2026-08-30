import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { DashboardHeader } from '../components/navigation/DashboardHeader';
import { MobileBottomNav } from '../components/navigation/MobileBottomNav';
import type { NavItem } from '../data/navigation';

interface WorkspaceLayoutProps {
  items: NavItem[];
  workspaceLabel: string;
  userName: string;
  userMeta: string;
  photo?: string;
  basePath: string;
}

export function WorkspaceLayout({
  items,
  workspaceLabel,
  userName,
  userMeta,
  photo,
  basePath
}: WorkspaceLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-brand-tint2">
      <Sidebar items={items} workspaceLabel={workspaceLabel} />
      <div className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        <DashboardHeader
          userName={userName}
          userMeta={userMeta}
          photo={photo}
          messagesTo={`${basePath}/messages`}
          notificationsTo={`${basePath}/notifications`}
          profileTo={`${basePath}/profile`} />

        <main className="flex-1 px-3 py-3 sm:px-5 sm:py-5">
          <Outlet />
        </main>
        <p className="px-5 pb-5 text-2xs text-ink-400">
          Demonstration interface — all patients, practitioners, facilities and
          records shown are illustrative sample data.
        </p>
        <MobileBottomNav items={items} />
      </div>
    </div>
  );
}
