// DEMO DATA — replace with API data later
// Records below are illustrative demonstration entries, not real patient data.
import type { ActivityItem, HealthRecord, JourneyStep } from '../types';

export const demoRecords: HealthRecord[] = [
{
  id: 'rec-01',
  title: 'Blood Test Report',
  date: '10 May 2024',
  provider: 'City Diagnostics',
  category: 'Lab Reports'
},
{
  id: 'rec-02',
  title: 'X-Ray Chest',
  date: '02 May 2024',
  provider: 'City Diagnostics',
  category: 'Imaging'
},
{
  id: 'rec-03',
  title: 'ECG Report',
  date: '28 Apr 2024',
  provider: 'City Health Center',
  category: 'Lab Reports'
},
{
  id: 'rec-04',
  title: 'Diabetes Follow-up Report',
  date: '15 Apr 2024',
  provider: 'City Health Center',
  category: 'Prescriptions'
},
{
  id: 'rec-05',
  title: 'Paracetamol & ORS Prescription',
  date: '18 May 2024',
  provider: 'Dr. Arjun Sharma',
  category: 'Prescriptions'
},
{
  id: 'rec-06',
  title: 'Tetanus Booster Record',
  date: '06 Mar 2024',
  provider: 'City Health Center',
  category: 'Immunization'
},
{
  id: 'rec-07',
  title: 'Influenza Vaccination Card',
  date: '11 Jan 2024',
  provider: 'Gramin Health Sub-Centre',
  category: 'Immunization'
}];


export const recordTabs = [
'All Records',
'Lab Reports',
'Prescriptions',
'Immunization'];


export const careJourney: JourneyStep[] = [
{
  id: 'j-1',
  label: 'Request',
  status: 'Completed',
  detail: 'Care request raised on 16 May 2024'
},
{
  id: 'j-2',
  label: 'Doctor Consult',
  status: 'Completed',
  detail: 'Consulted Dr. Arjun Sharma on 18 May 2024'
},
{
  id: 'j-3',
  label: 'Referral',
  status: 'In Progress',
  detail: 'Referral to Cardiology awaiting acceptance'
},
{
  id: 'j-4',
  label: 'Specialist Care',
  status: 'Upcoming',
  detail: 'Specialist consultation not yet scheduled'
},
{
  id: 'j-5',
  label: 'Follow-up',
  status: 'Upcoming',
  detail: 'Follow-up reminder will be scheduled after review'
}];


export const recentActivity: ActivityItem[] = [
{
  id: 'act-1',
  title: 'Appointment booked with Dr. Arjun Sharma',
  meta: 'City Health Center · In person',
  date: '18 May 2024',
  kind: 'appointment'
},
{
  id: 'act-2',
  title: 'Referral created to Cardiology',
  meta: 'Life Care Hospital · Pending',
  date: '17 May 2024',
  kind: 'referral'
},
{
  id: 'act-3',
  title: 'Report uploaded — Blood Test',
  meta: 'City Diagnostics',
  date: '16 May 2024',
  kind: 'record'
},
{
  id: 'act-4',
  title: 'Follow-up reminder set',
  meta: 'Diabetes review · 02 Jun 2024',
  date: '15 May 2024',
  kind: 'followup'
}];


export const demoFollowUps = [
{
  id: 'fu-1',
  title: 'Cardiology review follow-up',
  due: '02 Jun 2024',
  with: 'Dr. Neha Verma',
  status: 'Upcoming' as const
},
{
  id: 'fu-2',
  title: 'Fever recovery check-in',
  due: '25 May 2024',
  with: 'Dr. Arjun Sharma',
  status: 'Upcoming' as const
},
{
  id: 'fu-3',
  title: 'Blood test report review',
  due: '12 May 2024',
  with: 'City Health Center',
  status: 'Completed' as const
}];


/** Prototype prescription rows shown on the consultation screen. */
export const consultationPrescription = [
{ id: 'pr-1', medication: 'Paracetamol 500mg', dosage: '1-0-1', frequency: 'After food · 3 days' },
{ id: 'pr-2', medication: 'ORS Sachet', dosage: '1 packet', frequency: 'Thrice a day · 2 days' }];