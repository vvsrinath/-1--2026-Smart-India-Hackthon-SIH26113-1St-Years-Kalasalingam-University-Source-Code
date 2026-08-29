// DEMO DATA — replace with API data later
// Illustrative specialist profiles for prototype purposes only.
import type { Doctor } from '../types';

export const demoSpecialists: Doctor[] = [
{
  id: 's-01',
  name: 'Dr. Neha Verma',
  specialization: 'Cardiologist',
  qualifications: 'MBBS, MD, DM (Cardiology)',
  hospital: 'Life Care Hospital',
  experienceYears: 15,
  rating: 4.7,
  reviews: 212,
  photo: '',
  languages: ['English', 'Hindi']
},
{
  id: 's-02',
  name: 'Dr. Rajiv Menon',
  specialization: 'Pulmonologist',
  qualifications: 'MBBS, MD (Respiratory Medicine)',
  hospital: 'City Health Center',
  experienceYears: 11,
  rating: 4.5,
  reviews: 143,
  photo: '',
  languages: ['English', 'Malayalam']
},
{
  id: 's-03',
  name: 'Dr. Priya Nair',
  specialization: 'Endocrinologist',
  qualifications: 'MBBS, MD, DM (Endocrinology)',
  hospital: 'Hope Diagnostic Center',
  experienceYears: 10,
  rating: 4.6,
  reviews: 118,
  photo: '',
  languages: ['English', 'Hindi', 'Tamil']
}];


/** The signed-in demo specialist used across the specialist workspace. */
export const currentSpecialist = demoSpecialists[0];