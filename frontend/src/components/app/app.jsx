import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import UsersTableContainer from '../../containers/users/UsersContainer';

class App extends Component {
  render() {
    return (
      <Route path="/users" component={UsersTableContainer} />
    );
  }
}

export default App;
