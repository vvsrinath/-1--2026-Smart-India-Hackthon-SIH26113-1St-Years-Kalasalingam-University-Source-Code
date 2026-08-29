export type ReferralStatus = 'Pending' | 'Accepted' | 'Completed' | 'Declined';

export type AppointmentStatus =
'Completed' |
'Consulting' |
'Upcoming' |
'Cancelled';

export type JourneyStatus = 'Completed' | 'In Progress' | 'Upcoming';

export interface Facility {
  id: string;
  name: string;
  type: string;
  distanceKm: number;
  openUntil: string;
  rating: number;
  isOpen: boolean;
  city: string;
  position: [number, number];
  services: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  hospital: string;
  experienceYears: number;
  rating: number;
  reviews: number;
  photo: string;
  languages: string[];
}

export interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  mrn: string;
  phone: string;
  city: string;
  bloodGroup: string;
  photo: string;
  conditions: string[];
}

export interface Appointment {
  id: string;
  time: string;
  date: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  reason: string;
  facility: string;
  mode: 'In person' | 'Online';
  status: AppointmentStatus;
}

export interface Referral {
  id: string;
  patientId: string;
  patientName: string;
  patientPhoto: string;
  referredTo: string;
  specialistName: string;
  facility: string;
  date: string;
  reason: string;
  status: ReferralStatus;
  direction: 'sent' | 'received';
}

export type RecordCategory =
'Lab Reports' |
'Prescriptions' |
'Immunization' |
'Imaging';

export interface HealthRecord {
  id: string;
  title: string;
  date: string;
  provider: string;
  category: RecordCategory;
}

export type TipCategory = 'Diseases' | 'Nutrition' | 'Fitness' | 'General';

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: TipCategory;
  image: string;
  readTime: string;
}

export interface JourneyStep {
  id: string;
  label: string;
  status: JourneyStatus;
  detail: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  meta: string;
  date: string;
  kind: 'appointment' | 'referral' | 'record' | 'followup';
}