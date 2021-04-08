import React from 'react';
import ReactDOM from 'react-dom';
import loadable from '@loadable/component';
import 'react-datepicker/dist/react-datepicker.css';

import './i18n';

// Utils
import swConfig from 'utils/swConfig';

// Service Work
import * as serviceWorker from './serviceWorker';

const StartApp = loadable(() => import('./start'), {
  fallback: <div>Loading</div>,
});

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
