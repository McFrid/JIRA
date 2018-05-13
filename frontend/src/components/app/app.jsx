import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavigationBar from '../../components/common/NavigationBar';
import UsersTableContainer from '../../containers/users/UsersContainer';
import LoginContainer from '../../containers/login/LoginContainer';
import ProductsContainer from '../../containers/products/ProductsContainer';
import StoriesContainer from '../../containers/stories/StoriesContainer';
import IssuesContainer from '../../containers/issues/IssuesContainer';

import Spinner from '../../components/common/Spinner';
import FullScreenSpinner from '../../components/common/FullScreenSpinner';

import auth from '../../utils/auth';
import account from '../../utils/account';

class App extends React.Component {
  componentDidMount() {
    this.props.appActions.setAuthenticatedState(auth.isAuthorized());
  }

  get links() {
    return [
      {
        name: 'Users',
        route: '/users',
      },
      {
        name: 'Products',
        route: '/products',
      },
      {
        name: 'Stories',
        route: '/stories',
      },
      {
        name: 'Issues',
        route: '/issues',
      },
    ];
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
      <React.Fragment>
        {this.props.isAuthenticated &&
          <header>
            <NavigationBar
              title="X-Pulse"
              username={account.getAccountUsername()}
              onLogout={this.props.userActions.logout}
              links={this.links}
            />
          </header>
        }
        <main>
          <Route path="/" exact render={() => <Redirect to="/users" />} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/users" component={UsersTableContainer} />
          <Route path="/products" component={ProductsContainer} />
          <Route path="/stories" component={StoriesContainer} />
          <Route path="/issues" component={IssuesContainer} />

          {this.props.isActiveRequest && (
            <FullScreenSpinner />
          )}
        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  appActions: PropTypes.objectOf(PropTypes.func),
  userActions: PropTypes.objectOf(PropTypes.func),
  isChecking: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  isActiveRequest: PropTypes.bool,
};

App.defaultProps = {
  appActions: null,
  userActions: null,
  isChecking: true,
  isAuthenticated: false,
  location: null,
  isActiveRequest: false,
};

export default App;
