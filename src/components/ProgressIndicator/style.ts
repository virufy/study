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
