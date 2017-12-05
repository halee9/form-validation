import { FETCH_LOOKUPS } from '../actions/menu';

export default function menuReducer(state={}, action){
  switch (action.type) {
    case FETCH_LOOKUPS: 
      return action.payload;
      break;
    default:
      return state;
  }
}
