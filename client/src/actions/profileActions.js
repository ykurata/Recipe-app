import axios from 'axios';
import { GET_PROFILE } from '../actions/types';

export const getProfile = (userId, token) => dispatch => {
  axios.get(`/profile/${userId}`, { headers: { Authorization: `Bearer ${token}` }})
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    });
}