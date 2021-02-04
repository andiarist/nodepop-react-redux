import {
  authLoginSuccess,
  tagsLoadedSuccess,
  advertCreatedSuccess,
  advertCreatedFailure,
  login,
  logout,
} from './actions';
import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_REQUEST,
  TAGS_LOADED_SUCCESS,
  ADVERTS_CREATED_SUCCESS,
} from './types';

// Testing sync actions
describe('Testing authLoginSuccess', () => {
  const isLogged = true;
  const expectedResult = {
    type: AUTH_LOGIN_SUCCESS,
    payload: isLogged,
  };
  const action = authLoginSuccess(isLogged);
  test('should create an AUTH_LOGIN_SUCCESS action with isLogged', () => {
    expect(action).toEqual(expectedResult);
  });
  test('should create an AUTH_LOGIN_SUCCESS action with isLogged as true', () => {
    expect(action.payload).toBe(true);
  });
});

describe('Testing tagsLoadedSuccess', () => {
  test('should create a TAGS_LOADED_SUCCESS action with tags', () => {
    const tags = [];
    const expectedResult = {
      type: TAGS_LOADED_SUCCESS,
      payload: tags,
    };
    const action = tagsLoadedSuccess(tags);
    expect(action).toEqual(expectedResult);
  });
});

describe('Testing advertCreatedSuccess', () => {
  test('Should create a ADVERTS_CREATED_SUCCESS action with advert', () => {
    const advert = {};
    const expectedResult = {
      type: ADVERTS_CREATED_SUCCESS,
      payload: advert,
    };
    const action = advertCreatedSuccess(advert);
    expect(action).toEqual(expectedResult);
  });
});

describe('Testing advertCreatedFailure', () => {
  test('Should create a ADVERTS_CREATED_FAILURE action with error', () => {
    const error = {};

    const action = advertCreatedFailure(error);
    expect(action.error).toBe(true);
  });
});

// Testing async actions

describe('Testing login', () => {
  const credentials = 'credentials';
  const dispatch = jest.fn();
  const history = {
    push: jest.fn(),
    replace: jest.fn(),
  };
  const location = { pathname: '/' };
  const thunkAction = login(credentials, location, history);
  test('Should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
    const isLogged = true;
    const api = { auth: { login: jest.fn().mockResolvedValue(isLogged) } };
    await thunkAction(dispatch, undefined, { api });

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: AUTH_LOGIN_REQUEST });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AUTH_LOGIN_SUCCESS,
      payload: isLogged,
    });
    expect(api.auth.login).toHaveBeenCalledWith(credentials);
    expect(history.replace).toHaveBeenCalledWith(location);
  });
});

describe('Testing logout', () => {
  const dispatch = jest.fn();
  const thunkAction = logout();

  test('Should dispatch an AUTH_LOGOUT_SUCCESS action', async () => {
    const api = { auth: { logout: jest.fn().mockResolvedValue() } };
    await thunkAction(dispatch, undefined, { api });

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: AUTH_LOGOUT_REQUEST });
    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AUTH_LOGOUT_SUCCESS,
      payload: false,
    });
  });
});
