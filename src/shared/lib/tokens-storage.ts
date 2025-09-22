import localforage from 'localforage';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const store = localforage.createInstance({
  name: 'avt',
  driver: localforage.LOCALSTORAGE,
});

export const tokensStorage = {
  setTokens: async (accessToken?: string, refreshToken?: string) => {
    try {
      if (accessToken) {
        store.setItem(ACCESS_TOKEN_KEY, accessToken);
      }
      if (refreshToken) {
        store.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  setAccessToken: (token: string) => {
    try {
      return store.setItem(ACCESS_TOKEN_KEY, token);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  setRefreshToken: (token: string) => {
    try {
      return store.setItem(REFRESH_TOKEN_KEY, token);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  getAccessToken: async () => {
    const token = await store.getItem<string>(ACCESS_TOKEN_KEY);
    return token;
  },
  getRefreshToken: () => {
    return store.getItem(REFRESH_TOKEN_KEY);
  },
  clearAccessToken: () => {
    try {
      store.removeItem(ACCESS_TOKEN_KEY);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  clearRefreshToken: () => {
    try {
      store.removeItem(REFRESH_TOKEN_KEY);
    } catch (e) {
      return Promise.resolve(null);
    }
  },
  clear: () => {
    return store.clear();
  },
};
