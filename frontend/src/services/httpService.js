import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

export const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpService;
