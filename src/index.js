import React from 'react';
import ReactDOM from 'react-dom';

import { configureClient } from './api/client';
import storage from './utils/storage';
import './index.css';
import App, { Root } from './components/App';

import { configureStore } from './store';

// Read token from storage
const { token } = storage.get('auth') || { token: null };

// Configure api client
configureClient(token);

const store = token
  ? configureStore({ auth: true })
  : configureStore({ auth: false });

const render = () => {
  ReactDOM.render(
    <Root store={store}>
      <App />
    </Root>,
    document.getElementById('root'),
  );
};

render();
