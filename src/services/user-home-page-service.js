import axios from './axios/axios-instance';

export const getData = () => {
  return axios.get('/evaluator/data');
};

export const getResume = (candidateId) => {
  return axios.get(`/evaluator/resume/${candidateId}`, {
    responseType: 'blob',
  });
};

export const lookUpQuestions = (level, technology) => {
  return axios.get('/evaluator/questions', {
    params: { level, technology },
  });
};
