import React from 'react';
import { createStore, setStorageType } from 'little-state-machine';

// Wizard
import { useRouteMatch, useLocation } from 'react-router-dom';
import Wizard from 'components/Wizard';
import DotIndicators from 'components/DotIndicators';

setStorageType(window.localStorage);

const StoreKey = 'welcome';

createStore({
  [StoreKey]: {},
}, {
  name: 'VirufyWizard',
});

const baseUrl = '/welcome';

const steps: Wizard.Step[] = [
  {
    path: '',
    componentPath: 'Welcome/Step1',
    props: {
      storeKey: StoreKey,
      nextStep: `${baseUrl}/step-2`,
    },
  },
  {
    path: '/step-2',
    componentPath: 'Welcome/Step2',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}`,
      nextStep: `${baseUrl}/step-3`,
    },
  },
  {
    path: '/step-3',
    componentPath: 'Welcome/Step3',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}/step-2`,
      nextStep: `${baseUrl}/step-4`,
    },
  },
  {
    path: '/step-4',
    componentPath: 'Welcome/Step4',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}/step-3`,
      nextStep: '/submit-steps/step-record/cough',
    },
  },
];

const Welcome = () => {
  // Hooks
  const location = useLocation();
  const match = useRouteMatch();

  const url = location.pathname.replace(match.url, '');
  const active = steps.findIndex(step => step.path === url);

  return (
    <Wizard
      steps={steps}
    >
      <DotIndicators
        current={active}
        total={steps.length}
      />
    </Wizard>
  );
};

export default React.memo(Welcome);
