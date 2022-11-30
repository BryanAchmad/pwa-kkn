import axios from './axios';

export const getProkerReq = (id) => axios.get(`/proker/${id}`);

export const getProkerByIdReq = (id) => axios.get(`/proker/${id}`);

export const createProkerReq = async (id, param) => {
  const response = await axios.post(`/proker/${id}`, param);
  return response;
};

export const updateProkerReq = (id, data) => {
  return axios.patch(`/proker/${id}`, data);
};

export const deleteProkerReq = (id) => {
  axios.delete(`/proker/${id}`);
};
