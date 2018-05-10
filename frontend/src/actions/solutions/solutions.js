import actionTypes from '../actionTypes';
import actions from '../index';
import solutionsService from '../../services/solutions-service';

const storeSolutions = solutions => ({
  type: actionTypes.solutions.SOLUTIONS_STORE,
  payload: {
    solutions,
  },
});

const fetchSolutions = () => async (dispatch) => {
  dispatch({
    type: actionTypes.solutions.SOLUTIONS_FETCH,
  });

  try {
    const solutions = await solutionsService.fetchSolutions();
    dispatch(storeSolutions(solutions.data));
  } catch (error) {
    if (error.response.status === 401) {
      dispatch(actions.app.setAuthenticationError());
    }
  }
};

export default {
  fetchSolutions,
};
