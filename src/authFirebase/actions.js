import { auth } from '../config';

export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGIN_USER = 'login_user';
export const SIGNOUT_USER = 'signout_user';

const authUser = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});

const signOutUser = () => {
  return function (dispatch) {
    auth.signOut()
    .then(() =>{
      dispatch({
        type: SIGNOUT_USER
      })
    });
  }
}

export const verifyAuth = () => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("signin: ", user.uid)
        dispatch(authUser(user));
      } 
      else {
        console.log("signout ")
        dispatch(signOutUser());
      }
    });
    
  }
}

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

const loginUserSuccess = (dispatch, user, callback) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  callback();
};
