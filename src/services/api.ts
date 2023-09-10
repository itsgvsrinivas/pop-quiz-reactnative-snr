import axios from 'axios';
import {
  BASE_URL,
  API_KEY,
  TOKEN,
  ACCEPT_APP_JSON,
  METHOD_GET,
  METHOD_POST,
  METHOD_DELETE,
} from '../utils/constants';

export const getTerndingMovieList = async () => {
  const headers = {
    accept: ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  let config = {
    method: METHOD_GET,
    headers,
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US`,
    config,
  );
  return response.data.results;
};

export const getSearchReultsList = async (searchText: any) => {
  const headers = {
    accept: ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  let config = {
    method: METHOD_GET,
    headers,
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`,
    config,
  );
  return response.data.results;
};

export const getToken = async () => {
  const headers = {
    accept: ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  let config = {
    method: METHOD_GET,
    headers,
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/authentication/token/new`,
    config,
  );
  return response.data;
};

export const getSessionId = async (request_token: string) => {
  const headers = {
    accept: ACCEPT_APP_JSON,
    'content-type': ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  let config = {
    method: METHOD_POST,
    headers,
  };

  const data = {
    request_token,
  };

  const response = await axios.post(
    'https://api.themoviedb.org/3/authentication/session/new',
    data,
    config,
  );
  return response.data;
};

export const authenticateUser = async (
  username: string,
  password: string,
  requestToken: string,
) => {
  console.log(
    `[api] >>> [authenticateUser] request: ${username}; ${password}; ${requestToken}`,
  );

  const headers = {
    accept: ACCEPT_APP_JSON,
    'content-type': ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  let config = {
    method: METHOD_POST,
    headers,
  };
  const data = {
    username: 'alekhyabairaboina',
    password: 'varunbairaboina',
    request_token: `${requestToken}`,
  };
  const response = await axios.post(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login`,
    data,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const clearSession = async token => {
  const headers = {
    accept: ACCEPT_APP_JSON,
    'content-type': ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  let config = {
    method: METHOD_DELETE,
    headers,
  };
  const data = {
    session_id: token,
  };

  const response = await axios.delete(
    `https://api.themoviedb.org/3/authentication/session`,
    data,
    config,
  );
  console.log('[api] >>> [clearSession] response:}', response);
  return response?.data ?? null;
};
