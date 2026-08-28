import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRightIcon,
  StethoscopeIcon,
  UserIcon,
  UsersIcon } from
'lucide-react';
import { Logo } from '../../components/navigation/Logo';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

const roles = [
{
  icon: UserIcon,
  label: 'Patient',
  detail: 'Ramesh Kumar',
  to: '/patient'
},
{
  icon: StethoscopeIcon,
  label: 'Doctor',
  detail: 'Dr. Arjun Sharma',
  to: '/doctor'
},
{
  icon: UsersIcon,
  label: 'Specialist',
  detail: 'Dr. Neha Verma',
  to: '/specialist'
}];


export function Login() {
  const [step, setStep] = useState<'identity' | 'role'>('identity');
  const [identity, setIdentity] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[380px]">
      <div className="rounded-card border border-line bg-white p-6 shadow-card">
        <Logo to="" size="md" />

        {step === 'identity' ?
        <form
          className="mt-6"
          onSubmit={(event) => {
            event.preventDefault();
            setStep('role');
          }}>
          
            <h1 className="text-base font-semibold text-navy">
              Welcome to Swastya Sathi
            </h1>
            <p className="mt-1 text-2xs text-ink-500">
              Sign in to manage appointments, referrals and follow-up care.
            </p>

            <div className="mt-5 space-y-3">
              <Input
              label={useOtp ? 'Mobile number' : 'Email or mobile number'}
              name="identity"
              value={identity}
              onChange={(event) => setIdentity(event.target.value)}
              placeholder={useOtp ? '+91 90000 00000' : 'you@example.com'}
              required />
            
              <Button type="submit" fullWidth size="lg">
                Continue
              </Button>
            </div>

            <button
            type="button"
            onClick={() => setUseOtp((prev) => !prev)}
            className="mt-3 w-full text-center text-2xs font-medium text-brand transition-colors duration-150 ease-out hover:text-brand-dark">
            
              {useOtp ? 'Use email or mobile instead' : 'Continue with OTP instead'}
            </button>

            <p className="mt-5 border-t border-line-soft pt-4 text-2xs leading-5 text-ink-400">
              By continuing you agree to our terms and privacy policy. This prototype
              uses demo authentication — no credentials are collected or verified.
            </p>
          </form> :

        <div className="mt-6">
            <h1 className="text-base font-semibold text-navy">Continue as</h1>
            <p className="mt-1 text-2xs text-ink-500">
              Choose a demo workspace to explore. All profiles are illustrative.
            </p>

            <div className="mt-5 space-y-2">
              {roles.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.label}
                  type="button"
                  onClick={() => navigate(role.to)}
                  className="flex w-full items-center gap-3 rounded-card border border-line px-3 py-2.5 text-left transition-colors duration-150 ease-out hover:border-brand/30 hover:bg-brand-tint2">
                  
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-navy">
                        {role.label}
                      </span>
                      <span className="block truncate text-2xs text-ink-500">
                        {role.detail}
                      </span>
                    </span>
                    <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-ink-400" />
                  </button>);

            })}
            </div>

            <button
            type="button"
            onClick={() => setStep('identity')}
            className="mt-4 w-full text-center text-2xs font-medium text-ink-500 transition-colors duration-150 ease-out hover:text-navy">
            
              Back
            </button>
          </div>
        }
      </div>
    </div>);

}