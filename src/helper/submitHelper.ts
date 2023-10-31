import * as H from 'history';

// Hooks
import { client as axiosClient } from 'hooks/useAxios';

//
import { allowSpeechIn } from 'helper/stepsDefinitions';
import deviceDetect from 'helper/deviceHelper';

interface DoSubmitProps {
  setSubmitError(err: string | null): void;
  state: CommonJSON;
  captchaValue: string | null;
  action(payload: Object): void;
  nextStep?: string;
  setActiveStep(status: boolean): void;
  history: H.History;
  userCookie: string;
}

export async function doSubmit({
  setSubmitError,
  state,
  captchaValue,
  action,
  nextStep,
  setActiveStep,
  history,
  userCookie,
}: DoSubmitProps) {
  try {
    setSubmitError(null);
    const {
      language,
      country,
      region,
      patientId,

      agreedConsentTerms,
      agreedPolicyTerms,
      agreedCovidDetection,
      agreedCovidCollection,
      agreedTrainingArtificial,
      agreedBiometric,
    } = state.welcome;

    const {
      recordYourCough,
      recordYourBreath,
      recordYourSpeech,

      testTaken,
      pcrTestDate,
      pcrTestResult,
      antigenTestDate,
      whatAntigenTestResult,
      antigenTestResult,

      vaccine,
      ageGroup,
      gender,
      ethnicity,
      biologicalSex,

      smokeLastSixMonths,
      currentSymptoms,
      symptomsStartedDate,
      currentRespiratoryCondition,
      currentMedicalCondition,

      covidTimes,
      lastTimeCovidMonths,
      fluTestDate,
      fluTestResult,
      whenFluShot,

    } = state['submit-steps'];

    const body = new FormData();

    body.append('device', JSON.stringify(deviceDetect()));
    body.append('language', language);
    body.append('country', country);
    if (region) {
      body.append('region', region);
    }

    if (patientId) {
      body.append('patientId', patientId);
    }

    if (window.sourceCampaign) {
      body.append('source', window.sourceCampaign);
    }

    if (userCookie) {
      body.append('userCookie', JSON.stringify(userCookie));
    }

    body.append('agreedConsentTerms', agreedConsentTerms);
    body.append('agreedPolicyTerms', agreedPolicyTerms);
    body.append('agreedCovidCollection', agreedCovidCollection);
    body.append('agreedCovidDetection', agreedCovidDetection);
    body.append('agreedTrainingArtificial', agreedTrainingArtificial);
    body.append('agreedBiometric', agreedBiometric);

    const coughFile = recordYourCough.recordingFile || recordYourCough.uploadedFile;
    body.append('cough', coughFile, coughFile.name || 'filename.wav');
    const breathFile = recordYourBreath.recordingFile || recordYourBreath.uploadedFile;
    body.append('breath', breathFile, breathFile.name || 'filename_breath.wav');
    if (allowSpeechIn.includes(country)) {
      const voiceFile = recordYourSpeech.recordingFile || recordYourSpeech.uploadedFile;
      body.append('voice', voiceFile, voiceFile.name || 'filename_voice.wav');
    }

    body.append('testTaken', testTaken.join(','));

    if (testTaken.includes('pcr')) {
      body.append('pcrTestDate', pcrTestDate.toISOString());
      body.append('pcrTestResult', pcrTestResult);
    }

    if (testTaken.includes('antigen')) {
      body.append('antigenTestDate', antigenTestDate.toISOString());
      body.append('antigenTestResult', antigenTestResult);
      body.append('whatAntigenTestResult', whatAntigenTestResult);
    }

    if (vaccine) {
      body.append('vaccine', vaccine);
    }

    if (ageGroup) {
      body.append('ageGroup', ageGroup);
    }

    const genderSelected = gender.other || gender.selected[0];

    if (ethnicity?.selected?.length > 0) {
      body.append('ethnicity', ethnicity.selected.join(','));
    }

    if (genderSelected) {
      body.append('gender', genderSelected);
    }

    if (biologicalSex) {
      body.append('biologicalSex', biologicalSex);
    }

    if (smokeLastSixMonths) {
      body.append('smokeLastSixMonths', smokeLastSixMonths);
    }

    if (currentSymptoms?.selected?.length > 0) {
      body.append('currentSymptoms', currentSymptoms.selected.join(','));
    }

    if (symptomsStartedDate) {
      body.append('symptomsStartedDate', symptomsStartedDate);
    }

    if (currentRespiratoryCondition?.selected?.length > 0) {
      body.append('currentRespiratoryCondition', currentRespiratoryCondition.selected.join(','));
    }

    if (currentMedicalCondition?.selected?.length > 0) {
      body.append('currentMedicalCondition', currentMedicalCondition.selected.join(','));
    }

    if (currentSymptoms?.other) {
      body.append('otherSymptoms', currentSymptoms?.other);
    }

    if (currentRespiratoryCondition?.other) {
      body.append('otherRespiratoryConditions', currentRespiratoryCondition?.other);
    }

    if (currentMedicalCondition?.other) {
      body.append('otherMedicalConditions', currentMedicalCondition?.other);
    }

    if (antigenTestDate) {
      body.append('antigenTestDate', antigenTestDate);
    }

    if (antigenTestResult) {
      body.append('antigenTestResult', antigenTestResult);
    }

    if (pcrTestDate) {
      body.append('pcrTestDate', pcrTestDate.toISOString());
      body.append('pcrTestResult', pcrTestResult);
    }

    if (covidTimes) {
      body.append('covidTimes', covidTimes);
    }

    if (lastTimeCovidMonths) {
      body.append('lastTimeCovidMonths', lastTimeCovidMonths);
    }

    if (fluTestDate) {
      body.append('fluTestDate', fluTestDate);
    }

    if (fluTestResult) {
      body.append('fluTestResult', fluTestResult);
    }

    if (whenFluShot) {
      body.append('whenFluShot', whenFluShot);
    }

    if (captchaValue) {
      body.append('captchaValue', captchaValue);
    }

    const response = await axiosClient.post('saveSurvey', body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=SaveSurvey',
      },
    });

    action({});

    if (nextStep && response.data?.submissionId) {
      setActiveStep(false);
      history.push(nextStep, { submissionId: response.data?.submissionId });
    }
  } catch (error) {
    console.log(error);
    setSubmitError('beforeSubmit:submitError');
  }
}
