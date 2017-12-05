import { auth } from '../config';

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGIN_USER = 'login_user';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }, callback) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    auth.signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user, callback))
      .catch((error) => {
        console.log(error);
        loginUserFail(dispatch)

        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //   .then(user => loginUserSuccess(dispatch, user))
        //   .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = async (dispatch, user, callback) => {
  // await AsyncStorage.setItem('user', JSON.stringify(user))
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  callback();
};
