import auth from './auth';

const baseUrl = 'http://localhost:8080/api/';

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

const getUrl

const makeRequest = (url, dataOrParams, method, customHeaders) => {
  const url =
};
