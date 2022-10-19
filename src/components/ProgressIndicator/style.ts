import styled from 'styled-components';

export const ProgressIndicatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: -4px 0px 20px;

  svg {
    circle {
      transition: stroke-dashoffset 0.35s;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;

      &.track {
        transform: rotate(90deg);
      }
    }
  }

  @media screen and (${props => props.theme.breakpoints.tablet}) {
    margin: 20px 0px 40px;

    svg {
      width: 80px;
      height: 80px;
    }
  }
`;

export const ProgressIndicatorText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'SF Pro Display';
  font-size: 16px;
  line-height: 24px;
`;

export const BarIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.purple};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  `;

export const BarIndicator = styled.div<{ currentStep?: number, totalSteps?: number }>`
  width: 120px;
  height: 10px;
  background: ${({ theme }) => theme.colors.midGrayBlue};
  position: relative;
  border-radius: 24px;
  margin-top: 12px;
  
  &:after {
    content:'';
    width: ${({ currentStep, totalSteps }) => `calc((100%/${totalSteps}) * ${currentStep})`};
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.colors.purple};
    border-radius: 24px;
  }
`;
