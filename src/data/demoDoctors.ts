// DEMO DATA — replace with API data later
// Illustrative practitioner profiles for prototype purposes only.
import type { Doctor } from '../types';

export const demoDoctors: Doctor[] = [
{
  id: 'd-01',
  name: 'Dr. Arjun Sharma',
  specialization: 'General Physician',
  qualifications: 'MBBS, MD (General Medicine)',
  hospital: 'City Health Center',
  experienceYears: 12,
  rating: 4.5,
  reviews: 128,
  photo: "/fcce296d-1fc9-4293-8987-db518cd130f0.jpg",

  languages: ['English', 'Hindi']
},
{
  id: 'd-02',
  name: 'Dr. Kavita Rao',
  specialization: 'Family Medicine',
  qualifications: 'MBBS, DNB (Family Medicine)',
  hospital: 'Life Care Hospital',
  experienceYears: 9,
  rating: 4.4,
  reviews: 96,
  photo: '',
  languages: ['English', 'Hindi', 'Marathi']
},
{
  id: 'd-03',
  name: 'Dr. Imran Qureshi',
  specialization: 'General Physician',
  qualifications: 'MBBS',
  hospital: 'Sunrise Clinic',
  experienceYears: 7,
  rating: 4.3,
  reviews: 61,
  photo: '',
  languages: ['English', 'Urdu', 'Hindi']
}];


/** The signed-in demo doctor used across the doctor workspace. */
export const currentDoctor = demoDoctors[0];