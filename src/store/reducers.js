import * as types from './types';

export const initialState = {
  auth: false,
  adverts: null,
  tags: null,
  ui: {
    loading: false,
    error: null,
  },
  advert: null,
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      return action.payload;
    case types.AUTH_LOGOUT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export const ui = (state = initialState.ui, action) => {
  if (action.error) {
    return { ...state, error: action.payload, loading: false };
  }

  if (/REQUEST/.test(action.type)) {
    return { ...state, loading: true };
  }

  if (/SUCCESS/.test(action.type)) {
    return { ...state, error: null, loading: false };
  }
  return state;
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case types.TAGS_LOADED_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_LOADED_SUCCESS:
      return action.payload;

    case types.ADVERTS_CREATED_SUCCESS:
      if (!state) {
        return [action.payload];
      }
      return [...state, action.payload];

    case types.ADVERTS_DELETED_SUCCESS:
      return state.filter(advert => advert.id !== action.payload);
    default:
      return state;
  }
};

export const advert = (state = initialState.advert, action) => {
  switch (action.type) {
    case types.ADVERT_LOADED_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};
