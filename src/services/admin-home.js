import axios from './axios/axios-instance';

export const assignEvaluation = (data) => {
  return axios.post('/evaluation/add-evaluation', data);
};

export const uploadResume = (file, candidateId) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`/admin/upload-resume/${candidateId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEvaluators = () => {
  return axios.get('/user/evaluators');
};

export const uploadFile = (formData) => {
  return axios.post('/file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getUploadedFiles = () => {
  return axios.get('/admin/uploaded-files');
};

export const downloadUploadedFile = (fileId) => {
  return axios.get(`/admin/download-file/${fileId}`, {
    responseType: 'blob',
  });
};

export const getUsers = () => {
  return axios.get('/user/all');
};

export const deleteUploadedFile = (fileId) => {
  return axios.delete(`/admin/delete-file/${fileId}`);
};

export const updateUser = (userData) => {
  return axios.put('/user', userData);
};
