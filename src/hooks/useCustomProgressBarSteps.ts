import { useMemo } from 'react';
import { useStateMachine } from 'little-state-machine';

// Utils
import { updateAction } from 'utils/wizard';

const useCustomProgressBarSteps = (storeKey: any, metadata: CommonJSON<any> | undefined) => {
  // Hooks
  const { state } = useStateMachine(updateAction(storeKey));

  // Memos
  const customSteps = useMemo(() => {
    const steps = {
      total: metadata?.total,
      current: metadata?.current,
    };
    const antigenTaken = state['submit-steps'].typeCovidFlu?.selected.includes('antigenTaken');
    const PCRTaken = state['submit-steps'].typeCovidFlu?.selected.includes('PCRTaken');
    const fluTaken = state['submit-steps'].typeCovidFlu?.selected.includes('fluTaken');
    const antigenTakenScreens = 1;
    const PCRTakenScreens = 2;
    const fluTakenScreens = 2;

    switch (true) {
      case antigenTaken && !PCRTaken && !fluTaken:
        steps.total = metadata?.total - PCRTakenScreens - fluTakenScreens;
        steps.current = metadata?.current - PCRTakenScreens - fluTakenScreens;
        break;

      case (antigenTaken && PCRTaken && !fluTaken) || (antigenTaken && !PCRTaken && fluTaken):
        steps.total = metadata?.total - (PCRTakenScreens || fluTakenScreens);
        steps.current = metadata?.current - (PCRTakenScreens || fluTakenScreens);
        break;

      case !antigenTaken && !PCRTaken && !fluTaken:
        steps.total = metadata?.total - antigenTakenScreens - PCRTakenScreens - fluTakenScreens;
        steps.current = metadata?.current - antigenTakenScreens - PCRTakenScreens - fluTakenScreens;
        break;

      case !antigenTaken && PCRTaken && fluTaken:
        steps.total = metadata?.total - antigenTakenScreens;
        steps.current = metadata?.current - antigenTakenScreens;
        break;

      case (!antigenTaken && !PCRTaken && fluTaken)
      || (!antigenTaken && PCRTaken && !fluTaken):
        steps.total = metadata?.total - antigenTakenScreens - (fluTakenScreens || PCRTakenScreens);
        steps.current = metadata?.current - antigenTakenScreens - (fluTakenScreens || PCRTakenScreens);
        break;

      default:
        break;
    }

    return steps;
  }, [state, metadata]);

  // only for PCR test screens
  const customCurrentStepPCR = useMemo(() => {
    const PCRTaken = state['submit-steps'].typeCovidFlu?.selected.includes('PCRTaken');
    const antigenTaken = state['submit-steps'].typeCovidFlu?.selected.includes('antigenTaken');
    const fluTaken = state['submit-steps'].typeCovidFlu?.selected.includes('fluTaken');

    if ((PCRTaken && !antigenTaken && !fluTaken) || (PCRTaken && antigenTaken && !fluTaken)) {
      return customSteps.current + 2;
    }
    return customSteps.current;
  }, [state, customSteps]);

  return {
    customSteps,
    customCurrentStepPCR,
  };
};

export default useCustomProgressBarSteps;
