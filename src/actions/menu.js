import _ from 'lodash';
import { database } from '../config';

export const FETCH_MENUS = 'FETCH_MENUS';
export const FETCH_MENU = 'FETCH_MENU';
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

export const fetchMenu = (id) => { 
  return () => {
    return database.ref(`/${systemName}/${currentUser.uid}/menus/${id}`)
      .once('value');
  }
};

export const addMenu = (menu) => { 
  return (dispatch) => {
    return database.ref(`/${systemName}/${currentUser.uid}/menus`)
      .push(menu)
  };
};

export const updateMenu = (menu) => { 
  return (dispatch) => {
    return database.ref(`/${systemName}/${currentUser.uid}/menus/${menu.id}`)
      .update(menu)
  };
};

export const removeMenu = (id) => { 
  return (dispatch) => {
    return database.ref(`/${systemName}/${currentUser.uid}/menus/${id}`)
      .remove()
  };
};
