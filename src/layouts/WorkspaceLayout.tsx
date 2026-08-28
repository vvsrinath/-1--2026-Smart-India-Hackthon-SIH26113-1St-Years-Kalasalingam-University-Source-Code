import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { DashboardHeader } from '../components/navigation/DashboardHeader';
import { MobileWorkspaceNav } from '../components/navigation/MobileWorkspaceNav';
import type { NavItem } from '../data/navigation';

interface WorkspaceLayoutProps {
  items: NavItem[];
  workspaceLabel: string;
  userName: string;
  userMeta: string;
  photo?: string;
  basePath: string;
}

/**
 * Single shell shared by the patient, doctor and specialist workspaces so the
 * three never drift apart visually — only the nav config and identity differ.
 */
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
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          userName={userName}
          userMeta={userMeta}
          photo={photo}
          messagesTo={`${basePath}/messages`}
          notificationsTo={`${basePath}/notifications`}
          profileTo={`${basePath}/profile`} />
        
        <MobileWorkspaceNav items={items} workspaceLabel={workspaceLabel} />
        <main className="flex-1 px-5 py-5">
          <Outlet />
        </main>
        <p className="px-5 pb-5 text-2xs text-ink-400">
          Demonstration interface — all patients, practitioners, facilities and
          records shown are illustrative sample data.
        </p>
      </div>
    </div>);

}