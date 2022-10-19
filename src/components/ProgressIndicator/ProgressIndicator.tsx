/* eslint-disable react/require-default-props */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { colors } from 'theme';

// Styles
import {
  BarIndicator,
  BarIndicatorContainer,
  ProgressIndicatorContainer,
} from './style';

interface ProgressIndicatorProps {
  className?: string;
  radius?: number;
  stroke?: number;
  color?: string;
  colorTrack?: string;
  currentStep?: number;
  totalSteps?: number;
  progressBar?: boolean;
}

const ProgressIndicator = ({
  className = '',
  radius = 30,
  stroke = 6,
  currentStep = 2,
  totalSteps = 4,
  color = colors.green,
  colorTrack = colors.gray3,
  progressBar = false,
}: ProgressIndicatorProps) => {
  // Hooks
  const { t } = useTranslation();

  const progress = (currentStep / totalSteps) * 100;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - ((progress / 100) * circumference);

  return (
    <>
      {
        progressBar
          ? (
            <BarIndicatorContainer>
              {t('questionary:progressBar', { currentStep, totalSteps })}
              <BarIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            </BarIndicatorContainer>
          ) : (
            <ProgressIndicatorContainer className={className}>
              <svg
                width={radius * 2}
                height={radius * 2}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}
              >
                <circle
                  className="track"
                  stroke={colorTrack}
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke={color}
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={`${circumference} ${circumference}`}
                  style={{ strokeDashoffset }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <text
                  fontSize="16"
                  fill="#000000"
                  x="50%"
                  y="50%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {`${currentStep}/${totalSteps}`}
                </text>
              </svg>

            </ProgressIndicatorContainer>
          )
      }
    </>
  );
};

export default React.memo(ProgressIndicator);
