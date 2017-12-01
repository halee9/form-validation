import React, { Component } from 'react';
// import FormValidateFieldLevel from './FormValidateFieldLevel'
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={MenuList}/>
            <Route path="/new" component={MenuForm}/>
            <Route path="/menus/:id" component={MenuForm}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
