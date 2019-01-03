import axios from "axios";

const setAuthToken = token => {
  if (token) {
    //Apply to every req
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete Auth header
    delete axios.defaults.headers.common;
  }
};

export default setAuthToken;
