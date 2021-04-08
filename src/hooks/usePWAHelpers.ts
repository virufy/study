/* eslint-disable func-names */
import React from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<string>;
}

declare global {

  interface App {
    id: string;
  }
  interface Navigator {
    standalone?: boolean; // Available on Apple's iOS Safari only.
    getInstalledRelatedApps?: () => Promise<App[] | null>; // Available on chrome only
  }
}

const usePWAHelpers = (buttonId: string) => {
  const deferredInstallPromptRef = React.useRef<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    // BeforeInstallPrompt
    const beforeInstallPromptFn = function (e: BeforeInstallPromptEvent) {
      e.preventDefault();
      deferredInstallPromptRef.current = e;

      const installButton = document.getElementById(buttonId);
      if (installButton) {
        installButton.addEventListener('click', () => {
          e.prompt();
        });
      }
    };
    window.addEventListener('beforeinstallprompt', beforeInstallPromptFn as EventListener);

    // App Installed
    const appInstalledFn = () => {
      setIsInstalled(true);
    };
    window.addEventListener('appinstalled', appInstalledFn as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptFn as EventListener);
      window.removeEventListener('appinstalled', appInstalledFn as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    if (isStandalone) {
      setIsInstalled(true);
    } else if (window.navigator.getInstalledRelatedApps) {
      window.navigator.getInstalledRelatedApps().then(r => {
        if (r) {
          setIsInstalled(r.length > 0);
        }
      });
    }
  }, []);

  const handlePrompt = React.useCallback(() => {
    if (deferredInstallPromptRef.current) {
      return deferredInstallPromptRef.current.userChoice;
    }
    return undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredInstallPromptRef.current]);

  return {
    isInstalled,
    setIsInstalled,
    handlePrompt,
  };
};

export default usePWAHelpers;
