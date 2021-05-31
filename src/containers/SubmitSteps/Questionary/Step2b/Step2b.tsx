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
import OptionList from 'components/OptionList';
import WizardButtons from 'components/WizardButtons';

// Header Control
import useHeaderContext from 'hooks/useHeaderContext';

// Utils
import { scrollToTop } from 'helper/scrollHelper';

// Styles
import {
  QuestionText, MainContainer, QuestionNote,
} from '../style';

const schema = Yup.object({
  gender: Yup.object().required(),
}).defined();

type Step2Type = Yup.InferType<typeof schema>;

const Step2b = ({
  previousStep,
  nextStep,
  storeKey,
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
  const { errors } = formState;

  const {
    isValid,
  } = formState;

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
    setTitle(`${t('questionary:headerText')} ${metadata?.current} ${t('questionary:stepOf')} ${metadata?.total}`);
    setType('primary');
    setDoGoBack(() => handleDoBack);
  }, [handleDoBack, setDoGoBack, setTitle, setType, metadata, t]);

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
    <MainContainer>
      <QuestionText first>{t('questionary:gender.question')}
        <QuestionNote>{t('questionary:gender.note')}</QuestionNote>
      </QuestionText>
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
                value: 'female',
                label: t('questionary:gender.options.female'),
              },
              {
                value: 'male',
                label: t('questionary:gender.options.male'),
              },
              {
                value: 'transgender',
                label: t('questionary:gender.options.transgender'),
              },
              {
                value: 'other',
                label: t('questionary:gender.options.other'),
              },
              {
                value: 'notToSay',
                label: t('questionary:gender.options.notToSay'),
              },
            ]}
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

export default React.memo(Step2b);
