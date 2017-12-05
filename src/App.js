import React, { Component } from 'react';
// import FormValidateFieldLevel from './FormValidateFieldLevel'
import { LogIn } from './authFirebase';
import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import CategoryForm from './components/CategoryForm';
import CookingTypeForm from './components/CookingTypeForm';
import IngredientsForm from './components/IngredientsForm';
import Sample from './FieldLevelValidation/Sample';
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
            <Route exact path="/login" component={LogIn}/>
            <Route path="/new" component={MenuForm}/>
            <Route path="/menus/:id" component={MenuForm}/>
            <Route path="/lookups/category" component={CategoryForm}/>
            <Route path="/lookups/cookingType" component={CookingTypeForm}/>
            <Route path="/lookups/ingredients" component={IngredientsForm}/>
            <Route path="/sample" component={Sample}/>
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
