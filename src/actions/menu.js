import _ from 'lodash';
import { database } from '../config';

export const FETCH_MENUS = 'FETCH_MENUS';
export const ADD_MENU = 'ADD_MENU';

const systemName = 'srm';
const currentUser = {
  uid: 'test'
}

export const fetchMenus = () => { 
  return (dispatch) => {
    database.ref(`/${systemName}/${currentUser.uid}/menus`)
      .on('value', snapshot => {
        dispatch({ type: FETCH_MENUS, payload: snapshot.val() });
      })
  };
};

export const addMenu = (menu) => { 
  return (dispatch) => {
    database.ref(`/${systemName}/${currentUser.uid}/menus`)
      .push(menu)
  };
};
