import axios from "axios";
const instance = axios.create({
  baseURL: "https://convo-app-server-side.vercel.app/api/v1",
});

export default instance;
