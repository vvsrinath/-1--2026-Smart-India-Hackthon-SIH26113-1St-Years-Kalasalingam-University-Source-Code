// DEMO DATA — replace with API data later
// General wellbeing information only. Not medical advice and not a substitute
// for consultation with a qualified healthcare professional.
import type { HealthTip } from '../types';

export const healthTips: HealthTip[] = [
{
  id: 'tip-1',
  title: 'How to Boost Immunity',
  description:
  'Simple everyday habits — balanced meals, regular sleep and staying hydrated — help your body stay resilient through the season.',
  category: 'Nutrition',
  image: "/57250ef6-6297-4b6a-987a-40b3253752ce.jpg",

  readTime: '3 min read'
},
{
  id: 'tip-2',
  title: 'Diabetes: Diet & Care',
  description:
  'General guidance on portion balance, meal timing and daily routine that people managing diabetes often discuss with their doctor.',
  category: 'Diseases',
  image: "/170f536b-fefb-407e-a80b-6318edd2de2d.jpg",

  readTime: '4 min read'
},
{
  id: 'tip-3',
  title: 'Regular Exercise Benefits',
  description:
  'About 30 minutes of moderate activity on most days supports heart health, sleep quality and everyday energy levels.',
  category: 'Fitness',
  image: "/08c39511-263e-41f5-9d1c-7517e9bd70fa.jpg",

  readTime: '3 min read'
},
{
  id: 'tip-4',
  title: 'When to See a Doctor?',
  description:
  'Knowing which symptoms deserve prompt attention helps you reach a qualified healthcare professional at the right time.',
  category: 'General',
  image: "/fcce296d-1fc9-4293-8987-db518cd130f0.jpg",

  readTime: '2 min read'
},
{
  id: 'tip-5',
  title: 'Staying Well in Monsoon',
  description:
  'Safe drinking water, mosquito precautions and food hygiene are the basics that reduce common seasonal illnesses.',
  category: 'Diseases',
  image: "/57250ef6-6297-4b6a-987a-40b3253752ce.jpg",

  readTime: '3 min read'
},
{
  id: 'tip-6',
  title: 'Everyday Plate Balance',
  description:
  'A practical way to think about meals: half vegetables, a quarter whole grains and a quarter protein, with water alongside.',
  category: 'Nutrition',
  image: "/170f536b-fefb-407e-a80b-6318edd2de2d.jpg",

  readTime: '3 min read'
}];


export const tipTabs = ['All Tips', 'Diseases', 'Nutrition', 'Fitness'];