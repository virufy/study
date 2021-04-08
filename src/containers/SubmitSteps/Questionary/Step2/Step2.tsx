import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Update Action
import { updateAction } from 'utils/wizard';

// Components
import ProgressIndicator from 'components/ProgressIndicator';
import Dropdown from 'components/Dropdown';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Data
import { ageGroups } from 'data/ageGroup';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, QuestionStepIndicator, GrayExtraInfo, QuestionNote,
} from '../style';

const schema = Yup.object({
  ageGroup: Yup.string(),
  gender: Yup.object().required(),
  biologicalSex: Yup.string(),
}).defined();

type Step2Type = Yup.InferType<typeof schema>;

const Step2 = ({
  previousStep,
  nextStep,
  storeKey,
  otherSteps,
  metadata,
}: Wizard.StepProps) => {
  // Hooks
  const { Portal } = usePortal({
    bindTo: document && document.getElementById('wizard-buttons') as HTMLDivElement,
  });
  const { setDoGoBack, setTitle } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));

  // States
  const [activeStep, setActiveStep] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    const { testTaken } = state['submit-steps'];
    if (testTaken.includes('neither') && otherSteps) {
      history.push(otherSteps.noTestStep);
    } else if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [state, history, otherSteps, previousStep]);

  useEffect(() => {
    scrollToTop();
    setTitle(t('questionary:headerText'));
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, t]);

  // Handlers
  const onSubmit = async (values: Step2Type) => {
    if (values) {
      action(values);
      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  return (
    <>
      <ProgressIndicator currentStep={metadata?.progressCurrent || 3} totalSteps={metadata?.progressTotal || 4} />

      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>

      <QuestionText extraSpace first>{t('questionary:ageGroup')}</QuestionText>

      <Controller
        control={control}
        name="ageGroup"
        defaultValue="unselected"
        render={({ onChange, value }) => (
          <Dropdown onChange={e => onChange(e.currentTarget.value)} value={value} isMobileFullWidth>
            <option id="unselected">
              {t('questionary:unselectedAgeGroup')}
            </option>
            {ageGroups.map(({ age }) => <option key={age} id={age}>{age}</option>)}
          </Dropdown>
        )}
      />

      <QuestionText extraSpace>{t('questionary:gender.question')}</QuestionText>
      <Controller
        control={control}
        name="gender"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={value}
            onChange={v => onChange(v)}
            items={[
              {
                value: 'male',
                label: t('questionary:gender.options.male'),
              },
              {
                value: 'female',
                label: t('questionary:gender.options.female'),
              },
              {
                value: 'notToSay',
                label: t('questionary:gender.options.notToSay'),
              },
            ]}
            enableOther
            otherPlaceholder={t('questionary:gender.options.selfDescribe')}
          />
        )}
      />

      <QuestionText extraSpace>
        {t('questionary:biologicalSex.question')}
        <QuestionNote>{t('questionary:biologicalSex.note')}</QuestionNote>
      </QuestionText>
      <Controller
        control={control}
        name="biologicalSex"
        defaultValue=""
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={[
              {
                value: 'male',
                label: t('questionary:biologicalSex.options.male'),
              },
              {
                value: 'female',
                label: t('questionary:biologicalSex.options.female'),
              },
            ]}
          />
        )}
      />
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          {metadata && (
            <QuestionStepIndicator>
              {metadata.current} {t('questionary:stepOf')} {metadata.total}
            </QuestionStepIndicator>
          )}
          <WizardButtons
            leftLabel={t('questionary:nextButton')}
            leftHandler={handleSubmit(onSubmit)}
            invert
          />
        </Portal>
      )}
    </>
  );
};

export default React.memo(Step2);
