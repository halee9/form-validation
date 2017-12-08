import React, { Component } from 'react';
// import FormValidateFieldLevel from './FormValidateFieldLevel'

import logger from 'redux-logger'

import { LogIn } from './authFirebase';
import { verifyAuth } from './authFirebase/actions';
import { withAuth } from './authFirebase/withAuth';

import MenuForm from './components/MenuForm';
import MenuList from './components/MenuList';
import CategoryForm from './components/CategoryForm';
import CookingTypeForm from './components/CookingTypeForm';
import IngredientsForm from './components/IngredientsForm';
import Sample from './FieldLevelValidation/Sample';
import FormLevelSample from './FormLevelValidation/FormLevelSample';
import FormLevelSample2 from './ReactFormValidation/FormLevelSample';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link, Redirect
} from 'react-router-dom'

import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk, logger),
  )
);

store.dispatch(verifyAuth());
console.log(store)

class App extends Component {
  componentDidMount(){
    console.log(store.getState())
    const user = store.getState().auth.user
    // if (user.uid){
    //   console.log(user.uid)
    // }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/home" component={withAuth(MenuList)}/>
            <Route exact path="/login" component={LogIn}/>
            <Route path="/new" component={MenuForm}/>
            <Route path="/menus/:id" component={MenuForm}/>
            <Route path="/lookups/category" component={CategoryForm}/>
            <Route path="/lookups/cookingType" component={CookingTypeForm}/>
            <Route path="/lookups/ingredients" component={IngredientsForm}/>
            <Route path="/sample" component={Sample}/>
            <Route path="/formSample" component={FormLevelSample}/>
            <Route path="/formSample2" component={FormLevelSample2}/>
            {/* <Redirect from="/" to="/login"/> */}
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
