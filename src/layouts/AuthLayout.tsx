import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-brand-tint2">
      <div className="mx-auto flex w-full max-w-shell items-center px-6 py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-2xs text-ink-500 transition-colors duration-150 ease-out hover:text-navy">
          
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          Back to website
        </Link>
      </div>
      <main className="flex flex-1 items-start justify-center px-6 pb-16 pt-4">
        <Outlet />
      </main>
      <p className="pb-8 text-center text-2xs text-ink-400">
        Demo interface — no real authentication is performed.
      </p>
    </div>);

}