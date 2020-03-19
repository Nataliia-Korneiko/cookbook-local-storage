import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const fetchRecipes = () => {
  return axios.get(`/recipes`).then(response => response.data);
};

export const postRecipe = recipe => {
  return axios.post(`/recipes`, recipe).then(response => response.data);
};

export const deleteRecipe = id => {
  return axios.delete(`/recipes/${id}`);
};

export const updateRecipe = (id, update) => {
  return axios.patch(`/recipes/${id}`, update).then(response => response.data);
};
