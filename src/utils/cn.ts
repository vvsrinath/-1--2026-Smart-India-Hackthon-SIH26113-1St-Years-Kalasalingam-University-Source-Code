import { twMerge } from 'tailwind-merge';

/** Joins conditional class names and de-duplicates conflicting Tailwind utilities. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return twMerge(classes.filter(Boolean).join(' '));
}