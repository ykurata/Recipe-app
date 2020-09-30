import axios from "axios";
import { toast } from "react-toastify";
import { POST_CATEGORY, GET_CATEGORIES, GET_ERRORS } from "../actions/types";

export const createCategory = (newCategory, token) => (dispatch) => {
  axios
    .post("/category", newCategory, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch({
        type: POST_CATEGORY,
        payload: res.data,
      });
      toast.success("Created a new category!", {
        position: "top-right",
        autoClose: 2000,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
      console.log(err);
    });
};

export const getCategories = (token) => (dispatch) => {
  axios
    .get("/category", { headers: { Authorization: `Bearer ${token}` } })
    .then((res) => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
