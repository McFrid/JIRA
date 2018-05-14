import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  areFetching: false,
  areLoaded: false,
  isCountFetching: false,
  isCountLoaded: false,
  isError: false,
  count: 0,
};

const productsState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.product.PRODUCT_STORE:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload.product,
        ],
        count: state.count + 1,
      };

    case actionTypes.product.PRODUCT_UPDATE:
      return {
        ...state,
        items: state.items.map((product) => {
          if (product.id === action.payload.product.id) {
            return {
              ...action.payload.product,
            };
          }

          return product;
        }),
      };

    case actionTypes.product.PRODUCT_REMOVE:
      return {
        ...state,
        items: state.items.filter(product => product.id !== action.payload.id),
        count: state.count - 1,
      };

    case actionTypes.products.PRODUCTS_FETCH:
      return {
        ...state,
        items: [],
        areFetching: true,
        areLoaded: false,
      };

    case actionTypes.products.PRODUCTS_STORE:
      return {
        ...state,
        items: action.payload.products,
        areFetching: false,
        areLoaded: true,
      };

    case actionTypes.product.PRODUCT_REQUEST:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.product.PRODUCT_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
      };

    case actionTypes.products.PRODUCTS_COUNT_FETCH:
      return {
        ...state,
        isCountFetching: true,
        isCountLoaded: false,
      };

    case actionTypes.products.PRODUCTS_COUNT_STORE:
      return {
        ...state,
        isCountFetching: false,
        isCountLoaded: true,
        count: action.payload.count,
      };

    default:
      return state;
  }
};

export default productsState;
