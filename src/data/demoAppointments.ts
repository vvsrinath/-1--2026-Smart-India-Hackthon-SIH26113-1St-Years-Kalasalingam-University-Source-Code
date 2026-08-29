// DEMO DATA — replace with API data later
// Schedules below are illustrative and do not reflect real bookings.
import type { Appointment } from '../types';

export const patientAppointments: Appointment[] = [
{
  id: 'a-01',
  time: '10:30 AM',
  date: '20 May 2024',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'General check-up',
  facility: 'City Health Center',
  mode: 'In person',
  status: 'Upcoming'
},
{
  id: 'a-02',
  time: '04:00 PM',
  date: '02 Jun 2024',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  doctorName: 'Dr. Neha Verma',
  reason: 'Cardiology referral consult',
  facility: 'Life Care Hospital',
  mode: 'In person',
  status: 'Upcoming'
},
{
  id: 'a-03',
  time: '11:00 AM',
  date: '18 May 2024',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'Fever consultation',
  facility: 'City Health Center',
  mode: 'Online',
  status: 'Completed'
}];


export const doctorSchedule: Appointment[] = [
{
  id: 'ds-01',
  time: '09:00 AM',
  date: '20 May 2024',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'General check-up',
  facility: 'City Health Center',
  mode: 'In person',
  status: 'Completed'
},
{
  id: 'ds-02',
  time: '10:30 AM',
  date: '20 May 2024',
  patientId: 'p-1002',
  patientName: 'Sita Devi',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'Fever & cough',
  facility: 'City Health Center',
  mode: 'In person',
  status: 'Consulting'
},
{
  id: 'ds-03',
  time: '11:30 AM',
  date: '20 May 2024',
  patientId: 'p-1003',
  patientName: 'Mohit Yadav',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'Diabetes follow-up',
  facility: 'City Health Center',
  mode: 'In person',
  status: 'Upcoming'
},
{
  id: 'ds-04',
  time: '12:20 PM',
  date: '20 May 2024',
  patientId: 'p-1004',
  patientName: 'Anita Verma',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'BP check-up',
  facility: 'City Health Center',
  mode: 'Online',
  status: 'Upcoming'
},
{
  id: 'ds-05',
  time: '02:00 PM',
  date: '20 May 2024',
  patientId: 'p-1005',
  patientName: 'Deepak Singh',
  doctorName: 'Dr. Arjun Sharma',
  reason: 'Knee pain review',
  facility: 'City Health Center',
  mode: 'In person',
  status: 'Upcoming'
}];


export const specialistSchedule: Appointment[] = [
{
  id: 'ss-01',
  time: '09:30 AM',
  date: '21 May 2024',
  patientId: 'p-1001',
  patientName: 'Ramesh Kumar',
  doctorName: 'Dr. Neha Verma',
  reason: 'Referred by Dr. Arjun Sharma',
  facility: 'Life Care Hospital',
  mode: 'In person',
  status: 'Upcoming'
},
{
  id: 'ss-02',
  time: '11:00 AM',
  date: '21 May 2024',
  patientId: 'p-1002',
  patientName: 'Sita Devi',
  doctorName: 'Dr. Neha Verma',
  reason: 'Referred by Dr. Arjun Sharma',
  facility: 'Life Care Hospital',
  mode: 'In person',
  status: 'Upcoming'
},
{
  id: 'ss-03',
  time: '12:30 PM',
  date: '21 May 2024',
  patientId: 'p-1003',
  patientName: 'Mohit Yadav',
  doctorName: 'Dr. Neha Verma',
  reason: 'Referred by Dr. Arjun Sharma',
  facility: 'Life Care Hospital',
  mode: 'Online',
  status: 'Upcoming'
}];


/** Booking flow demo options. */
export const bookingDates = [
{ day: '18', weekday: 'Sat' },
{ day: '19', weekday: 'Sun' },
{ day: '20', weekday: 'Mon' },
{ day: '21', weekday: 'Tue' },
{ day: '22', weekday: 'Wed' },
{ day: '23', weekday: 'Thu' },
{ day: '24', weekday: 'Fri' }];


export const bookingSlots = [
'09:00 AM',
'10:30 AM',
'12:00 PM',
'04:00 PM',
'06:00 PM'];