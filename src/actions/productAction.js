import axiosInstance from '../axiosConfig';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';

export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAIL = 'FETCH_PRODUCT_FAIL';

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const { data } = await axiosInstance.get('/products/getallproducts');


    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

// Fetch single product by ID
export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_PRODUCT_REQUEST });

    const { data } = await axiosInstance.get(`/products/product/${id}`);

    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
