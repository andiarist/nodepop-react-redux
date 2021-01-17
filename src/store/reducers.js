import * as types from './types';

export const initialState = {
  auth: false,
  adverts: null,
  tags: null,
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

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    case types.ADVERTS_LOADED_REQUEST:
      return { ...state, loading: true };
    case types.ADVERTS_LOADED_SUCCESS:
      return { ...state, error: null, loading: false };

    case types.TAGS_LOADED_REQUEST:
      return { ...state, loading: true };
    case types.TAGS_LOADED_SUCCESS:
      return { ...state, error: null, loading: false };

    case types.ADVERTS_CREATED_REQUEST:
      return { ...state, loading: true };
    case types.ADVERTS_CREATED_SUCCESS:
      return { ...state, error: null, loading: false };

    default:
      return state;
  }
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    //case types.TAGS_LOADED_REQUEST:
    //  return { ...state, loading: true };
    case types.TAGS_LOADED_SUCCESS:
      return action.payload;

    //case types.TAGS_LOADED_FAILURE:
    //  return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    //case types.ADVERTS_LOADED_REQUEST:
    //  return { ...state, loading: true };
    case types.ADVERTS_LOADED_SUCCESS:
      return action.payload;

    //case types.ADVERTS_LOADED_FAILURE:
    //  return { ...state, error: action.payload, loading: false };

    case types.ADVERTS_CREATED_SUCCESS:
      //return {
      //...state,
      //adverts: [...state, action.payload],
      //adverts: state.adverts.concat(action.payload),
      //};
      if (!state) {
        return [action.payload];
      }
      return [...state, action.payload];
    default:
      return state;
  }
};

//export const advert = ((state = initialState.adverts), action);
