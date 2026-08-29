import en from './en.json';
import hi from './hi.json';
import ta from './ta.json';
import te from './te.json';
import mr from './mr.json';
import bn from './bn.json';
import gu from './gu.json';
import kn from './kn.json';
import ml from './ml.json';
import or from './or.json';
import pa from './pa.json';
import ur from './ur.json';

export const translations = {
  en,
  hi,
  ta,
  te,
  mr,
  bn,
  gu,
  kn,
  ml,
  or,
  pa,
  ur,
} as const;

export type TranslationKey = keyof typeof en;
