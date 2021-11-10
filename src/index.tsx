import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import 'react-datepicker/dist/react-datepicker.css';

// Sentry
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Utils
import swConfig from 'utils/swConfig';

// Service Work
import * as serviceWorker from './serviceWorker';

import './i18n';

const StartApp = loadable(() => import('./start'), {
  fallback: <div>Loading</div>,
});

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    release: `${process.env.REACT_APP_NAME} @ v${process.env.REACT_APP_VERSION}`,
    environment: process.env.REACT_APP_SENTRY_ENV || 'unknown',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <>
    <StartApp />
  </>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env.NODE_ENV !== 'production') {
  serviceWorker.unregister();
} else {
  serviceWorker.register(swConfig);
}
