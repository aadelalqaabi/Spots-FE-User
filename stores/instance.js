import axios from "axios";

const baseURL = "http://192.168.0.22:8000";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
