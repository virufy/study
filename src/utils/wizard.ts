import { isClinic } from 'helper/basePathHelper';

// TODO: Improve types
export function updateAction(storeKey: string): any {
  // storeKey = "welcome"
  return (state: any, payload: any) => ({
    ...state,
    [storeKey]: {
      ...state[storeKey],
      ...payload,
    },
  });
}

export function resetStore(): any {
  return (state: any) => {
    const output: CommonJSON = { welcome: { language: state.welcome.language } };
    if (isClinic) {
      output.welcome.country = state.welcome.country;
      output.welcome.region = state.welcome.region;
      output.welcome.hospitalId = state.welcome.hospitalId;
    }
    return output;
  };
}
