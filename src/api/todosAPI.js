import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getTodos = () => axiosInstance.get("/todos?_limit=5");
