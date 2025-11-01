// // export const userApi = "http://localhost:7000/api/v1/users";
// // export const productAPI = "http://localhost:7000/api/v1/products";

//  import axios from "axios";

// //  Backend base URL (adjust if you use a different port)
// const API_BASE_URL = "http://localhost:7000/api/v1";

// //  Create a reusable axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true,
// });

// // Auto-attach the token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

//  export default api;




 
import axios from "axios";

const API_BASE_URL = "http://localhost:7000/api/v1";

 
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,  
});

export default api;

