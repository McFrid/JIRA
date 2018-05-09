import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  isFetching: false,
  isLoaded: false,
  isError: false,
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
      };

    case actionTypes.products.PRODUCTS_FETCH:
      return {
        ...state,
        items: [],
        isFetching: true,
        isLoaded: false,
      };

    case actionTypes.products.PRODUCTS_STORE:
      return {
        ...state,
        items: action.payload.products,
        isFetching: false,
        isLoaded: true,
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

    default:
      return state;
  }
};

export default productsState;
