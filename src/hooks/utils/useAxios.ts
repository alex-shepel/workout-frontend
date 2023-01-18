import Axios, { CreateAxiosDefaults } from 'axios';

const CONFIG: CreateAxiosDefaults = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BASEURL_DEV
      : process.env.REACT_APP_BASEURL_PROD,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 60000,
};

const axios = Axios.create(CONFIG);

const useAxios = () => {
  return axios;
};

export default useAxios;
