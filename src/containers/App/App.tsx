import React from 'react';
import loadable from '@loadable/component';
import {
  Switch, Route, Redirect, useLocation,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import uuid from 'react-uuid';

// Components
import FullWidth from 'components/FullWidthDiv';
import Header, { HeaderContextProvider } from 'components/Header';
import FooterReportProblems from 'components/FooterReportProblems';
import FooterInstallAsApp from 'components/FooterInstallAsApp';

// Helper
import { getPatientId } from 'helper/stepsDefinitions';

// Styles
import { AppContainer } from './style';

const AsyncLoad = loadable(({ container }: { container: string }) => import(`containers/${container}`), {
  fallback: <div>Loading ...</div>,
});

declare global {
  interface Window {
    sourceCampaign?: string | null;
  }
}

const userCookie = {
  mode: uuid(),
};

const date = new Date('1/1/2999');

const App = () => {
  const { pathname, search } = useLocation();
  const patientId = getPatientId();

  const [cookies, setCookie] = useCookies(['virufy-study-user']);

  React.useEffect(() => {
    const params = new URLSearchParams(search);
    window.sourceCampaign = params.get('utm_campaign');

    if (cookies['virufy-study-user']) return;

    setCookie('virufy-study-user', JSON.stringify(userCookie), {
      expires: date,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effects
  React.useEffect(() => {
    const gtmDataLayer = (window as any).dataLayer;

    gtmDataLayer.push({
      event: 'pageview',
      page: {
        url: pathname + search,
      },
    });
  }, [pathname, search]);

  return (
    <AppContainer>
      <HeaderContextProvider>
        <Header />
        <FullWidth style={{ flex: 1 }}>
          <Switch>
            <Route path="/welcome">
              <AsyncLoad key="Welcome" container="Welcome" />
            </Route>
            <Redirect exact from="/" to="/welcome" />
            <Route path="/submit-steps">
              <AsyncLoad key="SubmitSteps" container="SubmitSteps" />
            </Route>
            <Route>
              <div>404 Page</div>
            </Route>
            <Redirect exact from="/" to="/welcome" />
          </Switch>
        </FullWidth>
        { patientId && <FooterReportProblems /> }
        {(!patientId && !pathname.includes('/submit-steps/thank-you')) && <FooterReportProblems /> }
        <FooterInstallAsApp />
      </HeaderContextProvider>
    </AppContainer>
  );
};

export default App;
