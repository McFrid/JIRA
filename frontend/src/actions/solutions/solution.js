import actionTypes from '../actionTypes';

import solutionsService from '../../services/solutions-service';

const storeSolution = solution => async (dispatch) => {
  const response = await solutionsService.saveSolution(solution);

  dispatch({
    type: actionTypes.solution.SOLUTION_STORE,
    payload: {
      solution: {
        ...response.data,
      },
    },
  });
};

const updateSolution = (id, solution) => async (dispatch) => {
  const response = await solutionsService.updateSolution({
    ...solution,
    id,
  });

  dispatch({
    type: actionTypes.solution.SOLUTION_UPDATE,
    payload: {
      solution: response.data,
    },
  });
};

const removeSolution = id => async (dispatch) => {
  try {
    await solutionsService.removeSolution(id);

    dispatch({
      type: actionTypes.solution.SOLUTION_REMOVE,
      payload: {
        id,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export default {
  storeSolution,
  updateSolution,
  removeSolution,
};
