import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import recipeReducer from "./recipeReducer";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  recipe: recipeReducer,
  profile: profileReducer,
  category: categoryReducer,
});
