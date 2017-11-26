import { combineReducers } from 'redux'
import { formReducer } from '../formValidate'

const rootReducer = combineReducers({
  forms: formReducer,
})

export default rootReducer
