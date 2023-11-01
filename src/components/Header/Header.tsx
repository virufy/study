import React, {
  createContext, useContext, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

// Assets
import Logo from 'assets/virufyLogo.png';
import Logo2x from 'assets/virufyLogo2x.png';
import Logo3x from 'assets/virufyLogo3x.png';

// Components
import Link from 'components/Link';

// Texts
import { TitlePurple, TitleBlack, HeaderTitle } from 'components/Texts';

// Helpers
import { getCountry } from 'helper/stepsDefinitions';

// Styles
import {
  HeaderContainer, ArrowLeft, ArrowLefContainer, LogoSize, LogoImg, TitleContainer,
} from './style';

type ContextType = {
  title: string,
  setTitle: (newTitle: string) => string | void,
  subtitle: string,
  setSubtitle: (newSubtitle: string) => string | void,
  type: string,
  setType: (newType: string) => string | void,
  logoSize: LogoSize;
  setLogoSize: (newLogo: LogoSize) => string | void,
  setDoGoBack: (cb: Function | null) => null | void,
  doGoBack?: null | any
};

const noop = () => {};

export const HeaderContext = createContext<ContextType>({
  title: '',
  setTitle: noop,
  subtitle: '',
  setSubtitle: noop,
  type: '',
  setType: noop,
  logoSize: 'regular',
  setLogoSize: noop,
  setDoGoBack: noop,
});

interface HeaderProps {
  children: React.ReactNode
}

export const HeaderContextProvider = ({ children }: HeaderProps) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [type, setType] = useState('');
  const [logoSize, setLogoSize] = useState<LogoSize>('regular');
  const [doGoBack, setDoGoBack] = useState<null | any>(null);

  const value = React.useMemo(
    () => ({
      title,
      setTitle,
      subtitle,
      setSubtitle,
      type,
      setType,
      logoSize,
      setLogoSize,
      doGoBack,
      setDoGoBack,
    }),
    [title, subtitle, type, logoSize, doGoBack],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const Header = () => {
  const {
    title, subtitle, type, doGoBack, logoSize,
  } = useContext(HeaderContext);
  const location = useLocation();
  const country = getCountry();

  if (location.pathname === '/welcome/step-2' || (location.pathname === '/welcome' && (type === 'none' || country === 'Japan'))) return null;

  return (
    <HeaderContainer type={type} isMobile={isMobile} hasSubtitle={!!subtitle}>
      {(doGoBack && location.pathname !== '/welcome') && <ArrowLefContainer onClick={doGoBack}><ArrowLeft /></ArrowLefContainer>}
      <TitleContainer>
        {(type === 'primary' && !subtitle) && <HeaderTitle>{title}</HeaderTitle>}
        {(type === 'primary' && subtitle) && <><HeaderTitle>{title}</HeaderTitle><TitleBlack>{subtitle}</TitleBlack></>}
        {type === 'secondary' && <><LogoImg srcSet={`${Logo}, ${Logo2x} 2x, ${Logo3x} 3x`} src={LogoImg} size={logoSize} /><TitlePurple>{subtitle}</TitlePurple></>}
        {type === 'tertiary' && <Link to="http://www.virufy.org" target="_blank"><LogoImg srcSet={`${Logo}, ${Logo2x} 2x, ${Logo3x} 3x`} src={LogoImg} size={location.pathname !== '/welcome' ? 'regular' : 'big'} /></Link>}
      </TitleContainer>
    </HeaderContainer>
  );
};

export default React.memo(Header);
