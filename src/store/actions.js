import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  ADVERTS_LOADED,
  //TAGS_LOADED,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  TAGS_LOADED_FAILURE,
  ADVERTS_CREATED,
  ADVERT_LOADED,
  ADVERT_DELETED,
} from './types';

//import * as auth from '../api/auth';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = isLogged => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: isLogged,
  };
};

export const login = (credentials, location, history) => {
  return function (dispatch, getState, { api }) {
    dispatch(authLoginRequest());
    api.auth
      .login(credentials)
      .then(() => {
        dispatch(authLoginSuccess(true));
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      })
      .catch(error => {
        dispatch(authLoginFailure(error));
      });
  };
};

//export const tagsLoaded = tags => {
//  return {
//    type: TAGS_LOADED,
//    payload: {
//      tags,
//    },
//  };
//};

export const tagsLoadedRequest = () => ({
  type: TAGS_LOADED_REQUEST,
});

export const tagsLoadedFailure = error => ({
  type: TAGS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const tagsLoadedSuccess = tags => {
  return {
    type: TAGS_LOADED_SUCCESS,
    payload: {
      tags,
    },
  };
};

export const getTags = () => {
  return function (dispatch, getState, { api }) {
    dispatch(tagsLoadedRequest());
    api.adverts
      .getTags()
      .then(({ result: tags }) => {
        console.log('dentro del then de la llamada al api');
        console.log(tags);
        dispatch(tagsLoadedSuccess(tags));
      })
      .catch(error => dispatch(tagsLoadedFailure(error)));
    //} else {
    //console.log('no entra en el if para sacar los tags');
    //}
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

export const advertLoaded = advertId => {
  return {
    type: ADVERT_LOADED,
    payload: {
      advertId,
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
