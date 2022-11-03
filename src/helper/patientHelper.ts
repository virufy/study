import * as H from 'history';

// Hooks
import { client as axiosClient } from 'hooks/useAxios';

// Helpers
import { allowSpeechIn } from 'helper/stepsDefinitions';
import deviceDetect from 'helper/deviceHelper';

interface DoSubmitProps {
  setSubmitError(err: string | null): void;
  state: CommonJSON;
  captchaValue: string | null;
  action(payload: Object): void;
  nextStep?: string;
  otherSteps?: { isShortAudioStep?: string };
  setActiveStep(status: boolean): void;
  history: H.History;
  isShortAudioCollection?: string;
}

export async function doSubmitPatientQuestionnaire({
  setSubmitError,
  state,
  captchaValue,
  nextStep,
  setActiveStep,
  history,
}: DoSubmitProps) {
  try {
    setSubmitError(null);
    const {
      language,
      country,
      region,
      patientId,
      hospitalId,
    } = state.welcome;

    const {
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
    } = state['submit-steps'];

    const body = new FormData();

    body.append('device', JSON.stringify(deviceDetect()));
    body.append('language', language);
    body.append('country', country);
    if (region) {
      body.append('region', region);
    }

    if (hospitalId) {
      body.append('hospitalId', hospitalId);
    }

    if (window.sourceCampaign) {
      body.append('source', window.sourceCampaign);
    }

    if (vaccine) {
      body.append('vaccine', vaccine);
    }

    if (ageGroup) {
      body.append('ageGroup', ageGroup);
    }

    const genderSelected = gender.other || gender.selected[0];

    if (genderSelected) {
      body.append('gender', genderSelected);
    }

    if (ethnicity) {
      body.append('ethnicity', ethnicity);
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

    if (captchaValue) {
      body.append('captchaValue', captchaValue);
    }

    const response = await axiosClient.post(`/patient/${patientId}/questionary`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=Questionary',
      },
    });

    if (nextStep && response.data?.submissionId) {
      setActiveStep(false);
      history.push(nextStep, { submissionId: response.data?.submissionId, patientId });
    }
  } catch (error) {
    console.log(error);
    setSubmitError('beforeSubmit:submitError');
  }
}

export async function doSubmitPatientShortQuestionnaire({
  setSubmitError,
  state,
  captchaValue,
  nextStep,
  setActiveStep,
  history,
}: DoSubmitProps) {
  try {
    setSubmitError(null);
    const {
      language,
      country,
      region,
      patientId,
      hospitalId,
    } = state.welcome;

    const {
      ageGroup,
      gender,
      currentSymptoms,
      symptomsStartedDate,
    } = state['submit-steps'];

    const body = new FormData();

    body.append('device', JSON.stringify(deviceDetect()));
    body.append('language', language);
    body.append('country', country);
    if (region) {
      body.append('region', region);
    }

    if (hospitalId) {
      body.append('hospitalId', hospitalId);
    }

    if (window.sourceCampaign) {
      body.append('source', window.sourceCampaign);
    }

    if (ageGroup) {
      body.append('ageGroup', ageGroup);
    }

    const genderSelected = gender.other || gender.selected[0];

    if (genderSelected) {
      body.append('gender', genderSelected);
    }

    if (currentSymptoms?.selected?.length > 0) {
      body.append('currentSymptoms', currentSymptoms.selected.join(','));
    }

    if (symptomsStartedDate) {
      body.append('symptomsStartedDate', symptomsStartedDate);
    }

    if (captchaValue) {
      body.append('captchaValue', captchaValue);
    }

    const response = await axiosClient.post(`/patient/${patientId}/shortQuestionary`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=ShortQuestionary',
      },
    });

    if (nextStep && response.data?.submissionId) {
      setActiveStep(false);
      history.push(nextStep, { submissionId: response.data?.submissionId, patientId });
    }
  } catch (error) {
    console.log(error);
    setSubmitError('beforeSubmit:submitError');
  }
}

export async function doSubmitPatientAudioCollection({
  setSubmitError,
  state,
  captchaValue,
  nextStep,
  otherSteps,
  setActiveStep,
  history,
  isShortAudioCollection,
}: DoSubmitProps) {
  try {
    setSubmitError(null);
    const {
      language,
      country,
      region,
      patientId,
      hospitalId,
    } = state.welcome;

    const {
      recordYourCough,
      recordYourBreath,
      recordYourSpeech,
    } = state['submit-steps'];

    const body = new FormData();

    body.append('device', JSON.stringify(deviceDetect()));
    body.append('language', language);
    body.append('country', country);
    if (region) {
      body.append('region', region);
    }

    if (hospitalId) {
      body.append('hospitalId', hospitalId);
    }

    if (window.sourceCampaign) {
      body.append('source', window.sourceCampaign);
    }

    if (recordYourCough) {
      const coughFile = recordYourCough.recordingFile || recordYourCough.uploadedFile;
      body.append('cough', coughFile, coughFile.name || 'filename.wav');
    }

    if (recordYourBreath) {
      const breathFile = recordYourBreath.recordingFile || recordYourBreath.uploadedFile;
      body.append('breath', breathFile, breathFile.name || 'filename_breath.wav');
    }
    if (allowSpeechIn.includes(country) && recordYourSpeech) {
      const voiceFile = recordYourSpeech.recordingFile || recordYourSpeech.uploadedFile;
      body.append('voice', voiceFile, voiceFile.name || 'filename_voice.wav');
    }

    if (captchaValue) {
      body.append('captchaValue', captchaValue);
    }

    body.append('shortAudioCollection', isShortAudioCollection || 'false');

    const response = await axiosClient.post(`/patient/${patientId}/audioCollection`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=AudioCollection',
      },
    });

    if (isShortAudioCollection && otherSteps?.isShortAudioStep) {
      setActiveStep(false);
      history.push(otherSteps?.isShortAudioStep, { submissionId: response.data?.submissionId, patientId });
    } else if (nextStep && response.data?.submissionId) {
      setActiveStep(false);
      history.push(nextStep, { submissionId: response.data?.submissionId, patientId });
    }
  } catch (error) {
    console.log(error);
    setSubmitError('beforeSubmit:submitError');
  }
}

export async function doSubmitPatientTestResults({
  setSubmitError,
  state,
  captchaValue,
  nextStep,
  setActiveStep,
  history,
}: DoSubmitProps) {
  try {
    setSubmitError(null);
    const {
      language,
      country,
      region,
      patientId,
      hospitalId,

    } = state.welcome;

    const {
      patientAntigenTestResult,
      patientPcrTestResult,
    } = state['submit-steps'];

    const body = new FormData();

    body.append('device', JSON.stringify(deviceDetect()));
    body.append('language', language);
    body.append('country', country);
    if (region) {
      body.append('region', region);
    }

    if (hospitalId) {
      body.append('hospitalId', hospitalId);
    }

    if (window.sourceCampaign) {
      body.append('source', window.sourceCampaign);
    }

    if (patientAntigenTestResult) {
      body.append('patientAntigenTestResult', patientAntigenTestResult);
    }

    if (patientPcrTestResult) {
      body.append('patientPcrTestResult', patientPcrTestResult);
    }

    if (captchaValue) {
      body.append('captchaValue', captchaValue);
    }

    const response = await axiosClient.post(`/patient/${patientId}/testResult`, body, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=testResult',
      },
    });

    if (nextStep && response.data?.submissionId) {
      setActiveStep(false);
      history.push(nextStep, { submissionId: response.data?.submissionId, patientId });
    }
  } catch (error) {
    console.log(error);
    setSubmitError('beforeSubmit:submitError');
  }
}
