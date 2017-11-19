import { combineReducers } from 'redux'
import formReducer from './formReducer'

const rootReducer = combineReducers({
  forms: formReducer,
})

export default rootReducer
