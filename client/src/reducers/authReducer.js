import {
  SET_CURRENT_USER, GET_LOGIN_USER
} from "../actions/types";

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loginUser: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case GET_LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload
      }
    default:
      return state;
  }
}