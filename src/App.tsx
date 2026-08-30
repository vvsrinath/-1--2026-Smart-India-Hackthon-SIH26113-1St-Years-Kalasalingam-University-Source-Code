import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AppRoutes } from './routes/AppRoutes';
import { useScrollToTop } from './hooks/useScrollToTop';
import { InstallAppBanner } from './components/pwa/InstallAppBanner';
import { NativeTitleBar } from './components/pwa/NativeTitleBar';
import { OfflineStatus } from './components/pwa/OfflineStatus';
import { ChatWidget } from './components/chat/ChatWidget';

function AppShell() {
  useScrollToTop();
  const [installDismissed, setInstallDismissed] = useState(false);

  return (
    <>
      <NativeTitleBar />
      <OfflineStatus />
      <AppRoutes />
      <ChatWidget />
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
