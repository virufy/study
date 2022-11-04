import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import usePortal from 'react-useportal';
import { useTranslation, Trans } from 'react-i18next';

// Form
import { useForm, Controller } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { yupResolver } from '@hookform/resolvers';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup';

// Update Action
import { updateAction } from 'utils/wizard';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Components
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import ProgressIndicator from 'components/ProgressIndicator';

// Styles
import {
  QuestionText, MainContainer, QuestionNote,
} from '../style';

const schema = Yup.object({
  ethnicity: Yup.string(),
}).defined();

type Step4aType = Yup.InferType<typeof schema>;

const Step2d = ({
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
  const { setDoGoBack, setTitle, setType } = useHeaderContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { state, action } = useStateMachine(updateAction(storeKey));

  // States
  const [activeStep, setActiveStep] = React.useState(true);

  // Form
  const {
    control, handleSubmit, formState,
  } = useForm({
    mode: 'onChange',
    defaultValues: state?.[storeKey],
    resolver: yupResolver(schema),
  });
  const { errors, isValid } = formState;

  const handleDoBack = React.useCallback(() => {
    setActiveStep(false);
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  useEffect(() => {
    scrollToTop();
    setTitle(`${t('questionary:ethnicity.title')}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

  // Handlers
  const onSubmit = async (values: Step4aType) => {
    if (values) {
      const {
        ethnicity,
      } = (values as any);

      action(values);

      let hasSymptom = false;

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < ethnicity.selected?.length; index++) {
        if (ethnicity.selected[index] !== 'none') {
          hasSymptom = true;
          break;
        }
      }

      if (hasSymptom && otherSteps) {
        setActiveStep(false);
        history.push(otherSteps.covidSymptomsStep);
        return;
      }

      if (nextStep) {
        setActiveStep(false);
        history.push(nextStep);
      }
    }
  };

  return (
    <MainContainer>
      <ProgressIndicator
        currentStep={metadata?.current}
        totalSteps={metadata?.total}
        progressBar
      />
      <QuestionText extraSpace first>
        <Trans i18nKey="questionary:ethnicity.question">
          <strong>Which of the below symptoms do you currently have?</strong>
        </Trans>
        <QuestionNote>{t('questionary:ethnicity.note')}</QuestionNote>
      </QuestionText>
      <Controller
        control={control}
        name="ethnicity"
        defaultValue=""
        render={({ onChange, value }) => (
          <OptionList
            singleSelection
            value={{ selected: value ? [value] : [] }}
            onChange={v => onChange(v.selected[0])}
            items={[
              {
                value: 'asian',
                label: t('questionary:ethnicity.options.asian'),
              },
              {
                value: 'nativeAmericanOrArab',
                label: t('questionary:ethnicity.options.nativeAmericanOrArab'),
              },
              {
                value: 'blackOrAfrican',
                label: t('questionary:ethnicity.options.blackOrAfrican'),
              },
              {
                value: 'hispanicOrLatin',
                label: t('questionary:ethnicity.options.hispanicOrLatin'),
              },
              {
                value: 'nativeHawaiianOrPacific',
                label: t('questionary:ethnicity.options.nativeHawaiianOrPacific'),
              },
              {
                value: 'white',
                label: t('questionary:ethnicity.options.white'),
              },
            ]}
            excludableValues={['none']}
          />
        )}
      />
      {/* Bottom Buttons */}
      <p><ErrorMessage errors={errors} name="name" /></p>
      {activeStep && (
        <Portal>
          <WizardButtons
            leftLabel={t('questionary:nextButton')}
            leftHandler={handleSubmit(onSubmit)}
            leftDisabled={!isValid}
            invert
          />
        </Portal>
      )}
    </MainContainer>
  );
};

export default React.memo(Step2d);
