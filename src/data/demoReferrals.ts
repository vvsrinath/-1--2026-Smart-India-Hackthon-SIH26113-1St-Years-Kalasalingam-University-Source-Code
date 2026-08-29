// DEMO DATA — replace with API data later
// Referral records below are illustrative only.
import type { Referral } from '../types';

export const sentReferrals: Referral[] = [
{
  id: 'r-01',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  patientPhoto: '',
  referredTo: 'Cardiologist',
  specialistName: 'Dr. Neha Verma',
  facility: 'Life Care Hospital',
  date: '17 May 2024',
  reason: 'Irregular pulse noted during consultation',
  status: 'Pending',
  direction: 'sent'
},
{
  id: 'r-02',
  patientId: 'p-1002',
  patientName: 'Sita Devi',
  patientPhoto: '',
  referredTo: 'Pulmonologist',
  specialistName: 'Dr. Rajiv Menon',
  facility: 'City Health Center',
  date: '16 May 2024',
  reason: 'Persistent cough beyond three weeks',
  status: 'Accepted',
  direction: 'sent'
},
{
  id: 'r-03',
  patientId: 'p-1003',
  patientName: 'Mohit Yadav',
  patientPhoto: '',
  referredTo: 'Endocrinologist',
  specialistName: 'Dr. Priya Nair',
  facility: 'Hope Diagnostic Center',
  date: '15 May 2024',
  reason: 'Diabetes management review',
  status: 'Pending',
  direction: 'sent'
},
{
  id: 'r-04',
  patientId: 'p-1004',
  patientName: 'Anita Verma',
  patientPhoto: '',
  referredTo: 'Gynecologist',
  specialistName: 'Dr. Kavita Rao',
  facility: 'Life Care Hospital',
  date: '14 May 2024',
  reason: 'Routine specialist review',
  status: 'Completed',
  direction: 'sent'
},
{
  id: 'r-05',
  patientId: 'p-1005',
  patientName: 'Deepak Singh',
  patientPhoto: '',
  referredTo: 'Orthopaedist',
  specialistName: 'Dr. Imran Qureshi',
  facility: 'City Health Center',
  date: '13 May 2024',
  reason: 'Knee pain, imaging advised',
  status: 'Accepted',
  direction: 'sent'
}];


export const receivedReferrals: Referral[] = [
{
  id: 'r-06',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  patientPhoto: '',
  referredTo: 'Cardiology',
  specialistName: 'Dr. Neha Verma',
  facility: 'Referred by Dr. Arjun Sharma',
  date: '17 May 2024',
  reason: 'Irregular pulse noted during consultation',
  status: 'Pending',
  direction: 'received'
},
{
  id: 'r-07',
  patientId: 'p-1002',
  patientName: 'Sita Devi',
  patientPhoto: '',
  referredTo: 'Cardiology',
  specialistName: 'Dr. Neha Verma',
  facility: 'Referred by Dr. Kavita Rao',
  date: '16 May 2024',
  reason: 'Chest discomfort on exertion',
  status: 'Accepted',
  direction: 'received'
},
{
  id: 'r-08',
  patientId: 'p-1003',
  patientName: 'Mohit Yadav',
  patientPhoto: '',
  referredTo: 'Cardiology',
  specialistName: 'Dr. Neha Verma',
  facility: 'Referred by Dr. Imran Qureshi',
  date: '15 May 2024',
  reason: 'Pre-operative cardiac clearance',
  status: 'Completed',
  direction: 'received'
},
{
  id: 'r-09',
  patientId: 'p-1005',
  patientName: 'Deepak Singh',
  patientPhoto: '',
  referredTo: 'Cardiology',
  specialistName: 'Dr. Neha Verma',
  facility: 'Referred by Dr. Kavita Rao',
  date: '13 May 2024',
  reason: 'Palpitations, ECG attached',
  status: 'Pending',
  direction: 'received'
}];


/** Referrals shown in the patient workspace. */
export const patientReferrals: Referral[] = [sentReferrals[0], sentReferrals[3]];

export const specialistOptions = [
'Cardiologist — Dr. Neha Verma (Life Care Hospital)',
'Pulmonologist — Dr. Rajiv Menon (City Health Center)',
'Endocrinologist — Dr. Priya Nair (Hope Diagnostic Center)',
'Orthopaedist — Dr. Imran Qureshi (City Health Center)'];