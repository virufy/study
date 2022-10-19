import React, { useMemo } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { createStore, setStorageType } from 'little-state-machine';

// Helper
import { localstoragePrefix } from 'helper/basePathHelper';

// Wizard
import Wizard from 'components/Wizard';

// Components
import DotIndicators from 'components/DotIndicators';
import {
  getCountry, getWelcomeStepsWithoutDots, welcomeStepsDefinitions,
} from 'helper/stepsDefinitions';

setStorageType(window.localStorage);

const StoreKey = 'welcome';

createStore({
  [StoreKey]: {},
}, {
  name: `${localstoragePrefix}_VirufyWizard`,
});

const Welcome = () => {
  // Hooks
  const location = useLocation();
  const match = useRouteMatch();
  const country = getCountry();

  const url = location.pathname.replace(match.url, '');

  const stepsWithoutDots = useMemo(() => getWelcomeStepsWithoutDots(StoreKey, country), [country]);

  const currentSteps = useMemo(() => welcomeStepsDefinitions(StoreKey, country), [country]);

  const active = currentSteps.findIndex(step => step.path === url);

  return (
    <Wizard
      steps={[...stepsWithoutDots, ...currentSteps]}
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
