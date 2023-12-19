import '../styles/globals.css';
import { UserProvider } from 'context/user-context/user-context';
import { useState } from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import PageNotFound from './404';
import PasswordProtectionTakeover from '@/components/password-protection-takeover/password-protection-takeover';
import GoogleAnalytics from '@/components/shared/google-analytics/google-analytics';
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const { isPagePublished, isPasswordProtected } = pageProps;
  const [showPasswordProtectionTakeover, setShowPasswordProtectionTakeover] =
    useState(true);

  if (!isPagePublished) return <PageNotFound />;
  if (isPasswordProtected && showPasswordProtectionTakeover)
    return (
      <PasswordProtectionTakeover
        setShowPasswordProtectionTakeover={setShowPasswordProtectionTakeover}
      />
    );
  return (
    <>
      <GoogleAnalytics />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}
