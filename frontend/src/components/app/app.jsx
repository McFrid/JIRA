import React from 'react';
import { Route } from 'react-router-dom';
import UsersTableContainer from '../../containers/users/UsersContainer';

const App = () => (
  <Route path="/users" component={UsersTableContainer} />
);

export default App;
