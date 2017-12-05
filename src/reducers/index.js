import { combineReducers } from 'redux';
import { formReducer } from '../formValidate';
import menuReducer from './menuReducer';
import lookupsReducer from './lookupsReducer';
import { authReducer } from '../authFirebase';

const rootReducer = combineReducers({
  forms: formReducer,
  menus: menuReducer,
  lookups: lookupsReducer,
  auth: authReducer,
});

export default rootReducer;
