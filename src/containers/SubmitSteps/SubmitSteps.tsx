import React from 'react';
import { createStore, setStorageType, useStateMachine } from 'little-state-machine';
import { useHistory } from 'react-router-dom';

// Wizard
import Wizard from 'components/Wizard';

// Local
import stepsDefinition, { getCountry } from 'helper/stepsDefinitions';

setStorageType(window.localStorage);

const StoreKey = 'submit-steps';

createStore({
  [StoreKey]: {
    recordYourCough: {
      recordingFile: null,
      uploadedFile: null,
    },
    recordYourSpeech: {
      recordingFile: null,
      uploadedFile: null,
    },
  },
}, {
  name: 'VirufyWizard',
});

const SubmitSteps = () => {
  // Hooks
  const { state } = useStateMachine();
  const history = useHistory();

  // Effects
  React.useEffect(() => {
    const checkFileProblem = (file: File) => {
      if (file && file.size === undefined) {
        return true;
      }
      return false;
    };

    const checkFileConsistencyProblem = (inputState: Record<string, any>) => {
      let out = null;

      if (inputState[StoreKey]) {
        const { recordYourCough, recordYourSpeech } = inputState[StoreKey];
        const toTest = [];

        if (recordYourCough) {
          const { recordingFile, uploadedFile } = recordYourCough;
          if (recordingFile) {
            toTest.push({ file: recordingFile, route: '/step-record/cough' });
          }
          if (uploadedFile) {
            toTest.push({ file: uploadedFile, route: '/step-manual-upload/cough' });
          }
        }
        if (recordYourSpeech) {
          const { recordingFile, uploadedFile } = recordYourCough;
          if (recordingFile) {
            toTest.push({ file: recordingFile, route: '/step-record/speech' });
          }
          if (uploadedFile) {
            toTest.push({ file: uploadedFile, route: '/step-manual-upload/speech' });
          }
        }

        const itemWithProblem = toTest.find(toTestItem => checkFileProblem(toTestItem.file));
        if (itemWithProblem) {
          out = itemWithProblem.route;
        }
      }

      return out;
    };

    const problemRoute = checkFileConsistencyProblem(state);
    if (problemRoute) {
      history.push(`/${StoreKey}${problemRoute}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const WrapperSubmitSteps = () => {
  const country = getCountry();
  const steps = React.useMemo(() => stepsDefinition(StoreKey, country), [country]);
  return (
    <Wizard
      steps={steps}
    >
      <SubmitSteps />
    </Wizard>
  );
};

export default React.memo(WrapperSubmitSteps);
