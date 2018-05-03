import axios from 'axios';

import auth from './auth';

const baseUrl = 'http://localhost:8080/api';

const generateHeaders = (customHeaders) => {
  let headers = {
    'Content-Type': 'application/json',
  };

  if (auth.isAuthorized()) {
    headers.Authorization = auth.getAccessToken();
  }
  headers = {
    ...headers,
    customHeaders,
  };

  return headers;
};

const makeRequest = (url, dataOrParams, method, customHeaders) => {
  const otp = {
    baseURL: baseUrl,
    url,
    method,
    dataType: 'json',
    headers: generateHeaders(customHeaders),
    timeout: 120000,
    data: dataOrParams,
  };

  if (method === 'GET' || method === 'DELETE') {
    otp.params = dataOrParams;
  }

  return axios(otp);
};

export default {
  get(url, params, headers) {
    return makeRequest(url, params, 'GET', headers);
  },

  del(url, params, headers) {
    return makeRequest(url, params, 'DELETE', headers);
  },

  post(url, data, headers) {
    return makeRequest(url, data, 'POST', headers);
  },

  put(url, data, headers) {
    return makeRequest(url, data, 'PUT', headers);
  },
};
