import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SIGNOUT_USER,
} from './actions';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      console.log("LOGIN_USER_SUCCESS reducer")
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false };
    case SIGNOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
