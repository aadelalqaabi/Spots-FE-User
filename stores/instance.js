import axios from "axios";
import { TEST } from "../config/info";
const baseURL = "https://destkw.com/api";
//const baseURL = TEST;
const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
