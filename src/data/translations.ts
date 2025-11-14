import { en } from './translations/en';
import { es } from './translations/es';
import { fr } from './translations/fr';

export type Language = 'fr' | 'en' | 'es';

type Translations = typeof en;

export const translations: Record<Language, Translations> = {
  fr,
  en,
  es,
};
