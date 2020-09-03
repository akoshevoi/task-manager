import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';

import Router from './router';

import './scss/style.scss';

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
)