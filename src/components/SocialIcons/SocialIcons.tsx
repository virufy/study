import React from 'react';
import { useTranslation } from 'react-i18next';

// Assets
import { ReactComponent as FacebookSVG } from 'assets/social/facebook.svg';
import { ReactComponent as InstagramSVG } from 'assets/social/instagram.svg';
import { ReactComponent as LinkedInSVG } from 'assets/social/linkedIn.svg';
import { ReactComponent as TwitterSVG } from 'assets/social/twitter.svg';
// import { ReactComponent as YoutubeSVG } from 'assets/social/youtube.svg';

// Style
import {
  Container, SocialIconsTitle, SocialIconsContainer, SocialLink,
} from './style';

interface SocialIcon {
  href: string;
  Icon: typeof FacebookSVG;
}

const icons: SocialIcon[] = [
  {
    href: 'https://www.instagram.com/virufy/',
    Icon: InstagramSVG,
  },
  {
    href: 'https://www.linkedin.com/company/virufy/',
    Icon: LinkedInSVG,
  },
  {
    href: 'https://twitter.com/VirufyOrg',
    Icon: TwitterSVG,
  },
];

const SocialIcons = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <SocialIconsTitle>
        {t('socialIcons:title', 'Follow Virufy')}
      </SocialIconsTitle>
      <SocialIconsContainer>
        { icons.map(({ href, Icon }) => (
          <SocialLink
            key={href}
            target="_blank"
            rel="noopener noreferrer"
            href={href}
          >
            <Icon />
          </SocialLink>
        ))}
      </SocialIconsContainer>
    </Container>
  );
};

export default React.memo(SocialIcons);
