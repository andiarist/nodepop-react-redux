import { AUTH_LOGIN, AUTH_LOGOUT, ADVERTS_LOADED } from './types';

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

export const advertsLoaded = adverts => {
  return {
    type: ADVERTS_LOADED,
    payload: {
      adverts,
    },
  };
};
