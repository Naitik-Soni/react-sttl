import {
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  ADD_TO_CART_LOCAL,
} from '../actions/cartActions';

const initialState = {
  loading: false,
  items: [],
  error: null,
};

export const cartReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_TO_CART_REQUEST:
    case FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.data.items,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.data.items,
      };
    case ADD_TO_CART_FAIL:
    case FETCH_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case ADD_TO_CART_LOCAL:
        const item = action.payload;
        const existItem = state.items.find((x) => x.product._id === item._id);
         console.log(item+"sended item");
         console.log(existItem+"existing item")

        if (existItem) {
          return {
            ...state,
            items: state.items.map((x) =>
              x.product._id === existItem.product._id ? { ...x, quantity: x.quantity + 1 } : x
            ),
          };
        } else {
          return {
            ...state,
            items: [...state.items, { product: item, quantity: 1 }],
          };
        
        }
      
    default:
      return state;
  }
};
