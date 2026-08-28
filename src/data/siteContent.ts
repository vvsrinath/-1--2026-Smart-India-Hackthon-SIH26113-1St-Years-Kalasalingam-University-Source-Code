// DEMO DATA — replace with CMS/API content later
import {
  BuildingIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CompassIcon,
  EyeIcon,
  FolderOpenIcon,
  HeartPulseIcon,
  LinkIcon,
  LockIcon,
  MapPinIcon,
  RepeatIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  TargetIcon,
  UsersIcon,
  VideoIcon } from
'lucide-react';

export const quickActions = [
{
  icon: MapPinIcon,
  title: 'Find Healthcare',
  description: 'Search hospitals, clinics, labs & more',
  to: '/patient/find-healthcare'
},
{
  icon: CalendarDaysIcon,
  title: 'Book Appointment',
  description: 'Book appointments with doctors',
  to: '/patient/appointments'
},
{
  icon: VideoIcon,
  title: 'Consult Online',
  description: 'Talk to doctors (online / offline)',
  to: '/patient/consult-online'
},
{
  icon: RepeatIcon,
  title: 'My Referrals',
  description: 'Track referral status',
  to: '/patient/referrals'
},
{
  icon: FolderOpenIcon,
  title: 'Health Records',
  description: 'View your health information',
  to: '/patient/records'
}];


/** Illustrative figures shown in the home page trust strip. */
export const trustStats = [
{ icon: BuildingIcon, value: '10,000+', label: 'Healthcare Facilities' },
{ icon: UsersIcon, value: '25,000+', label: 'Doctors & Specialists' },
{ icon: CalendarDaysIcon, value: '5M+', label: 'Appointments Booked' },
{ icon: RepeatIcon, value: '2M+', label: 'Referrals Managed' },
{ icon: HeartPulseIcon, value: '1M+', label: 'People Supported' }];


export const services = [
{
  icon: MapPinIcon,
  title: 'Find Healthcare',
  description: 'Find hospitals, clinics, labs and pharmacies near you.',
  to: '/patient/find-healthcare'
},
{
  icon: CalendarDaysIcon,
  title: 'Book Appointment',
  description: 'Book appointments with doctors and specialists.',
  to: '/patient/appointments'
},
{
  icon: VideoIcon,
  title: 'Consult Online',
  description: 'Talk to doctors via audio or video call.',
  to: '/patient/consult-online'
},
{
  icon: RepeatIcon,
  title: 'Referral Management',
  description: 'Track your referrals from one facility to another.',
  to: '/patient/referrals'
},
{
  icon: FolderOpenIcon,
  title: 'Health Records',
  description: 'Access and manage your health records.',
  to: '/patient/records'
},
{
  icon: HeartPulseIcon,
  title: 'Follow-ups',
  description: 'Get reminders and manage follow-ups with ease.',
  to: '/patient/follow-up'
}];


export const aboutPoints = [
{
  icon: TargetIcon,
  title: 'Our Mission',
  description: 'Make quality healthcare accessible to everyone.'
},
{
  icon: EyeIcon,
  title: 'Our Vision',
  description: 'A healthier India where no one is left behind.'
},
{
  icon: CompassIcon,
  title: 'What We Do',
  description:
  'Connect patients, doctors and specialists on a single platform for seamless care.'
}];


export const aboutValues = [
{ icon: UsersIcon, title: 'Accessible', description: 'For everyone' },
{ icon: ShieldCheckIcon, title: 'Reliable', description: 'Verified services' },
{ icon: LockIcon, title: 'Secure', description: 'Your data is safe' },
{ icon: LinkIcon, title: 'Connected', description: 'Seamless care' }];


export const howItWorksSteps = [
{
  number: '01',
  icon: CheckCircle2Icon,
  title: 'Tell Us What You Need',
  description: 'Search or describe your health concern.'
},
{
  number: '02',
  icon: MapPinIcon,
  title: 'Find the Right Service',
  description: 'We help you find the best healthcare services near you.'
},
{
  number: '03',
  icon: StethoscopeIcon,
  title: 'Connect with a Doctor',
  description: 'Consult a doctor online or visit in person.'
},
{
  number: '04',
  icon: RepeatIcon,
  title: 'Referral (If Required)',
  description: 'Get referred to a specialist if needed.'
},
{
  number: '05',
  icon: UsersIcon,
  title: 'Specialist Care',
  description: 'Consult a specialist and get expert care.'
},
{
  number: '06',
  icon: HeartPulseIcon,
  title: 'Follow-up',
  description: 'Stay on track with follow-ups and reminders.'
}];


export const heroImage = "/443e6e94-7c12-4d95-8359-b832657ea7f8.jpg";


export const doctorImage = "/fcce296d-1fc9-4293-8987-db518cd130f0.jpg";