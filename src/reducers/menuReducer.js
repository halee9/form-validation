import { FETCH_MENUS, FETCH_MENU } from '../actions/menu';

export default function menuReducer(state={}, action){
  switch (action.type) {
    case FETCH_MENUS: 
      return action.payload;
      break;
    case FETCH_MENU: 
      const { id } = action.payload;
      return { ...state, [id]: action.payload };
      break;
    default:
      return state;
  }
}
