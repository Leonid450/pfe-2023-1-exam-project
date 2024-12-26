import axios from 'axios';
import CONSTANTS from '../constants';
import history from '../browserHistory';
import { checkToken } from '../utils/jwtUtils';

const instance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});
let accessTokenInMemory = null;
instance.interceptors.request.use(
  async function (config) {
    const refreshTokenInLS = window.localStorage.getItem(
      CONSTANTS.REFRESH_TOKEN
    );
    const isRefreshValid = checkToken(refreshTokenInLS);

    if (config.url.includes('auth')) {
      if (isRefreshValid) {
        config.data = { token: refreshTokenInLS, ...config.data };
      }

      return config;
    }
    const isAccessValid = checkToken(accessTokenInMemory);

    if (isAccessValid) {
      config.headers.Authorization = accessTokenInMemory;
    } else if (isRefreshValid) {
      const {
        data: { tokenPair },
      } = await axios.post(`${CONSTANTS.BASE_URL}auth/refresh`, {
        token: refreshTokenInLS,
      });

      accessTokenInMemory = tokenPair.accessToken;
      window.localStorage.setItem(
        CONSTANTS.REFRESH_TOKEN,
        tokenPair.refreshToken
      );
      config.headers.Authorization = accessTokenInMemory;
    } else {
      accessTokenInMemory = null;
      window.localStorage.removeItem(CONSTANTS.REFRESH_TOKEN);
    }

    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (response) => {
    if (response.data.tokenPair) {
      const {
        data: {
          tokenPair: { accessToken, refreshToken },
        },
      } = response;
      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
      accessTokenInMemory = accessToken;
    }
    delete response.data.tokenPair;
    return response;
  },
  (err) => {
    if (
      err.response.status === 408 &&
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/registration' &&
      history.location.pathname !== '/'
    ) {
      history.replace('/login');
    }
    return Promise.reject(err);
  }
);

export default instance;
