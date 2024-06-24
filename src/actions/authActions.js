import axiosInstance from '../axiosConfig';
import { addToCart } from './cartActions';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const LOGOUT_USER = 'LOGOUT_USER';

// Register User
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const { data } = await axiosInstance.post('/users/register', userData);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

// Login User
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axiosInstance.post('/users/login', userData);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

    // Sync localStorage cart with database
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    if (cart) {
      const userId = data.data.user._id;
      console.log(userId)
      cart.forEach(item => {
        dispatch(addToCart(userId, item.product, item.price));
        console.log("cat items added in database")
      });
     
    }
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

// Logout User
export const logoutUser = () => async (dispatch) => {
  await axiosInstance.post('/users/logout');
  dispatch({ type: LOGOUT_USER });
};
