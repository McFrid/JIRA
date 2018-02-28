import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter as Router, Switch } from 'react-router-dom'

import App from './components/app/app'
import Store from './store/store'

//import 'bootstrap/dist/css/bootstrap.css'

const store = Store.configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <App />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
