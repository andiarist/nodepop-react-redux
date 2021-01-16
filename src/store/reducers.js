import * as types from './types';

export const initialState = {
  auth: false,
  adverts: null,
  tags: null,
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN:
      return action.payload.isLogged;
    case types.AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
};

export const adverts = (state = initialState.adverts, action) => {
  switch (action.type) {
    case types.ADVERTS_LOADED:
      return action.payload.adverts;
    case types.ADVERTS_CREATED:
      if (!state) {
        return [action.payload.advert];
      }
      return [...state, action.payload.advert];
    default:
      return state;
  }
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case types.TAGS_LOADED:
      return action.payload.tags;
    default:
      return state;
  }
};
