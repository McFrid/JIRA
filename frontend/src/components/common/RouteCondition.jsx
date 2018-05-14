import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import account from '../../utils/account';

const RouteCondition = (props) => {
  const role = account.getAccountRole();
  const isAllowed = props.allowedRoles.includes(role);

  return (
    <React.Fragment>
      <Route path={props.path} render={() => {
        return isAllowed ? (
          props.children
        ) : (
          <Redirect to={props.redirectTo} />
        );
      }} />
    </React.Fragment>
  );
};

export default RouteCondition;
