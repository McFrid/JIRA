import request from '../utils/request';

const SOLUTIONS_BASE = 'solutions';

const fetchSolutions = () => request.get(SOLUTIONS_BASE);

const saveSolution = solution => request.post(SOLUTIONS_BASE, solution);

const updateSolution = solution => request.put(SOLUTIONS_BASE, solution);

const removeSolution = id => request.delete(`${SOLUTIONS_BASE}/${id}`);

const removeMultipleSolutions = ids => request.delete(`${SOLUTIONS_BASE}`, ids);

export default {
  fetchSolutions,
  saveSolution,
  updateSolution,
  removeSolution,
  removeMultipleSolutions,
};
