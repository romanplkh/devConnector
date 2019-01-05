import axios from "axios";
import isEmpty from "../validation/is-empty";

const setAuthToken = token => {
  if (!isEmpty(token)) {
    //Apply to every req
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    //Delete Auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
