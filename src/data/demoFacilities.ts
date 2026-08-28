// DEMO DATA — replace with API data later
// Facilities, distances, opening hours and ratings are illustrative placeholders
// centred on Patna, Bihar. They do not represent real availability.
import type { Facility } from '../types';

export const demoFacilities: Facility[] = [
{
  id: 'f-01',
  name: 'City Health Center',
  type: 'Primary Care',
  distanceKm: 1.2,
  openUntil: '8 PM',
  rating: 4.5,
  isOpen: true,
  city: 'Patna, Bihar',
  position: [25.6112, 85.1418],
  services: ['General OPD', 'Vaccination', 'Basic Lab']
},
{
  id: 'f-02',
  name: 'Life Care Hospital',
  type: 'Multi-speciality',
  distanceKm: 3.5,
  openUntil: '10 PM',
  rating: 4.2,
  isOpen: true,
  city: 'Patna, Bihar',
  position: [25.6255, 85.1225],
  services: ['Cardiology', 'Orthopaedics', 'Emergency']
},
{
  id: 'f-03',
  name: 'Sunrise Clinic',
  type: 'General Physician',
  distanceKm: 2.1,
  openUntil: '9 PM',
  rating: 4.0,
  isOpen: true,
  city: 'Patna, Bihar',
  position: [25.5968, 85.1602],
  services: ['General OPD', 'Follow-up care']
},
{
  id: 'f-04',
  name: 'Hope Diagnostic Center',
  type: 'Diagnostics',
  distanceKm: 2.9,
  openUntil: '7 PM',
  rating: 4.3,
  isOpen: false,
  city: 'Patna, Bihar',
  position: [25.6198, 85.1698],
  services: ['Pathology', 'X-Ray', 'ECG']
},
{
  id: 'f-05',
  name: 'Gramin Health Sub-Centre',
  type: 'Rural Health Centre',
  distanceKm: 6.4,
  openUntil: '5 PM',
  rating: 3.9,
  isOpen: true,
  city: 'Danapur, Bihar',
  position: [25.5804, 85.0912],
  services: ['General OPD', 'Maternal care']
},
{
  id: 'f-06',
  name: 'Riverside Pharmacy & Lab',
  type: 'Pharmacy · Lab',
  distanceKm: 1.8,
  openUntil: '11 PM',
  rating: 4.1,
  isOpen: true,
  city: 'Patna, Bihar',
  position: [25.6041, 85.1281],
  services: ['Medicines', 'Sample collection']
}];


export const facilityFilters = [
'All',
'Primary Care',
'Multi-speciality',
'Diagnostics',
'Pharmacy · Lab',
'Rural Health Centre'];


/** Illustrative national coverage markers used by the home page map section. */
export const demoIndiaMarkers: {id: string;name: string;position: [number, number];}[] = [
{ id: 'in-01', name: 'Demo centre — Delhi NCR', position: [28.6139, 77.209] },
{ id: 'in-02', name: 'Demo centre — Jaipur', position: [26.9124, 75.7873] },
{ id: 'in-03', name: 'Demo centre — Lucknow', position: [26.8467, 80.9462] },
{ id: 'in-04', name: 'Demo centre — Patna', position: [25.5941, 85.1376] },
{ id: 'in-05', name: 'Demo centre — Kolkata', position: [22.5726, 88.3639] },
{ id: 'in-06', name: 'Demo centre — Guwahati', position: [26.1445, 91.7362] },
{ id: 'in-07', name: 'Demo centre — Nagpur', position: [21.1458, 79.0882] },
{ id: 'in-08', name: 'Demo centre — Mumbai', position: [19.076, 72.8777] },
{ id: 'in-09', name: 'Demo centre — Hyderabad', position: [17.385, 78.4867] },
{ id: 'in-10', name: 'Demo centre — Bengaluru', position: [12.9716, 77.5946] },
{ id: 'in-11', name: 'Demo centre — Chennai', position: [13.0827, 80.2707] },
{ id: 'in-12', name: 'Demo centre — Kochi', position: [9.9312, 76.2673] }];