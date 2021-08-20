import {
  deviceDetect as rdd, isBrowser, isConsole, isMobile, isSmartTV, isTablet, isWearable,
} from 'react-device-detect';

const deviceDetect = () => ({
  isBrowser: isBrowser ? rdd() : null,
  isMobile: isMobile ? rdd() : null,
  isSmartTv: isSmartTV ? rdd() : null,
  isConsole: isConsole ? rdd() : null,
  isTablet: isTablet ? rdd() : null,
  isWearable: isWearable ? rdd() : null,
});

export default deviceDetect;
