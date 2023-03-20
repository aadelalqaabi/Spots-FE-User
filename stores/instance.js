import axios from "axios";
import { PRODUCTION, TEST } from "../config/info";
const baseURL = process.env.NODE_ENV === "production" ? PRODUCTION : TEST;
const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
