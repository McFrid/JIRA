import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import UsersTableContainer from '../../containers/users/UsersContainer';
import LoginContainer from '../../containers/login/LoginContainer';
import ProductContainer from '../../containers/products/ProductsContainer';
import Spinner from '../../components/common/Spinner';
import FullScreenSpinner from '../../components/common/FullScreenSpinner';

import auth from '../../utils/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.appActions.setAuthenticatedState(auth.isAuthorized());
  }

  render() {
    if (this.props.isChecking) {
      return (
        <Spinner />
      );
    }

    if (!this.props.isAuthenticated && this.props.location.pathname !== '/login') {
      return (
        <Redirect to="/login" />
      );
    }

    if (this.props.isAuthenticated && this.props.location.pathname === '/login') {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <main>
        <Route path="/" exact render={() => <Redirect to="/users" />} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/users" component={UsersTableContainer} />
        <Route path="/products" component={ProductContainer} />

        {this.props.isActiveRequest && (
          <FullScreenSpinner />
        )}
      </main>
    );
  }
}

App.propTypes = {
  appActions: PropTypes.objectOf(PropTypes.func),
  isChecking: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  isActiveRequest: PropTypes.bool,
};

App.defaultProps = {
  appActions: null,
  isChecking: true,
  isAuthenticated: false,
  location: null,
  isActiveRequest: false,
};

export default App;
