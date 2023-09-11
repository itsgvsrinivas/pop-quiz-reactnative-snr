import axios from 'axios';
import {
  API_KEY,
  TOKEN,
  ACCEPT_APP_JSON,
  METHOD_GET,
  METHOD_POST,
  METHOD_DELETE,
} from '../utils/constants';
import {BASE_URL} from '../utils/url';

export const getTerndingMovieList = async () => {
  const headers = getHeaders();

  let config = {
    headers,
  };

  const response = await axios.get(
    `${BASE_URL}/trending/all/day?language=en-US`,
    config,
  );
  return response.data.results;
};

export const getSearchReultsList = async (searchText: any) => {
  const headers = getHeaders();

  let config = {
    headers,
  };

  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`,
    config,
  );
  if (response.status < 400) {
    return response.data.results;
  } else {
    return null;
  }
};

export const getToken = async () => {
  const headers = getHeaders();

  let config = {
    headers,
  };

  const response = await axios.get(
    `${BASE_URL}/authentication/token/new`,
    config,
  );
  return response.data;
};

export const getSessionId = async (request_token: string) => {
  console.log('[api] >>> [getSessionId] request request_token:', request_token);
  const headers = getHeaders();

  let config = {
    headers,
  };

  const data = {
    request_token,
  };

  const response = await axios.post(
    `${BASE_URL}/authentication/session/new`,
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

  const headers = getHeaders();

  let config = {
    headers,
  };
  const data = {
    username: 'gvsrinivas', //'alekhyabairaboina', // TODO
    password: 'srinivas@tmdb', //'varunbairaboina',
    request_token: `${requestToken}`,
  };
  const response = await axios.post(
    `${BASE_URL}/authentication/token/validate_with_login`,
    data,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const getUserInfo = async (session_id: string) => {
  const headers = getHeaders();

  let config = {
    headers,
  };

  const response = await axios.get(
    `${BASE_URL}/account?api_key=${API_KEY}&session_id=${session_id}`,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const addToWatchList = async (
  account_id: string,
  movieId: string,
  isWatchList: boolean,
) => {
  const headers = getHeaders();
  let config = {
    headers,
  };
  const data = {media_type: 'movie', media_id: movieId, watchlist: isWatchList};

  const response = await axios.post(
    `${BASE_URL}/account/${account_id}/watchlist`,
    data,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const addToFavourite = async (account_id: string) => {
  const headers = getHeaders();

  let config = {
    headers,
  };
  const data = {media_type: 'movie', media_id: 11, favorite: true};

  const response = await axios.post(
    `${BASE_URL}/account/${account_id}/favorite`,
    data,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const addRating = async (movie_id: string, ratingValue: string) => {
  const headers = getHeaders();

  const config = {headers};
  const data = {value: ratingValue};

  const response = await axios.post(
    `${BASE_URL}/movie/${movie_id}/rating`,
    data,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const deleteRating = async (movie_id: string) => {
  const headers = getHeaders();

  const config = {headers};

  const response = await axios.delete(
    `${BASE_URL}/movie/${movie_id}/rating`,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const getWatchListMovies = async (account_id: string) => {
  const headers = getHeaders();

  const config = {headers};

  const response = await axios.get(
    `${BASE_URL}/account/${account_id}/watchlist/movies`,
    config,
  );
  if (response.status < 400) {
    return response.data.results;
  } else {
    return null;
  }
};

export const getFavoriteMovies = async (account_id: string) => {
  const headers = getHeaders();

  const config = {headers};

  const response = await axios.get(
    `${BASE_URL}/account/${account_id}/favorite/movies`,
    config,
  );
  if (response.status < 400) {
    return response.data.results;
  } else {
    return null;
  }
};

export const getRatedMovies = async (account_id: string) => {
  const headers = getHeaders();

  const config = {headers};

  const response = await axios.get(
    `${BASE_URL}/account/${account_id}/rated/movies`,
    config,
  );
  if (response.status < 400) {
    return response.data.results;
  } else {
    return null;
  }
};

export const getReview = async (movie_id: string) => {
  const headers = getHeaders();

  const config = {headers};

  const response = await axios.get(
    `${BASE_URL}/movie/${movie_id}/reviews`,
    config,
  );
  if (response.status < 400) {
    return response?.data;
  } else {
    return null;
  }
};

export const clearSession = async (sessionId: string) => {
  const headers = getHeaders();
  const config = {headers};
  const data = {
    session_id: sessionId,
  };

  const response = await axios.delete(
    `${BASE_URL}/authentication/session`,
    data,
    config,
  );
  console.log('[api] >>> [clearSession] response:}', response);
  if (response.status < 400) {
    return response?.data;
  } else {
    return response?.data;
  }
};

export function getHeaders() {
  const headers = {
    accept: ACCEPT_APP_JSON,
    'content-type': ACCEPT_APP_JSON,
    Authorization: `Bearer ${TOKEN}`,
  };
  return headers;
}
