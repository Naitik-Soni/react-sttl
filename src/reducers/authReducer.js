import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
  } from '../actions/authActions';
  
  const initialState = {
    loading: false,
    user: null,
    error: null,
    isAuthenticated:false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER_REQUEST:
      case LOGIN_USER_REQUEST:
        return { ...state, loading: true };
  
      case REGISTER_USER_SUCCESS:
      case LOGIN_USER_SUCCESS:
        return { ...state, loading: false, user: action.payload ,isAuthenticated:true};
  
      case REGISTER_USER_FAIL:
      case LOGIN_USER_FAIL:
        return { ...state, loading: false, error: action.payload ,isAuthenticated:false};
  
      case LOGOUT_USER:
        return { ...state, user: null ,isAuthenticated:false};
  
      default:
        return state;
    }
  };
  
  export default authReducer;
  