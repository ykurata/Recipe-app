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

export const getMyRecipes = (token) => dispatch => {
  axios.get('/recipes/my-recipes', { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
}

export const getRecipesByUserId = (userId, token) => dispatch => {
  axios.get(`/recipes/userid/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
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


export const createRecipe = (userInput, token) => dispatch => {
  axios.post("/recipes", userInput, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Created a recipe!" , {
        position: "top-right",
        autoClose: 2000
      }); 
      window.location = `/image/${res.data._id}`;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const updateRecipe = (recipeId, userInput, token) => dispatch => {
  axios.put(`/recipes/update/${recipeId}`, userInput, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Successfully Updated!" , {
        position: "top-right",
        autoClose: 2000
      }); 
      window.location = `/image/${res.data._id}`;
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
}

export const submitRecipeImage = (recipeId, FormData, token) => dispatch => {
  axios.post(`/recipes/image/${recipeId}`, FormData, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Posted an image!" , {
        position: "top-right",
        autoClose: 2000
      }); 
      window.location = "/my-recipes";
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

export const deleteRecipe = (recipeId, token) => dispatch => {
  axios.delete(`/recipes/delete/${recipeId}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      toast.success("Successfully deleted!" , {
        position: "top-right",
        autoClose: 2000
      }); 
      window.location = "/my-recipes";
    })
    .catch(err => {
      console.log(err.response.data);
    })
}