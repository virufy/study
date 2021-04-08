import React from 'react';
import loadable from '@loadable/component';
import SlideRoutes from 'react-slide-routes';
import { Route, useRouteMatch, useLocation } from 'react-router-dom';
import { StateMachineProvider } from 'little-state-machine';
import Layout from 'components/Layout/';
import { WizardContainer, StepContainer, WizardNavControlPortal } from './style';

interface WizardProps {
  steps: Wizard.Step[];
}

interface AsyncLoadProps extends Partial<Wizard.StepProps> {
  container: string;
}

const AsyncLoad = loadable(({ container }: AsyncLoadProps) => import(`containers/${container}`), {
  fallback: <div>Loading ...</div>,
});

function clearPath(path: string) {
  return path.replace(/\/$/, '');
}

const Wizard = ({ steps, children }: React.PropsWithChildren<WizardProps>) => {
  const match = useRouteMatch();
  const location = useLocation();
  const [loadSteps, setLoadSteps] = React.useState(false);

  const pathList = React.useMemo(() => {
    const base = clearPath(match.url);
    return steps.map(step => base + step.path);
  }, [match.url, steps]);

  React.useEffect(() => {
    setLoadSteps(true);
  }, []);

  return (
    <StateMachineProvider>
      <WizardContainer>
        <StepContainer>
          {loadSteps && (
            <SlideRoutes location={location} timing="ease-in-out" duration={500} pathList={pathList}>
              {steps.map(step => (
                <Route
                  key={step.componentPath}
                  exact
                  path={Array.isArray(step.path)
                    ? step.path.map(s => (match.path + s))
                    : match.path + step.path}
                  render={() => (
                    <Layout>
                      <AsyncLoad
                        container={step.componentPath}
                        {...step.props}
                      />
                    </Layout>

                  )}
                />
              ))}
            </SlideRoutes>
          )}
        </StepContainer>
        <WizardNavControlPortal id="wizard-buttons">
          {children}
        </WizardNavControlPortal>
      </WizardContainer>
    </StateMachineProvider>
  );
};

export default React.memo(Wizard);
