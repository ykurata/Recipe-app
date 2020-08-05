import {
  GET_RECIPES,
  GET_RECIPE,
} from '../actions/types';

const initialState = {
  recipes: [],
  recipe: {},
  reviews: [],
  likes: '',
  username: '',
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        reviews: action.payload.reviews,
        likes: action.payload.likes.length,
        username: action.payload.userId.name
      }  
    default:
      return state;  
  }
}