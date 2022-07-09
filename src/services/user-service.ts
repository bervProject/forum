import axios from "axios";

const userServiceUrl =
  process.env.REACT_APP_USER_SERVICE_URL || "http://localhost:9000/";

const instance = axios.create({
  baseURL: userServiceUrl,
});

export default instance;
