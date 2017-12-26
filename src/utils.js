import { navigate } from 'tvdml';

export function link(route, params) {
  return () => navigate(route, params);
}
