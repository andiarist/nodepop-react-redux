import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  TAGS_LOADED,
  ADVERTS_CREATED,
  ADVERT_LOADED,
  ADVERT_DELETED,
} from './types';

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

export const advertCreated = advert => {
  return {
    type: ADVERTS_CREATED,
    payload: {
      advert,
    },
  };
};

export const tagsLoaded = tags => {
  return {
    type: TAGS_LOADED,
    payload: {
      tags,
    },
  };
};

export const advertLoaded = (adverts, id) => {
  return {
    type: ADVERT_LOADED,
    payload: {
      adverts,
    },
  };
};

export const advertDeleted = (adverts, id) => {
  return {
    type: ADVERT_DELETED,
    payload: {
      adverts,
    },
  };
};
