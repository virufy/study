import React, { PropsWithChildren } from 'react';

// Styles
import {
  StyledButton,
  StyledButtonProps,
} from './style';

export interface ButtonProps extends PropsWithChildren<StyledButtonProps> {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const Button = React.memo(({ children, ...props }: ButtonProps) => ((
  <StyledButton
    type="button"
    {...props}
  >
    {children}
  </StyledButton>
)));

export default Button;
