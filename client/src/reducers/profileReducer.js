import {
  GET_PROFILE,
  GET_LOGIN_USER_PROFILE,
  POST_AVATAR,
  SEND_PIC,
} from "../actions/types";

const initialState = {
  loginUserProfle: "",
  isAdmin: false,
  profile: "",
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case GET_LOGIN_USER_PROFILE:
      return {
        ...state,
        loginUserProfle: action.payload,
        isAdmin: action.payload.userId.isAdmin,
      };
    case SEND_PIC:
      return {
        ...state,
        loading: true,
      };
    case POST_AVATAR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
