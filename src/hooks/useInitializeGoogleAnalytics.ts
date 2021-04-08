import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';

export const useInitializeGoogleAnalytics = () => {
  const history = useHistory();

  if (process.env.REACT_APP_GA && process.env.NODE_ENV === 'production') {
    ReactGA.initialize(process.env.REACT_APP_GA || '');
    history.listen(location => {
      ReactGA.pageview(location.pathname + location.search);
    });
  }
};
