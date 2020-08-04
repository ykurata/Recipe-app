import axios from 'axios';

import {
  GET_RECIPES
} from './types';

export const getRecipes = () => dispatch => {
  axios.get('/recipes/list')
    .then(res => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};