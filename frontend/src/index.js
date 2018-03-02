import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/app/app';
import Store from './store/Store';

const store = Store.configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
