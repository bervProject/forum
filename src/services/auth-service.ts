import axios from "axios";

const authServiceUrl =
  process.env.REACT_APP_AUTH_SERVICE_URL || "http://localhost:9001/";

const instance = axios.create({
  baseURL: authServiceUrl,
});

export default instance;
