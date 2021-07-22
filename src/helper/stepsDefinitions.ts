const baseUrl = '/submit-steps';
const baseComponentPath = 'SubmitSteps';
const middleComponentPathRecording = 'RecordingsSteps';
const middleComponentPathQuestionary = 'Questionary';
const middleComponentPathSubmission = 'Submission';
const recordYourCoughLogic = 'recordYourCough';
const recordYourSpeechLogic = 'recordYourSpeech';

export const allowSpeechIn: string[] = [
  'Colombia',
];
export const removeQuestionaryStep6In: string[] = [];
export const removeQuestionaryStep2cIn: string[] = ['Colombia'];

function getWizardData() {
  try {
    const output = JSON.parse(window.localStorage.getItem('VirufyWizard') || '{}');
    return output;
  } catch {
    return {};
  }
}

export function getCountry() {
  const data = getWizardData();
  return data?.welcome?.country ?? '';
}

export function getPatientId() {
  const data = getWizardData();
  return data?.welcome?.patientId ?? '';
}

export function getSpeechContext() {
  const country = getCountry();
  if (allowSpeechIn.includes(country)) {
    return 'voice';
  }
  return 'cough';
}

function getCoughSteps(storeKey: string, country: string, patientId?: string) {
  return [
    {
      path: '/step-record/cough',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/Introduction`,
      props: {
        storeKey,
        previousStep: patientId ? '/welcome/patientSummary' : '/welcome/step-5',
        nextStep: `${baseUrl}/step-listen/cough`,
        otherSteps: {
          manualUploadStep: `${baseUrl}/step-manual-upload/cough`,
        },
        metadata: {
          currentLogic: recordYourCoughLogic,
        },
      },
    },
    {
      path: '/step-manual-upload/cough',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/RecordManualUpload`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/step-record/cough`,
        nextStep: `${baseUrl}/step-listen/cough`,
        metadata: {
          currentLogic: recordYourCoughLogic,
        },
      },
    },
    {
      path: '/step-listen/cough',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/ListenAudio`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/step-record/cough`,
        nextStep: (() => {
          if (!allowSpeechIn.includes(country)) {
            if (patientId) {
              return `${baseUrl}/thank-you`;
            }
            return `${baseUrl}/questionary/step1a`;
          }
          return `${baseUrl}/step-record/speech`;
        })(),
        metadata: {
          currentLogic: recordYourCoughLogic,
          nextSpeech: !allowSpeechIn.includes(country),
        },
      },
    },
  ];
}

function getSpeechSteps(storeKey: string, country: string, patientId: string) {
  if (!allowSpeechIn.includes(country)) {
    return [];
  }
  return [
    {
      path: '/step-record/speech',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/Introduction`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/step-listen/cough`,
        nextStep: `${baseUrl}/step-listen/speech`,
        otherSteps: {
          manualUploadStep: `${baseUrl}/step-manual-upload/speech`,
        },
        metadata: {
          currentLogic: recordYourSpeechLogic,
        },
      },
    },
    {
      path: '/step-manual-upload/speech',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/RecordManualUpload`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/step-record/speech`,
        nextStep: `${baseUrl}/step-listen/speech`,
        metadata: {
          currentLogic: recordYourSpeechLogic,
        },
      },
    },
    {
      path: '/step-listen/speech',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/ListenAudio`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/step-record/speech`,
        nextStep: patientId ? `${baseUrl}/thank-you` : `${baseUrl}/questionary/step1a`,
        metadata: {
          currentLogic: recordYourSpeechLogic,
        },
      },
    },
  ];
}

function getQuestionarySteps(storeKey: string, country: string, patientId: string) {
  const baseMetadata = {
    total: (() => {
      if (!removeQuestionaryStep6In.includes(country) && !removeQuestionaryStep2cIn.includes(country) && !patientId) {
        return 8;
      }
      if (!removeQuestionaryStep6In.includes(country) && !removeQuestionaryStep2cIn.includes(country) && patientId) {
        return 7;
      }
      if (!removeQuestionaryStep6In.includes(country) && removeQuestionaryStep2cIn.includes(country) && patientId) {
        return 6;
      }
      return 7;
    })(),
    progressCurrent: !allowSpeechIn.includes(country) ? 1 : 2,
    progressTotal: !allowSpeechIn.includes(country) ? 1 : 2,
  };
  const output = [
    {
      path: '/questionary/step1a',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step1a`,
      props: {
        storeKey,
        previousStep: !allowSpeechIn.includes(country) ? `${baseUrl}/step-listen/cough` : `${baseUrl}/step-listen/speech`,
        nextStep: `${baseUrl}/questionary/step1b`,
        otherSteps: {
          noTestStep: `${baseUrl}/questionary/step2`,
        },
        metadata: {
          patientId,
          current: 1,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step1b',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step1b`,
      props: {
        storeKey,
        previousStep: patientId ? '/welcome/patientSummary' : `${baseUrl}/questionary/step1a`,
        nextStep: patientId ? `${baseUrl}/thank-you` : `${baseUrl}/questionary/step2`,
        metadata: {
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step2',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step2`,
      props: {
        storeKey,
        previousStep: patientId ? '/welcome/patientSummary' : `${baseUrl}/questionary/step1b`,
        nextStep: `${baseUrl}/questionary/step2a`,
        otherSteps: {
          noTestStep: `${baseUrl}/questionary/step1a`,
        },
        metadata: {
          current: patientId ? 1 : 2,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step2a',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step2a`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step2`,
        nextStep: `${baseUrl}/questionary/step2b`,
        metadata: {
          current: patientId ? 2 : 3,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step2b',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step2b`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step2a`,
        nextStep: removeQuestionaryStep2cIn.includes(country)
          ? `${baseUrl}/questionary/step3`
          : `${baseUrl}/questionary/step2c`,
        metadata: {
          current: patientId ? 3 : 4,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step2c',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step2c`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step2b`,
        nextStep: `${baseUrl}/questionary/step3`,
        metadata: {
          current: patientId ? 4 : 5,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step3',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step3`,
      props: {
        storeKey,
        previousStep: removeQuestionaryStep2cIn.includes(country)
          ? `${baseUrl}/questionary/step2b`
          : `${baseUrl}/questionary/step2c`,
        nextStep: `${baseUrl}/questionary/step4a`,
        metadata: {
          current: (() => {
            if ((patientId && !removeQuestionaryStep2cIn.includes(country))
            || (!patientId && removeQuestionaryStep2cIn.includes(country))) {
              return 5;
            } if (patientId && removeQuestionaryStep2cIn.includes(country)) {
              return 4;
            }
            return 6;
          })(),
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step4a',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step4a`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step3`,
        nextStep: `${baseUrl}/questionary/step6`,
        otherSteps: {
          covidSymptomsStep: `${baseUrl}/questionary/step4b`,
        },
        metadata: {
          current: (() => {
            if ((patientId && !removeQuestionaryStep2cIn.includes(country))
            || (!patientId && removeQuestionaryStep2cIn.includes(country))) {
              return 6;
            } if (patientId && removeQuestionaryStep2cIn.includes(country)) {
              return 5;
            }
            return 7;
          })(),
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step4b',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step4b`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step4a`,
        nextStep: `${baseUrl}/questionary/step6`,
        metadata: {
          ...baseMetadata,
        },
      },
    },
    /* {
      path: '/questionary/step5',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step5`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step4a`,
        nextStep: removeQuestionaryStep6In.includes(country)
          ? `${baseUrl}/thank-you`
          : `${baseUrl}/questionary/step6`,
        metadata: {
          current: 8,
          ...baseMetadata,
        },
      },
    }, */
  ];

  if (!removeQuestionaryStep6In.includes(country)) {
    output.push({
      path: '/questionary/step6',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step6`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step4a`,
        nextStep: `${baseUrl}/thank-you`,
        metadata: {
          current: (() => {
            if ((patientId && !removeQuestionaryStep2cIn.includes(country))
            || (!patientId && removeQuestionaryStep2cIn.includes(country))) {
              return 7;
            } if (patientId && removeQuestionaryStep2cIn.includes(country)) {
              return 6;
            }
            return 8;
          })(),
          ...baseMetadata,
        },
      },
    });
  }
  return output;
}

export default function stepsDefinition(storeKey: string, country: string, patientId: string) {
  const steps: Wizard.Step[] = [
    // Record Your Cough Steps
    ...getCoughSteps(storeKey, country, patientId),
    // Record Your Speech Steps
    ...getSpeechSteps(storeKey, country, patientId),
    // Questionary
    ...getQuestionarySteps(storeKey, country, patientId),
    {
      path: '/thank-you',
      componentPath: `${baseComponentPath}/${middleComponentPathSubmission}/ThankYou`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/before-submit`,
        nextStep: patientId ? '/welcome/patientSummary' : '/welcome',
      },
    },
  ];

  return steps;
}
