import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Apply thunk for async dispatching [thunk] data from axios
export const registeruser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Login - Get User JWT - token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save Token
      const { token } = res.data;
      //Set Token to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to bbe Auth HEader
      setAuthToken(token);
      //Decode token to get data (id, name and avatar + ISSUE DATE AND EXPIRATION)
      const decodedToken = jwt_decode(token);

      //Set current user
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//Set loged in user
export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

//Log user out
