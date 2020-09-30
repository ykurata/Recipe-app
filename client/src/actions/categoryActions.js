import axios from "axios";
import { toast } from "react-toastify";
import { GET_CATEGORIES, GET_ERRORS } from "../actions/types";

export const createCategory = (category, token) => (dispatch) => {
  axios.post("/category", category, { headers: { Authorization: `Bearer ${token}` } })
    .then(res => {
      toast.success(`Created a new Category, ${category.title}`, {
        position: "top-right",
        autoClose: 2000,
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getCategories = (token) => (dispatch) => {
  axios.get("/category", { headers: { Authorization: `Bearer ${token}` } })
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
