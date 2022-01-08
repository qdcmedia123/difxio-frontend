import axios from "axios";

type tokenType = string | null;

const setAuthToken = (token:tokenType) => {
  if (token) {
    axios.interceptors.response.use(
      (response) => {
        if (response.data.code === 401 || response.data.code === 402) {
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
