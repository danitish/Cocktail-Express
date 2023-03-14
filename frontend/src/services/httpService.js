import axios from "axios";

axios.defaults.baseURL = "https://test-cocktail-express.onrender.com/";

export const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default httpService;
