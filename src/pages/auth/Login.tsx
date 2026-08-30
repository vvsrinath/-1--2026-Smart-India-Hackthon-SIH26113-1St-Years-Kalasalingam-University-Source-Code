import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  GlobeIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  UserIcon,
  UsersIcon
} from 'lucide-react';
import { Logo } from '../../components/navigation/Logo';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useLanguage } from '../../context/LanguageContext';

const roles = [
  { icon: UserIcon, label: 'Patient', detail: 'Ramesh Kumar', to: '/patient' },
  { icon: StethoscopeIcon, label: 'Doctor', detail: 'Dr. Arjun Sharma', to: '/doctor' },
  { icon: UsersIcon, label: 'Specialist', detail: 'Dr. Neha Verma', to: '/specialist' }
];

type Step = 'splash' | 'language' | 'login' | 'otp' | 'role';

export function Login() {
  const [step, setStep] = useState<Step>('splash');
  const [identity, setIdentity] = useState('');
  const [otp, setOtp] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const { language, setLanguage, languages } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 'splash') {
      const timeout = window.setTimeout(() => setStep('language'), 1200);
      return () => window.clearTimeout(timeout);
    }
  }, [step]);

  const nextStep = () => {
    if (step === 'language') setStep('login');
    if (step === 'login') setStep('otp');
    if (step === 'otp') setStep('role');
  };

  return (
    <div className="w-full max-w-[420px] mx-auto px-3 py-6 sm:px-0">
      <div className="rounded-[24px] border border-line bg-white p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-center">
          <Logo to="" size="md" />
        </div>

        {step === 'splash' && (
          <div className="mt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-tint text-brand">
              <ShieldCheckIcon className="h-8 w-8" />
            </div>
            <h1 className="mt-6 text-xl font-semibold text-navy">Swasthya Sathi</h1>
            <p className="mt-2 text-sm text-ink-500">Connecting Every Village to Better Healthcare</p>
            <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-line-soft">
              <div className="h-full w-2/3 rounded-full bg-brand" />
            </div>
          </div>
        )}

        {step === 'language' && (
          <div className="mt-6">
            <h1 className="text-xl font-semibold text-navy">Choose language</h1>
            <p className="mt-1 text-sm text-ink-500">Select your preferred language to continue.</p>
            <div className="mt-5 grid gap-2">
              {languages.slice(0, 8).map((option) => (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => {
                    setLanguage(option.code);
                    nextStep();
                  }}
                  className={`flex items-center justify-between rounded-2xl border px-3 py-3 text-left ${language === option.code ? 'border-brand/40 bg-brand-tint text-brand' : 'border-line bg-white text-navy'}`}>
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-line-soft">
                      <GlobeIcon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">{option.label}</span>
                      <span className="block text-xs text-ink-500">{option.nativeLabel}</span>
                    </span>
                  </span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'login' && (
          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              nextStep();
            }}
          >
            <h1 className="text-xl font-semibold text-navy">Welcome back</h1>
            <p className="mt-1 text-sm text-ink-500">Sign in with your mobile number or email.</p>

            <div className="mt-5 space-y-3">
              <Input
                label={useOtp ? 'Mobile number' : 'Email or mobile number'}
                name="identity"
                value={identity}
                onChange={(event) => setIdentity(event.target.value)}
                placeholder={useOtp ? '+91 90000 00000' : 'you@example.com'}
                required
              />

              <Button type="submit" fullWidth size="lg">
                Continue
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setUseOtp((prev) => !prev)}
              className="mt-3 w-full text-center text-xs font-medium text-brand hover:text-brand-dark"
            >
              {useOtp ? 'Use email instead' : 'Continue with OTP instead'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              nextStep();
            }}
          >
            <h1 className="text-xl font-semibold text-navy">Verify OTP</h1>
            <p className="mt-1 text-sm text-ink-500">Enter the 6-digit code sent to +91 90000 00000.</p>

            <div className="mt-5 space-y-3">
              <Input
                label="OTP"
                name="otp"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder="123456"
                required
              />

              <Button type="submit" fullWidth size="lg">
                Verify OTP
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setStep('login')}
              className="mt-3 w-full text-center text-xs font-medium text-ink-500 hover:text-navy"
            >
              Back
            </button>
          </form>
        )}

        {step === 'role' && (
          <div className="mt-6">
            <h1 className="text-xl font-semibold text-navy">Continue as</h1>
            <p className="mt-1 text-sm text-ink-500">Choose a demo workspace to explore.</p>
            <div className="mt-5 space-y-2">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.label}
                    type="button"
                    onClick={() => navigate(role.to)}
                    className="flex w-full items-center gap-3 rounded-2xl border border-line px-3 py-2.5 text-left transition-colors hover:border-brand/30 hover:bg-brand-tint2"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-tint text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-navy">{role.label}</span>
                      <span className="block truncate text-xs text-ink-500">{role.detail}</span>
                    </span>
                    <ArrowRightIcon className="h-4 w-4 text-ink-400" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="mt-5 border-t border-line-soft pt-4 text-center text-[11px] leading-5 text-ink-400">
          Demo authentication only. No real credentials are stored or verified.
        </p>
      </div>
    </div>
  );
}
