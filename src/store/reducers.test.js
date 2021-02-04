import { adverts } from './reducers';
import {
  ADVERTS_LOADED_SUCCESS,
  ADVERTS_CREATED_SUCCESS,
  ADVERTS_DELETED_SUCCESS,
} from './types';

describe('Testing adverts', () => {
  const initialState = [
    {
      id: '1',
      features: 'feat',
    },
    {
      id: '2',
      features: 'feat',
    },
  ];
  //const initialState = [{}, {}, {}];
  test('should manage ADVERTS_LOADED_SUCCESS action', () => {
    //console.log(initialState);
    const action = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: initialState,
    };
    const state = adverts(initialState, action);
    expect(state).toEqual(initialState);
    expect(state.length).toBe(initialState.length);
  });
  test('should manage ADVERTS_CREATED_SUCCESS action', () => {
    const newAdvert = {
      id: '3',
      features: 'feat',
    };
    const action = {
      type: ADVERTS_CREATED_SUCCESS,
      payload: newAdvert,
    };
    const expectedState = initialState.concat(newAdvert);

    expect(adverts(initialState, action).length).toBe(initialState.length + 1);
    expect(adverts(initialState, action)).toEqual(expectedState);
  });

  test('should manage ADVERTS_DELETED_SUCCESS action', () => {
    const action = {
      type: ADVERTS_DELETED_SUCCESS,
      payload: '1',
    };
    const expectedState = {
      id: '2',
      features: 'feat',
    };
    const state = adverts(initialState, action);
    expect(state.length).toBe(initialState.length - 1);
    expect(state).toEqual([expectedState]);
  });

  test('should manage ANY action', () => {
    const action = {
      type: 'ANY',
    };
    const state = adverts(initialState, action);
    expect(state).toEqual(initialState);
  });
});
