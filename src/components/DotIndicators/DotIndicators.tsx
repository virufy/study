/* eslint-disable react/require-default-props */
import React from 'react';

// Styles
import {
  WelcomeWizardStepIndicators,
  WelcomeWizardStepIndicator,
} from './style';

interface ProgressIndicatorProps {
  className?: string;
  current: number;
  total: number;
}

const ProgressIndicator = ({
  className = '',
  current,
  total,
}: ProgressIndicatorProps) => {
  // Memos
  const stepButtons = React.useMemo(() => {
    const stepButtonsElements: React.ReactElement[] = [];

    for (let step = 0; step < total; step += 1) {
      stepButtonsElements.push((
        <WelcomeWizardStepIndicator
          className={step === current ? 'active' : ''}
          id={`WelcomeStepButton-${step}`}
          key={`WelcomeStepButton-${step}`}
        />
      ));
    }

    return stepButtonsElements;
  }, [current, total]);

  return (
    <WelcomeWizardStepIndicators className={className}>
      {stepButtons}
    </WelcomeWizardStepIndicators>
  );
};

export default React.memo(ProgressIndicator);
