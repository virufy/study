import React from 'react';
import { createStore, setStorageType, useStateMachine } from 'little-state-machine';
import { useHistory } from 'react-router-dom';
import { localstoragePrefix } from 'helper/basePathHelper';

// Wizard
import Wizard from 'components/Wizard';

// Local
import stepsDefinition, { getCountry, getPatientId } from 'helper/stepsDefinitions';

setStorageType(window.localStorage);

const StoreKey = 'submit-steps';

createStore({
  [StoreKey]: {
    recordYourCough: {
      recordingFile: null,
      uploadedFile: null,
    },
    recordYourBreath: {
      recordingFile: null,
      uploadedFile: null,
    },
    recordYourSpeech: {
      recordingFile: null,
      uploadedFile: null,
    },
  },
}, {
  name: `${localstoragePrefix}_VirufyWizard`,
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
      if (!inputState.welcome?.patientId && inputState[StoreKey]) {
        const { recordYourCough, recordYourSpeech, recordYourBreath } = inputState[StoreKey];
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
        if (recordYourBreath) {
          const { recordingFile, uploadedFile } = recordYourBreath;
          if (recordingFile) {
            toTest.push({ file: recordingFile, route: '/step-record/breath' });
          }
          if (uploadedFile) {
            toTest.push({ file: uploadedFile, route: '/step-manual-upload/breath' });
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

    if (problemRoute && problemRoute !== '/step-record/cough' && getCountry() !== 'Japan') {
      history.push(`/${StoreKey}${problemRoute}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

const WrapperSubmitSteps = () => {
  const country = getCountry();
  const patientId = getPatientId();
  const steps = React.useMemo(() => stepsDefinition(StoreKey, country, patientId), [country, patientId]);
  return (
    <Wizard
      steps={steps}
    >
      <SubmitSteps />
    </Wizard>
  );
};

export default React.memo(WrapperSubmitSteps);
