import axios from "axios";
import { TEST } from "../config/info";


if (process.env.NODE_ENV === 'development') {
  console.log('development')
} else if (process.env.NODE_ENV === 'production') {
  console.log('production')
} else {
  console.log('nope')
}


const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://destkw.com/api' 
  : TEST;

const instance = axios.create({
  baseURL: baseURL,
});

export { instance, baseURL };
