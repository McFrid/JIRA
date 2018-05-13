import actionTypes from '../actions/actionTypes';

const initState = {
  items: [],
  areFetching: false,
  areLoaded: false,
  isError: false,
};

const solutionsState = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.solution.SOLUTION_STORE:
      return {
        ...state,
        items: [
          ...state.items,
          action.payload.solution,
        ],
      };

    case actionTypes.solution.SOLUTION_UPDATE:
      return {
        ...state,
        items: state.items.map((solution) => {
          if (solution.id === action.payload.solution.id) {
            return {
              ...action.payload.solution,
            };
          }

          return solution;
        }),
      };

    case actionTypes.solution.SOLUTION_REMOVE:
      return {
        ...state,
        items: state.items.filter(solution => solution.id !== action.payload.id),
      };

    case actionTypes.solutions.SOLUTIONS_FETCH:
      return {
        ...state,
        items: [],
        areFetching: true,
        areLoaded: false,
      };

    case actionTypes.solutions.SOLUTIONS_STORE:
      return {
        ...state,
        items: action.payload.solutions,
        areFetching: false,
        areLoaded: true,
      };

    case actionTypes.solution.SOLUTION_REQUEST:
      return {
        ...state,
        isError: false,
      };

    case actionTypes.solution.SOLUTION_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
      };

    default:
      return state;
  }
};

export default solutionsState;
