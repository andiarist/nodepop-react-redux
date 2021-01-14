import React from 'react';
import ReactDOM from 'react-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App, { Root } from './components/App';

import { configureStore } from './store';
import { initialState } from './store/reducers';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

console.log('token:', token);

const store = token
  ? configureStore({ ...initialState, auth: true })
  : configureStore({ ...initialState, auth: false });

console.log('store.getState().auth:', store.getState().auth);

const render = () => {
  ReactDOM.render(
    <Root>
      <App dispatch={store.dispatch} isLogged={store.getState().auth} />
    </Root>,
    document.getElementById('root'),
  );
};
store.subscribe(render);
render();
