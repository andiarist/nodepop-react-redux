import { AUTH_LOGIN, AUTH_LOGOUT } from './types';

export const authLogin = isLogged => {
  return {
    type: AUTH_LOGIN,
    payload: {
      isLogged,
    },
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
