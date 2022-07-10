import axios from "axios";

const threadServiceUrl =
  process.env.REACT_APP_THREAD_SERVICE_URL || "http://localhost:9002/";

const instance = axios.create({
  baseURL: threadServiceUrl,
});

export default instance;
