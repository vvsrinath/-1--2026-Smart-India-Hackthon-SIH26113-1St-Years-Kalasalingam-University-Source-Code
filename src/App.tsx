import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoutes } from './routes/AppRoutes';
import { useScrollToTop } from './hooks/useScrollToTop';

function AppShell() {
  useScrollToTop();
  return <AppRoutes />;
}

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>);

}