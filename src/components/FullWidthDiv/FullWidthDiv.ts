import styled from 'styled-components';

const FullWidthDiv = styled.div`
  margin-left: -${props => props.theme.layout.generalPaddingLeft};
  margin-right: -${props => props.theme.layout.generalPaddingRight};

  height: 100%;
`;

export default FullWidthDiv;
