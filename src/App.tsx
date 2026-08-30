import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoutes } from './routes/AppRoutes';
import { useScrollToTop } from './hooks/useScrollToTop';
import { InstallAppBanner } from './components/pwa/InstallAppBanner';
import { NativeTitleBar } from './components/pwa/NativeTitleBar';
import { OfflineStatus } from './components/pwa/OfflineStatus';

function AppShell() {
  useScrollToTop();
  const [installDismissed, setInstallDismissed] = useState(false);

  return (
    <>
      <NativeTitleBar />
      <OfflineStatus />
      <AppRoutes />
      {!installDismissed && <InstallAppBanner onDismiss={() => setInstallDismissed(true)} />}
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </BrowserRouter>
  );
}
