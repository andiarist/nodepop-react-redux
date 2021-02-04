import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LoginPage from './LoginPage';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe('Testing <LoginPage />', () => {
  const props = {
    onLogin: jest.fn(),
    history: {},
    location: {},
    error: null,
    loading: false,
  };
  const render = () =>
    shallow(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>,
    );
  test('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });
});
