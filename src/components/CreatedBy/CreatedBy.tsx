import React from 'react';
import { useTranslation } from 'react-i18next';

// Style
import { Container, Label, Image } from './style';

interface CreatedByProps {
  inline?: boolean;
  mt?: string;
  color?: string;
}

const CreatedBy = ({ inline = false, mt, color }: CreatedByProps) => {
  const { t } = useTranslation();
  return (
    <Container inline={inline} mt={mt}>
      <Label color={color}>{t('main:createdBy', 'Created By')}</Label>
      <a href="https://xoor.io" target="_blank" rel="noopener noreferrer">
        <Image />
      </a>
    </Container>
  );
};

export default CreatedBy;
