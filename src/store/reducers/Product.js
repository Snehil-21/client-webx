import {
  GET_ALL_PRODUCTS,
  GET_WISHLIST_PRODUCTS,
  SET_WISHLIST_PRODUCTS,
} from "../actions/Product";

const initialState = {
  productsList: [],
  wishlistProductsList: [],
};

export default function ProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      return {
        ...state,
        productsList: action.payload.allProducts,
      };
    }
    case GET_WISHLIST_PRODUCTS: {
      return {
        ...state,
        wishlistProductsList: action.payload.allProducts,
      };
    }
    case SET_WISHLIST_PRODUCTS: {
      return {
        ...state,
        wishlistProductsList: action.payload.allProducts,
      };
    }
    default: {
      return state;
    }
  }
}
