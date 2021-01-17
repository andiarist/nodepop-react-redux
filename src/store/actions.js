import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  //ADVERTS_LOADED,
  ADVERTS_LOADED_REQUEST,
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_LOADED_FAILURE,
  //TAGS_LOADED,
  TAGS_LOADED_REQUEST,
  TAGS_LOADED_SUCCESS,
  TAGS_LOADED_FAILURE,
  //ADVERTS_CREATED
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE,
  //ADVERT_LOADED,
  ADVERT_LOADED_REQUEST,
  ADVERT_LOADED_SUCCESS,
  ADVERT_LOADED_FAILURE,
  ADVERT_DELETED,
  ADVERT_DELETED_REQUEST,
  ADVERT_DELETED_SUCCESS,
  ADVERT_DELETED_FAILURE,
} from './types';

//import * as auth from '../api/auth';

import { getTagList, getAdvertsList } from './selectors';

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
    payload: tags,
  };
};

export const getTags = () => {
  return function (dispatch, getState, { api }) {
    dispatch(tagsLoadedRequest());
    const state = getState();
    const cacheTags = getTagList(state);
    if (!cacheTags) {
      api.adverts
        .getTags()
        .then(({ result: tags }) => {
          dispatch(tagsLoadedSuccess(tags));
        })
        .catch(error => {
          dispatch(tagsLoadedFailure(error));
        });
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedFailure = error => ({
  type: ADVERTS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoadedSuccess = adverts => {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
  };
};

export const advertsLoaded = filters => {
  return function (dispatch, getState, { api }) {
    dispatch(advertsLoadedRequest());
    api.adverts
      .getAdverts(filters)
      .then(({ result }) => {
        dispatch(advertsLoadedSuccess(result.rows));
      })
      .catch(error => {
        dispatch(advertsLoadedFailure(error));
      });
  };
};

export const advertCreatedRequest = () => ({
  type: ADVERTS_CREATED_REQUEST,
});

export const advertCreatedFailure = error => ({
  type: ADVERTS_CREATED_FAILURE,
  error: true,
  payload: error,
});

export const advertCreatedSuccess = advert => {
  return {
    type: ADVERTS_CREATED_SUCCESS,
    payload: advert,
  };
};

export const advertCreated = (advert, history) => {
  return function (dispatch, getState, { api }) {
    dispatch(advertCreatedRequest());

    const state = getState();
    const advertList = getAdvertsList(state);
    //console.log(advertList);

    api.adverts
      .createAdvert(advert)
      .then(({ result: advert }) => {
        dispatch(advertCreatedSuccess(advert));
        history.push(`/adverts/${advert._id}`);
      })
      .catch(error => {
        dispatch(advertCreatedFailure(error));
      });
  };
};

export const advertLoadedRequest = () => ({
  type: ADVERT_LOADED_REQUEST,
});

export const advertLoadedFailure = error => ({
  type: ADVERT_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const advertLoadedSuccess = advertId => {
  return {
    type: ADVERT_LOADED_SUCCESS,
    payload: advertId,
  };
};

export const advertLoaded = advertId => {
  return async function (dispatch, getState, { api }) {
    dispatch(advertLoadedRequest());

    try {
      const { result } = await api.adverts.getAdvert(advertId);

      if (!result) {
        const error = { message: 'Not found' };
        throw error;
      }
      dispatch(advertLoadedSuccess(result));
    } catch (error) {
      dispatch(advertLoadedFailure(error));
    }
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
