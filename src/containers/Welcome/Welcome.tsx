import React from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { createStore, setStorageType } from 'little-state-machine';

// Helper
import { localstoragePrefix } from 'helper/basePathHelper';

// Wizard
import Wizard from 'components/Wizard';

// Components
import DotIndicators from 'components/DotIndicators';
import { getCountry } from 'helper/stepsDefinitions';

setStorageType(window.localStorage);

const StoreKey = 'welcome';

createStore({
  [StoreKey]: {},
}, {
  name: `${localstoragePrefix}_VirufyWizard`,
});

const baseUrl = '/welcome';

const country = getCountry();

const stepsWithoutDots: Wizard.Step[] = [
  {
    path: '',
    componentPath: 'Welcome/Step1',
    props: {
      storeKey: StoreKey,
      nextStep: `${baseUrl}/step-2`,
      otherSteps: {
        nextStepPatient: `${baseUrl}/patientSummary`,
      },
    },
  },
  {
    path: '/step-2',
    componentPath: 'Welcome/Step2',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}`,
      nextStep: country !== 'Japan' ? `${baseUrl}/step-3` : `${baseUrl}/step-4`,
    },
  },
  {
    path: '/patientSummary',
    componentPath: 'Welcome/PatientSummary',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}`,
      // nextStep: `${baseUrl}/step-3`,
    },
  },
];

const steps: Wizard.Step[] = [
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
      nextStep: `${baseUrl}/step-5`,
    },
  },
  {
    path: '/step-5',
    componentPath: 'Welcome/Step5',
    props: {
      storeKey: StoreKey,
      previousStep: `${baseUrl}/step-4`,
      nextStep: '/submit-steps/step-record/cough',
    },
  },
];

const Welcome = () => {
  // Hooks
  const location = useLocation();
  const match = useRouteMatch();

  const url = location.pathname.replace(match.url, '');
  const currentSteps = country !== 'Japan' ? steps : steps.slice(1, steps.length);
  const active = currentSteps.findIndex(step => step.path === url);

  return (
    <Wizard
      steps={[...stepsWithoutDots, ...steps]}
    >
      {active >= 0 && (
        <DotIndicators
          current={active}
          total={currentSteps.length}
        />
      )}
    </Wizard>
  );
};

export default React.memo(Welcome);
