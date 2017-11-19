import React, { Component } from 'react';
import FormValidateFormLevel from './FormValidateFormLevel'
import FormValidateFieldLevel from './FormValidateFieldLevel'
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers';

const store = createStore(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <FormValidateFormLevel />
          <FormValidateFieldLevel />
        </div>
      </Provider>
    );
  }
}

export default App;
