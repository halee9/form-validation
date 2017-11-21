import React, { Component } from 'react';
// import FormValidateFieldLevel from './FormValidateFieldLevel'
import MenuForm from './components/MenuForm';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers';

const store = createStore(reducers);

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
