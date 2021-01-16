import * as types from './types';

export const initialState = {
  auth: false,
  adverts: {
    adverts: null,
    loading: false,
    error: null,
  },
  tags: {
    tags: null,
    loading: false,
    error: null,
  },
  ui: {
    loading: false,
    error: null,
  },
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return action.payload;
    case types.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
};

export const ui = (state = initialState.ui, action) => {
  if (action.error) {
    return { ...state, error: action.payload, loading: false };
  }
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.AUTH_LOGIN_SUCCESS:
      return { ...state, error: null, loading: false };

    default:
      return state;
  }
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case types.TAGS_LOADED_REQUEST:
      return { ...state, loading: true };
    case types.TAGS_LOADED_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        tags: action.payload.tags,
      };
    case types.TAGS_LOADED_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_LOADED_REQUEST:
      return { ...state, loading: true };
    case types.ADVERTS_LOADED_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        adverts: action.payload.adverts,
      };
    case types.ADVERTS_LOADED_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case types.ADVERTS_CREATED:
      return {
        ...state,
        //adverts: [...state.adverts, action.payload.advert],
        adverts: state.adverts.concat(action.payload.advert),
      };
    //if (!state.adverts) {
    //  return [action.payload.adverts];
    //}
    //return [...state, action.payload.adverts];
    default:
      return state;
  }
};
