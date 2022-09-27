import Axios from 'axios';

const axios = Axios.create({
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
});

export default axios;
