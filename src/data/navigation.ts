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