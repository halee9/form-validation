import React, { Component } from 'react';
// import FormValidateFieldLevel from './FormValidateFieldLevel'
import MenuForm from './components/MenuForm';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
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
        <div>
          <MenuForm />
        </div>
      </Provider>
    );
  }
}

export default App;
