import React from 'react';
import { useTranslation } from 'react-i18next';

// Images
import { ReactComponent as CrossSVG } from 'assets/icons/cross.svg';
import { ReactComponent as CurvedArrowSVG } from 'assets/images/curved-arrow.svg';

// Style
import {
  Backdrop,
  Container,
  CloseButton,
  IOsContainer,
  ChromeContainer,
} from './style';

interface PWAInstallModalProps {
  close(): void;
}

const PWAInstallModal = ({ close }: PWAInstallModalProps) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    // document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    return () => {
      // document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Memos
  const iOSSafari = React.useMemo(() => {
    const ua = window.navigator.userAgent;
    const iOS = !!ua.match(/iPad|iPhone/i);
    const iPad = (ua.match(/(Mac OS)/i) && window.navigator.maxTouchPoints > 0);
    const webkit = !!ua.match(/WebKit/i);
    return (iOS || iPad) && webkit && !ua.match(/CriOS/i);
  }, []);

  return (
    <Backdrop>
      <Container>
        <CloseButton onClick={close}>
          <CrossSVG />
        </CloseButton>
        {
          iOSSafari ? (
            <IOsContainer>
              <div>{t('addToHomeScreen', 'Add to Home Screen')}</div>
              <CurvedArrowSVG />
            </IOsContainer>
          ) : (
            <ChromeContainer>
              <div>{t('addToHomeScreen', 'Add to Home Screen')}</div>
              <CurvedArrowSVG />
            </ChromeContainer>
          )
        }

      </Container>
    </Backdrop>
  );
};

interface WrapperProps {}
interface WrapperState {
  show: boolean;
}

export default class PWAInstallModalWrapper extends React.PureComponent<WrapperProps, WrapperState> {
  constructor(props: WrapperProps) {
    super(props);
    this.state = {
      show: false,
    };
  }

  public show = () => {
    this.setState({ show: true });
  };

  public hide = () => {
    this.setState({ show: false });
  };

  public render() {
    const { show } = this.state;
    return show ? <PWAInstallModal close={this.hide} /> : null;
  }
}
