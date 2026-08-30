import { GlobeIcon } from 'lucide-react';
import { Dropdown } from '../common/Dropdown';
import { useLanguage } from '../../context/LanguageContext';
import type { LanguageCode } from '../../context/LanguageContext';

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { language, setLanguage, languages } = useLanguage();

  return (
    <Dropdown
      ariaLabel="Select language"
      size="sm"
      className={className ?? 'w-[112px]'}
      menuClassName="w-[230px]"
      icon={<GlobeIcon className="h-3.5 w-3.5 text-ink-400" />}
      value={language}
      onChange={(value) => setLanguage(value as LanguageCode)}
      options={languages.map((option) => ({
        value: option.code,
        label: option.label,
        hint: option.code === 'en' ? undefined : option.nativeLabel
      }))}
      footnote="English content is complete. Other scheduled languages are supported in the interface and will show English text until their translations are added." />);


}