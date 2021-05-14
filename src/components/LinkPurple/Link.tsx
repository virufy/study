/* eslint-disable react/require-default-props */
import React, { FunctionComponent } from 'react';

import { StyledInternalLink, StyledExternalLink } from './style';

interface LinkProps {
  children: React.ReactNode
  to: string;
  target?: '_blank' | '_self';
  isBold?: boolean;
}

const Link:FunctionComponent<LinkProps> = ({
  children, to, target = '_self', isBold = true,
}: LinkProps) => {
  if (target === '_blank') {
    return <StyledExternalLink href={to} target="_blank" rel="noopener noreferrer" isBold={isBold}>{children}</StyledExternalLink>;
  }

  return <StyledInternalLink to={to} isBold={isBold}>{children}</StyledInternalLink>;
};

export default Link;
