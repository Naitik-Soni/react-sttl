import {
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAIL,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAIL,
  } from '../actions/productAction';
  
  const initialState = {
    loading: false,
    products: [],
    product: null,
    error: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PRODUCTS_REQUEST:
      case FETCH_PRODUCT_REQUEST:
        return { ...state, loading: true };
  
      case FETCH_PRODUCTS_SUCCESS:
        return { ...state, loading: false, products: action.payload, error: null };
  
      case FETCH_PRODUCT_SUCCESS:
        return { ...state, loading: false, product: action.payload, error: null };
  
      case FETCH_PRODUCTS_FAIL:
      case FETCH_PRODUCT_FAIL:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default productReducer;
  