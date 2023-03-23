import axios from "axios";
const baseURL = "https://destkw.com/api"; //process.env.NODE_ENV === "production" ? PRODUCTION : TEST;
const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
