import React from 'react';
import { useTranslation } from 'react-i18next';

// Style
import {
  Container, Title,
  Card, CardTitle, CardDescription, CardLink,
} from './style';

interface Card {
  title: string;
  description: string;
  cta: {
    label: string;
    link?: string;
    installPwa?: boolean;
  };
}

const StayInTouch = () => {
  const { t, i18n } = useTranslation();

  const cardList = React.useMemo(() => {
    const cards = t('stayInTouch:cards', { returnObjects: true }) as Card[];
    return cards;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <Container>
      <Title>{t('stayInTouch:title', 'Stay in touch!')}</Title>
      {cardList.map(card => (
        <Card key={card.title}>
          <CardTitle>{card.title}</CardTitle>
          <CardDescription>{card.description}</CardDescription>
          <CardLink href={card.cta.link}>{card.cta.label}</CardLink>
        </Card>
      ))}
    </Container>
  );
};

export default StayInTouch;
