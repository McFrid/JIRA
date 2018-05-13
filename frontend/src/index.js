import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import AppContainer from './containers/app/AppContainer';
import Store from './store/store';

import auth from './utils/auth';
import account from './utils/account';

import actions from './actions';

const store = Store.configureStore();

store.subscribe(() => {
  const currentState = store.getState();

  if (currentState.app.doesAuthenticationErrorExist) {
    auth.logout();
    account.removeAccount();

    store.dispatch(actions.app.setAuthenticatedState(false));
  }
});

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Router>
        <Switch>
          <AppContainer />
        </Switch>
      </Router>
      <ReduxToastr
        timeOut={4000}
        newestOnTop
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </React.Fragment>
  </Provider>,
  document.getElementById('root'),
);
