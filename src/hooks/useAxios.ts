import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default function useAxios() {
  return client;
}
