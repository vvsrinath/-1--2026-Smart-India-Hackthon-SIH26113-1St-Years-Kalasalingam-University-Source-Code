import {
  BellIcon,
  CalendarDaysIcon,
  ClipboardListIcon,
  FileTextIcon,
  FolderOpenIcon,
  HeartPulseIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapPinIcon,
  MessageSquareIcon,
  PillIcon,
  RepeatIcon,
  SettingsIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  UsersIcon,
  VideoIcon } from
'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: typeof LayoutDashboardIcon;
  /** Rendered below a hairline divider, at the bottom of the sidebar. */
  footer?: boolean;
  end?: boolean;
}

export const publicNav = [
{ label: 'Home', to: '/' },
{ label: 'About Us', to: '/about' },
{ label: 'Services', to: '/services' },
{ label: 'How It Works', to: '/how-it-works' },
{ label: 'For Patients', to: '/patient' },
{ label: 'For Healthcare', to: '/doctor' },
{ label: 'Health Tips', to: '/health-information' },
{ label: 'Contact Us', to: '/contact' }];


export const patientNav: NavItem[] = [
{ label: 'Dashboard', to: '/patient', icon: LayoutDashboardIcon, end: true },
{ label: 'Find Services', to: '/patient/find-healthcare', icon: MapPinIcon },
{ label: 'Appointments', to: '/patient/appointments', icon: CalendarDaysIcon },
{ label: 'Consult Online', to: '/patient/consult-online', icon: VideoIcon },
{ label: 'Referrals', to: '/patient/referrals', icon: RepeatIcon },
{ label: 'Health Records', to: '/patient/records', icon: FolderOpenIcon },
{ label: 'Follow-ups', to: '/patient/follow-up', icon: HeartPulseIcon },
{ label: 'Messages', to: '/patient/messages', icon: MessageSquareIcon },
{ label: 'Notifications', to: '/patient/notifications', icon: BellIcon },
{ label: 'Profile Settings', to: '/patient/profile', icon: SettingsIcon },
{ label: 'Help & Support', to: '/patient/help', icon: HelpCircleIcon },
{ label: 'Logout', to: '/login', icon: LogOutIcon, footer: true }];


export const doctorNav: NavItem[] = [
{ label: 'Dashboard', to: '/doctor', icon: LayoutDashboardIcon, end: true },
{ label: 'Appointments', to: '/doctor/appointments', icon: CalendarDaysIcon },
{ label: 'Patients', to: '/doctor/patients', icon: UsersIcon },
{ label: 'Referrals', to: '/doctor/referrals', icon: RepeatIcon },
{ label: 'Prescriptions', to: '/doctor/prescriptions', icon: PillIcon },
{ label: 'Reports', to: '/doctor/reports', icon: FileTextIcon },
{ label: 'Messages', to: '/doctor/messages', icon: MessageSquareIcon },
{ label: 'Notifications', to: '/doctor/notifications', icon: BellIcon },
{ label: 'Profile Settings', to: '/doctor/profile', icon: SettingsIcon },
{ label: 'Logout', to: '/login', icon: LogOutIcon, footer: true }];


export const specialistNav: NavItem[] = [
{ label: 'Dashboard', to: '/specialist', icon: LayoutDashboardIcon, end: true },
{ label: 'Appointments', to: '/specialist/appointments', icon: CalendarDaysIcon },
{ label: 'Patients', to: '/specialist/patients', icon: UsersIcon },
{ label: 'Referrals', to: '/specialist/referrals', icon: RepeatIcon },
{ label: 'Prescriptions', to: '/specialist/prescriptions', icon: PillIcon },
{ label: 'Records', to: '/specialist/records', icon: ClipboardListIcon },
{ label: 'Messages', to: '/specialist/messages', icon: MessageSquareIcon },
{ label: 'Notifications', to: '/specialist/notifications', icon: BellIcon },
{ label: 'Profile Settings', to: '/specialist/profile', icon: SettingsIcon },
{ label: 'Logout', to: '/login', icon: LogOutIcon, footer: true }];

export const workerNav: NavItem[] = [
{ label: 'Home', to: '/worker', icon: LayoutDashboardIcon, end: true },
{ label: 'Patients', to: '/worker/patients', icon: UsersIcon },
{ label: 'Triage', to: '/worker/triage', icon: StethoscopeIcon },
{ label: 'Referrals', to: '/worker/referrals', icon: RepeatIcon },
{ label: 'Follow-ups', to: '/worker/followups', icon: HeartPulseIcon },
{ label: 'Messages', to: '/worker/messages', icon: MessageSquareIcon },
{ label: 'Profile', to: '/worker/profile', icon: SettingsIcon },
{ label: 'Logout', to: '/login', icon: LogOutIcon, footer: true }];

export const phcNav: NavItem[] = [
{ label: 'Dashboard', to: '/phc', icon: LayoutDashboardIcon, end: true },
{ label: 'Queue', to: '/phc/queue', icon: UsersIcon },
{ label: 'Patients', to: '/phc/patients', icon: FolderOpenIcon },
{ label: 'Referrals', to: '/phc/referrals', icon: RepeatIcon },
{ label: 'Medicines', to: '/phc/medicines', icon: PillIcon },
{ label: 'Diagnostics', to: '/phc/diagnostics', icon: FileTextIcon },
{ label: 'Profile', to: '/phc/profile', icon: SettingsIcon },
{ label: 'Logout', to: '/login', icon: LogOutIcon, footer: true }];

export const adminNav: NavItem[] = [
{ label: 'Dashboard', to: '/admin', icon: LayoutDashboardIcon, end: true },
{ label: 'Analytics', to: '/admin/analytics', icon: ShieldCheckIcon },
{ label: 'Facilities', to: '/admin/facilities', icon: MapPinIcon },
{ label: 'Referrals', to: '/admin/referrals', icon: RepeatIcon },
{ label: 'Reports', to: '/admin/reports', icon: FileTextIcon },
{ label: 'Settings', to: '/admin/settings', icon: SettingsIcon },
{ label: 'Logout', to: '/login', icon: LogOutIcon, footer: true }];