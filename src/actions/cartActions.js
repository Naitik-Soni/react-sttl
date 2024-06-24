import axiosInstance from '../axiosConfig';

export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAIL = 'ADD_TO_CART_FAIL';
export const FETCH_CART_REQUEST = 'FETCH_CART_REQUEST';
export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_FAIL = 'FETCH_CART_FAIL';
export const ADD_TO_CART_LOCAL = 'ADD_TO_CART_LOCAL';


export const addToCart = (userId, productId, price) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST });

    const { data } = await axiosInstance.post('/cart/createOrUpdateCart', {
      userId,
      items: [{ product: productId, price }],
    });

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};  
export const fetchCart = (userId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_CART_REQUEST });

    const { data } = await axiosInstance.get(`/cart/${userId}`);

    dispatch({ type: FETCH_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};



export const addToCartLocal = (localCartItems) => {
  return {
    type: ADD_TO_CART_LOCAL,
    payload: localCartItems,
  };
};


