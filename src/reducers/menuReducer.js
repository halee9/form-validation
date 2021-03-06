import { FETCH_MENUS } from '../actions/menu';

export default function menuReducer(state={}, action){
  switch (action.type) {
    case FETCH_MENUS: 
      return action.payload;
      break;
    default:
      return state;
  }
}
