const baseUrl = '/submit-steps';
const baseComponentPath = 'SubmitSteps';
const middleComponentPathRecording = 'RecordingsSteps';
const middleComponentPathQuestionary = 'Questionary';
const middleComponentPathSubmission = 'Submission';
const recordYourCoughLogic = 'recordYourCough';
const recordYourSpeechLogic = 'recordYourSpeech';

export const removeSpeechIn: string[] = [
  'Argentina',
  'Bolivia',
  'Brazil',
  'Colombia',
  'Mexico',
  'Pakistan',
  'Peru',
  'United States',
];
export const removeQuestionaryStep6In: string[] = [];

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

export function getSpeechContext() {
  const country = getCountry();
  if (removeSpeechIn.includes(country)) {
    return 'cough';
  }
  return 'voice';
}

function getCoughSteps(storeKey: string, country: string) {
  return [
    {
      path: '/step-record/cough',
      componentPath: `${baseComponentPath}/${middleComponentPathRecording}/Introduction`,
      props: {
        storeKey,
        previousStep: '/welcome/step-5',
        nextStep: `${baseUrl}/step-listen/cough`,
        otherSteps: {
          manualUploadStep: `${baseUrl}/step-manual-upload/cough`,
        },
        metadata: {
          currentLogic: recordYourCoughLogic,
          progressCurrent: 1,
          progressTotal: removeSpeechIn.includes(country) ? 2 : 3,
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
        nextStep: removeSpeechIn.includes(country)
          ? `${baseUrl}/questionary/step1a`
          : `${baseUrl}/step-record/speech`,
        metadata: {
          currentLogic: recordYourCoughLogic,
        },
      },
    },
  ];
}

function getSpeechSteps(storeKey: string, country: string) {
  if (removeSpeechIn.includes(country)) {
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
          progressCurrent: 2,
          progressTotal: 3,
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
        nextStep: `${baseUrl}/questionary/step1a`,
        metadata: {
          currentLogic: recordYourSpeechLogic,
        },
      },
    },
  ];
}

function getQuestionarySteps(storeKey: string, country: string) {
  const baseMetadata = {
    total: removeQuestionaryStep6In.includes(country) ? 5 : 6,
    progressCurrent: removeSpeechIn.includes(country) ? 2 : 3,
    progressTotal: removeSpeechIn.includes(country) ? 2 : 3,
  };
  const output = [
    {
      path: '/questionary/step1a',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step1a`,
      props: {
        storeKey,
        previousStep: removeSpeechIn.includes(country)
          ? `${baseUrl}/step-listen/cough`
          : `${baseUrl}/step-listen/speech`,
        nextStep: `${baseUrl}/questionary/step1b`,
        otherSteps: {
          noTestStep: `${baseUrl}/questionary/step2`,
        },
        metadata: {
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
        previousStep: `${baseUrl}/questionary/step1a`,
        nextStep: `${baseUrl}/questionary/step2`,
        metadata: {
          current: 1,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step2',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step2`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step1b`,
        nextStep: `${baseUrl}/questionary/step3`,
        otherSteps: {
          noTestStep: `${baseUrl}/questionary/step1a`,
        },
        metadata: {
          current: 2,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step3',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step3`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step2`,
        nextStep: `${baseUrl}/questionary/step4a`,
        metadata: {
          current: 3,
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
        nextStep: `${baseUrl}/questionary/step5`,
        otherSteps: {
          covidSymptomsStep: `${baseUrl}/questionary/step4b`,
        },
        metadata: {
          current: 4,
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
        nextStep: `${baseUrl}/questionary/step5`,
        metadata: {
          current: 4,
          ...baseMetadata,
        },
      },
    },
    {
      path: '/questionary/step5',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step5`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step4a`,
        nextStep: removeQuestionaryStep6In.includes(country)
          ? `${baseUrl}/thank-you`
          : `${baseUrl}/questionary/step6`,
        metadata: {
          current: 5,
          ...baseMetadata,
        },
      },
    },
  ];

  if (!removeQuestionaryStep6In.includes(country)) {
    output.push({
      path: '/questionary/step6',
      componentPath: `${baseComponentPath}/${middleComponentPathQuestionary}/Step6`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/questionary/step5`,
        nextStep: `${baseUrl}/thank-you`,
        metadata: {
          current: 6,
          ...baseMetadata,
        },
      },
    });
  }
  return output;
}

export default function stepsDefinition(storeKey: string, country: string) {
  const steps: Wizard.Step[] = [
    // Record Your Cough Steps
    ...getCoughSteps(storeKey, country),
    // Record Your Speech Steps
    ...getSpeechSteps(storeKey, country),
    // Questionary
    ...getQuestionarySteps(storeKey, country),
    {
      path: '/thank-you',
      componentPath: `${baseComponentPath}/${middleComponentPathSubmission}/ThankYou`,
      props: {
        storeKey,
        previousStep: `${baseUrl}/before-submit`,
        nextStep: '/welcome',
      },
    },
  ];

  return steps;
}
