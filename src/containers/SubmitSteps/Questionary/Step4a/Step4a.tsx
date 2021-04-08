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

// Components
import ProgressIndicator from 'components/ProgressIndicator';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';
import {
  QuestionText, QuestionStepIndicator, GrayExtraInfo,
} from '../style';

const covidSymptoms = ['dryCough', 'wetCough', 'feverChillsSweating', 'newOrWorseCough', 'breathShortness'];

const schema = Yup.object({
  currentSymptoms: Yup.object().required(),
}).defined();

type Step4aType = Yup.InferType<typeof schema>;

const Step4a = ({
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
    if (previousStep) {
      history.push(previousStep);
    } else {
      history.goBack();
    }
  }, [history, previousStep]);

  useEffect(() => {
    scrollToTop();
    setTitle(t('questionary:headerText'));
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, t]);

  // Handlers
  const onSubmit = async (values: Step4aType) => {
    if (values) {
      const {
        currentSymptoms,
      } = (values as any);

      action(values);

      let hasSymptom = false;

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < currentSymptoms.selected?.length; index++) {
        if (covidSymptoms.includes(currentSymptoms.selected[index])) {
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
    <>
      <ProgressIndicator currentStep={metadata?.progressCurrent || 3} totalSteps={metadata?.progressTotal || 4} />

      <GrayExtraInfo>{t('questionary:caption')}</GrayExtraInfo>

      <QuestionText bold={false}>
        <Trans i18nKey="questionary:symptoms.question">
          <strong>Which of the below symptoms do you currently have?</strong> (Select all that apply)
        </Trans>
      </QuestionText>
      <Controller
        control={control}
        name="currentSymptoms"
        defaultValue={{ selected: [], other: '' }}
        render={({ onChange, value }) => (
          <OptionList
            value={value}
            onChange={v => onChange(v)}
            items={[
              {
                value: 'bodyAches',
                label: t('questionary:symptoms.options.bodyAches'),
              },
              {
                value: 'dryCough',
                label: t('questionary:symptoms.options.dryCough'),
              },
              {
                value: 'wetCough',
                label: t('questionary:symptoms.options.wetCough'),
              },
              {
                value: 'feverChillsSweating',
                label: t('questionary:symptoms.options.feverChillsSweating'),
              },
              {
                value: 'headaches',
                label: t('questionary:symptoms.options.headaches'),
              },
              {
                value: 'lossTasteAndOrSmell',
                label: t('questionary:symptoms.options.lossTasteOrSmell'),
              },
              {
                value: 'newOrWorseCough',
                label: t('questionary:symptoms.options.worseCough'),
              },
              {
                value: 'breathShortness',
                label: t('questionary:symptoms.options.breathShortness'),
              },
              {
                value: 'soreThroat',
                label: t('questionary:symptoms.options.soreThroat'),
              },
              {
                value: 'chestTightness',
                label: t('questionary:symptoms.options.chestTightness'),
              },
              {
                value: 'vomitingAndDiarrhea',
                label: t('questionary:symptoms.options.vomitingAndDiarrhea'),
              },
              {
                value: 'none',
                label: t('questionary:symptoms.options.none'),
              },
            ]}
            allowAddOther
            addOtherLabel={t('questionary:symptoms.options.addOther')}
            otherPlaceholder={t('questionary:symptoms.addOtherPlaceholder')}
            excludableValue="none"
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

export default React.memo(Step4a);
