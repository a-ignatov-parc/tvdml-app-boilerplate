import { LAUNCH, RESUME, SUSPEND } from './app';

const INCREMENT = 'counter/increment';

let timer;

export function incrementCounter() {
  return { type: INCREMENT };
}

export const counterMiddleware = store => next => action => {
  const result = next(action);

  switch (action.type) {
    case LAUNCH:
    case RESUME:
      timer = setInterval(() => {
        store.dispatch(incrementCounter());
      }, 1000);
      break;
    case SUSPEND:
      if (timer) clearInterval(timer);
      break;
    default:
  }

  return result;
};

export default function counterReducer(state = 0, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}
