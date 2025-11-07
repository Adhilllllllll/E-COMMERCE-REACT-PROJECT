import axios from "axios";

const API_BASE_URL = "http://localhost:7000/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  
});

 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;

   
    if (
      response?.status === 401 &&
      config?.url?.includes("/users/me")
    ) {
      
      return Promise.resolve({ data: { data: null } });
    }

     
    return Promise.reject(error);
  }
);

export default api;
