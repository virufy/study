import React, { createContext, useContext, useState } from 'react';

// Styles
import {
  HeaderContainer, Title, Logo, ArrowLeft, ArrowLefContainer, LogoSize,
} from './style';

type ContextType = {
  title: string,
  setTitle: (newTitle: string) => string | void,
  logoSize: LogoSize;
  setLogoSize: (newLogo: LogoSize) => string | void,
  setDoGoBack: (cb: Function | null) => null | void,
  doGoBack?: null | any
};

const noop = () => {};

export const HeaderContext = createContext<ContextType>({
  title: '',
  setTitle: noop,
  logoSize: 'regular',
  setLogoSize: noop,
  setDoGoBack: noop,
});

interface HeaderProps {
  children: React.ReactNode
}

export const HeaderContextProvider = ({ children }: HeaderProps) => {
  const [title, setTitle] = useState('');
  const [logoSize, setLogoSize] = useState<LogoSize>('regular');
  const [doGoBack, setDoGoBack] = useState<null | any>(null);

  const value = React.useMemo(
    () => ({
      title,
      setTitle,
      logoSize,
      setLogoSize,
      doGoBack,
      setDoGoBack,
    }),
    [title, logoSize, doGoBack],
  );

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};

const Header = () => {
  const { title, doGoBack, logoSize } = useContext(HeaderContext);

  return (
    <HeaderContainer>
      {doGoBack && <ArrowLefContainer onClick={doGoBack}><ArrowLeft /></ArrowLefContainer>}
      {title ? <Title>{title}</Title> : <Logo size={logoSize} />}
    </HeaderContainer>
  );
};

export default React.memo(Header);
