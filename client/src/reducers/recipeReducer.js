import {
  GET_RECIPES,
  GET_RECIPE,
  Loading,
} from '../actions/types';

const initialState = {
  recipes: [],
  recipe: {},
  reviews: [],
  likes: '',
  username: '',
  userId: '',
  loading: true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false
      }
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        reviews: action.payload.reviews,
        likes: action.payload.likes.length,
        username: action.payload.userId.name,
        userId: action.payload.userId._id,
        loading: false
      }  
    case Loading: 
      return {
        loading: true
      }  
    default:
      return state;  
  }
}