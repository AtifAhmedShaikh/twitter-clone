import axios from "axios";
const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_SERVER_PATH,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
export { instanceApi };
