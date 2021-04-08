import React from 'react';
import { HeaderContext } from 'components/Header';

const useHeaderContext = () => {
  const {
    title, setTitle, logoSize, setLogoSize, setDoGoBack, doGoBack,
  } = React.useContext(HeaderContext);

  return {
    title,
    setTitle,
    logoSize,
    setLogoSize,
    doGoBack,
    setDoGoBack,
  };
};

export default useHeaderContext;
