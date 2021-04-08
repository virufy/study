/* eslint-disable react/require-default-props */
import React from 'react';

// Components
import Button from 'components/Button';

// Styles
import {
  WizardButtonsContainer,
} from './style';

interface WizardButtonsProps {
  invert?: boolean;
  leftLabel: string;
  leftDisabled?: boolean;
  leftHandler: () => void;
  rightLabel?: string;
  rightDisabled?: boolean;
  rightHandler?: () => void;
}

const WizardButtons = React.memo(({
  invert = false,
  leftLabel,
  leftDisabled,
  leftHandler,
  rightLabel,
  rightDisabled,
  rightHandler,
}: WizardButtonsProps) => (
  <WizardButtonsContainer>
    <Button
      dark={invert}
      disabled={leftDisabled}
      onClick={leftHandler}
    >
      {leftLabel}
    </Button>
    {
        rightLabel && rightHandler && (
          <Button
            dark={!invert}
            disabled={rightDisabled}
            onClick={rightHandler}
          >
            {rightLabel}
          </Button>
        )
      }
  </WizardButtonsContainer>
));
export default React.memo(WizardButtons);
