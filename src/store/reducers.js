import * as types from './types';

export const initialState = {
  auth: false,
  adverts: null,
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
    default:
      return state;
  }
};

//const reducer = (state = initialState, action) => {
//  return {
//    auth: auth(state.auth, action),
//    adverts: null,
//  };
//};

//export default reducer;
