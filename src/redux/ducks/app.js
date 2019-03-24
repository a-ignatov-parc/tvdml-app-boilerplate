import { ACTIVE, LOADING, SUSPENDED } from './app/states';

export const LAUNCH = 'app/launch';
export const RESUME = 'app/resume';
export const SUSPEND = 'app/suspend';

const defaultState = {
  state: LOADING,
  launchParams: null,
};

export default function appReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case LAUNCH:
      return {
        ...state,
        state: ACTIVE,
        launchParams: action.params,
      };
    case SUSPEND:
      return {
        ...state,
        state: SUSPENDED,
      };
    case RESUME:
      return {
        ...state,
        state: ACTIVE,
      };
    default:
      return state;
  }
}

export function launchApp(params) {
  return { type: LAUNCH, params };
}

export function suspendApp() {
  return { type: SUSPEND };
}

export function resumeApp() {
  return { type: RESUME };
}
