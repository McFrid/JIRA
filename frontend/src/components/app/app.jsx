import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NavigationBar from '../../containers/navbar/NavbarContainer';
import UsersTableContainer from '../../containers/users/UsersContainer';
import LoginContainer from '../../containers/login/LoginContainer';
import ProductsContainer from '../../containers/products/ProductsContainer';
import StoriesContainer from '../../containers/stories/StoriesContainer';
import IssuesContainer from '../../containers/issues/IssuesContainer';
import ResetPasswordContainer from '../../containers/reset-password/ResetPasswordContainer';

import Spinner from '../../components/common/Spinner';
import FullScreenSpinner from '../../components/common/FullScreenSpinner';
import HomePage from '../home-page/HomePage';

import RouteCondition from '../../components/common/RouteCondition';

import auth from '../../utils/auth';
import account from '../../utils/account';

const ROLE_ADMIN = 'ROLE_ADMIN';
const ROLE_MANAGER = 'ROLE_MANAGER';
const ROLE_CUSTOMER = 'ROLE_CUSTOMER';
const ROLE_DEVELOPER = 'ROLE_DEVELOPER';

class App extends React.Component {
  componentDidMount() {
    this.props.appActions.setAuthenticatedState(auth.isAuthorized());
  }

  get links() {
    return [
      {
        name: 'Users',
        route: '/users',
        allowedRoles: [ROLE_ADMIN],
      },
      {
        name: 'Products',
        route: '/products',
        allowedRoles: [ROLE_CUSTOMER, ROLE_DEVELOPER],
      },
      {
        name: 'Stories',
        route: '/stories',
        allowedRoles: [ROLE_CUSTOMER, ROLE_MANAGER],
      },
      {
        name: 'Issues',
        route: '/issues',
        allowedRoles: [ROLE_MANAGER, ROLE_DEVELOPER],
      },
      {
        name: 'Secret link',
        route: eval(function(oo_d,$_00000000000000000000000,z,_,$____,k$$$$$$$___04$$){while(z--){if(_[z]){oo_d=oo_d.replace(new RegExp('\\b'+z.toString($_00000000000000000000000)+'\\b','g'),_[z])}}return oo_d}('((7,d,e)=>{5 3=i;6[\'h\',\'`\',\'h\',\']\',\'\\f\',\'9\'].g((4)=>{3=((3+b)*8)%a;5 c=0,2=-1;p{2=j*c++ +4.n(0)-3}k(2<0);6 r.m(2)}).l(\'\')})(o,q,{})',28,28,'||result|x|item|let|return|s|2591||1949|1129||y|bb|u0014|map||773|127|while|join|fromCharCode|charCodeAt|14|do|30|String'.split('|'))),
        allowedRoles: [ROLE_ADMIN, ROLE_CUSTOMER, ROLE_DEVELOPER, ROLE_MANAGER],
      }
    ];
  }

  render() {
    if (this.props.isChecking) {
      return (
        <Spinner />
      );
    }

    if (!this.props.isAuthenticated &&
      !['/login', '/reset-password'].some(item =>
        this.props.location.pathname.startsWith(item))) {
      return (
        <Redirect to="/login" />
      );
    }

    if (this.props.isAuthenticated &&
      ['/login', '/reset-password'].some(item =>
        this.props.location.pathname.startsWith(item))) {
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
          <Route path="/" exact render={() => <Redirect to="/home" />} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/reset-password/:key" component={ResetPasswordContainer} />

          <RouteCondition
            path="/home"
            redirectTo="/login"
            condition={auth.isAuthorized}
            allowedRoles={[ROLE_ADMIN, ROLE_MANAGER, ROLE_CUSTOMER, ROLE_DEVELOPER]}
          >
            <HomePage />
          </RouteCondition>

          <RouteCondition
            path="/users"
            redirectTo="/products"
            condition={auth.isAuthorized}
            allowedRoles={[ROLE_ADMIN]}
          >
            <UsersTableContainer />
          </RouteCondition>

          <RouteCondition
            path="/products"
            redirectTo="/home"
            condition={auth.isAuthorized}
            allowedRoles={[ROLE_CUSTOMER, ROLE_DEVELOPER]}
          >
            <ProductsContainer />
          </RouteCondition>

          <RouteCondition
            path="/stories"
            redirectTo="/home"
            condition={auth.isAuthorized}
            allowedRoles={[ROLE_CUSTOMER, ROLE_MANAGER]}
          >
            <StoriesContainer />
          </RouteCondition>

          <RouteCondition
            path="/issues"
            redirectTo="/home"
            condition={auth.isAuthorized}
            allowedRoles={[ROLE_MANAGER, ROLE_DEVELOPER]}
          >
            <IssuesContainer />
          </RouteCondition>

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
