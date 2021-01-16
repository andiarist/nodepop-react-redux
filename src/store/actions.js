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
  ADVERTS_CREATED_REQUEST,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_CREATED_FAILURE,
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
    const cacheTags = getState().tags;
    if (!cacheTags) {
      api.adverts
        .getTags()
        .then(({ result: tags }) => {
          //console.log('dentro del then de la llamada al api');
          console.log('tags:', tags);
          dispatch(tagsLoadedSuccess(tags));
        })
        .catch(error => {
          console.log('dentro del error de las tags');
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

    const advertList = getState().adverts;
    console.log(advertList);

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
