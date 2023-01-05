import axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://destkw.com/api"
    : "http://192.168.0.80:3000/api";

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
