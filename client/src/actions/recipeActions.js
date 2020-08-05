import axios from 'axios';
import { toast } from 'react-toastify';

import {
  GET_ERRORS,
  GET_RECIPES,
  GET_RECIPE,
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

export const getRecipe = (recipeId) => dispatch => {
  axios.get(`/recipes/get/${recipeId}`)
    .then(res => {
      dispatch({
        type: GET_RECIPE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const postReview = (recipeId, review, token) => dispatch => {
  axios.put(`/recipes/review/${recipeId}`, review, { headers: { Authorization: `Bearer ${token}` }} )
    .then(res => {
      toast.success("Sent a Review!" , {
        position: "top-right",
        autoClose: 2000
      });
      axios.get(`/recipes/get/${recipeId}`)
        .then(res => {
          dispatch({
            type: GET_RECIPE,
            payload: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

export const sendLike = (recipeId, userId, token) => dispatch => {
  axios.put(`/recipes/like/${recipeId}`, userId, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("You sent a Like!" , {
        position: "top-right",
        autoClose: 2000
      }); 
      axios.get(`/recipes/get/${recipeId}`, { headers: { Authorization: `Bearer ${token}` }})
        .then(res => {
          dispatch({
            type: GET_RECIPE,
            payload: res.data
          })
        })
        .catch(err => {
          console.log(err);
        }); 
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};