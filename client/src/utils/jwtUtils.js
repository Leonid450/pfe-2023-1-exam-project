import { jwtDecode } from 'jwt-decode';

export function checkToken(token) {
  if (!token) return false;

  const { exp } = jwtDecode(token);

  const currentTime = Date.now();

  return currentTime < exp * 1000;
}
