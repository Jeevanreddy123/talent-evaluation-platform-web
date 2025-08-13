import axios from './axios/axios-instance';

// Evaluates a candidate (POST)
export const evaluateCandidate = (data) => {
  return axios.post('/evaluator/evaluate-candidate', data);
};
