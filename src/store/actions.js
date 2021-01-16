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
    const cacheTags = getState().tags.tags;

    if (!cacheTags) {
      api.adverts
        .getTags()
        .then(({ result: tags }) => {
          //console.log('dentro del then de la llamada al api');
          //console.log(tags);
          dispatch(tagsLoadedSuccess(tags));
        })
        .catch(error => dispatch(tagsLoadedFailure(error)));
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
    payload: {
      adverts,
    },
  };
};

export const advertsLoaded = filters => {
  return function (dispatch, getState, { api }) {
    dispatch(advertsLoadedRequest());
    //const renderLoading = () => (
    //  <div style={{ display: 'flex', justifyContent: 'center' }}>
    //    <Spin size="large" />
    //  </div>
    //);
    api.adverts
      .getAdverts(filters)
      .then(({ result }) => {
        //console.log('dentro del then de la llamada al api');
        //console.log(tags);
        dispatch(advertsLoadedSuccess(result.rows));
      })
      .catch(error => {
        //const renderError = () => {
        //  const { error } = this.state;
        //  return (
        //    <Empty
        //      description={<span style={{ color: '#ff4d4f' }}>{`${error}`}</span>}>
        //      <Button type="primary" danger onClick={this.getAdverts}>
        //        Reload
        //      </Button>
        //    </Empty>
        //  );
        //};
        dispatch(advertsLoadedFailure(error));
      });
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
