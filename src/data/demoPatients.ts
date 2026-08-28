// DEMO DATA — replace with API data later
// All names, identifiers and clinical details below are illustrative only.
import type { Patient } from '../types';

export const demoPatients: Patient[] = [
{
  id: 'p-1001',
  name: 'Ramesh Kumar',
  gender: 'Male',
  age: 25,
  mrn: 'SS-2024-1256',
  phone: '+91 90000 00001',
  city: 'Patna, Bihar',
  bloodGroup: 'B+',
  photo: "/fcce296d-1fc9-4293-8987-db518cd130f0.jpg",

  conditions: ['Viral fever (current)', 'No known allergies']
},
{
  id: 'p-1002',
  name: 'Sita Devi',
  gender: 'Female',
  age: 42,
  mrn: 'SS-2024-1291',
  phone: '+91 90000 00002',
  city: 'Gaya, Bihar',
  bloodGroup: 'O+',
  photo: '',
  conditions: ['Seasonal cough']
},
{
  id: 'p-1003',
  name: 'Mohit Yadav',
  gender: 'Male',
  age: 51,
  mrn: 'SS-2024-1303',
  phone: '+91 90000 00003',
  city: 'Patna, Bihar',
  bloodGroup: 'A+',
  photo: '',
  conditions: ['Type 2 diabetes (follow-up)']
},
{
  id: 'p-1004',
  name: 'Anita Verma',
  gender: 'Female',
  age: 36,
  mrn: 'SS-2024-1318',
  phone: '+91 90000 00004',
  city: 'Nalanda, Bihar',
  bloodGroup: 'AB+',
  photo: '',
  conditions: ['Blood pressure monitoring']
},
{
  id: 'p-1005',
  name: 'Deepak Singh',
  gender: 'Male',
  age: 29,
  mrn: 'SS-2024-1327',
  phone: '+91 90000 00005',
  city: 'Vaishali, Bihar',
  bloodGroup: 'B+',
  photo: '',
  conditions: ['Knee pain — orthopaedic review']
}];


/** The signed-in demo patient used across the patient workspace. */
export const currentPatient = demoPatients[0];

export function getPatientById(id: string): Patient | undefined {
  return demoPatients.find((patient) => patient.id === id);
}