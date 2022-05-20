import axios from 'axios';

const request = axios.create();

import { isDevEnvironment } from './isDevEnvironment';

request.defaults.withCredentials = true;
request.defaults.baseURL = isDevEnvironment ? 'http://localhost:3001' : '';

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    return Promise.reject({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  },
);

export { request };
