import { combineReducers } from 'redux'
import { formReducer } from '../formValidate'
import menuReducer from './menuReducer'

const rootReducer = combineReducers({
  forms: formReducer,
  menus: menuReducer,
})

export default rootReducer
