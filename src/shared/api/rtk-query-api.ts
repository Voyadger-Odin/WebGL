import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { tokensStorage } from '../lib/tokens-storage';

import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react';

const REFRESH_TOKEN_URL = '/access_authentication_token';

interface ApiError {
  status: number;
  data: { error: string; errorDescription?: string };
}

const mutex = new Mutex();

// const excluded = [''];
const _baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: async (headers, _) => {
    const token = await tokensStorage.getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
}) as BaseQueryFn<string | FetchArgs, unknown, ApiError, unknown>;

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ApiError,
  unknown
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await _baseQuery(args, api, extraOptions);
  const meta = result.meta;

  // @ts-expect-error: mute TS to fix accessing response headers
  const jwtHeader: string | undefined = meta?.response?.headers?.get('www-authenticate');

  // refresh tokens if jwt token expired (401 status code && www-authenticate header contains error 'invalid_token')
  if (
    result.error &&
    result.error.status === 401 &&
    // TODO: should we check for 'invalid_token'?
    // jwtHeader?.includes('error="invalid_token"')
    jwtHeader === 'jwt-auth'
  ) {
    console.log('token expired');
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const refreshToken = localStorage.getItem('refreshToken');
        const refreshToken = await tokensStorage.getRefreshToken();

        const res = await _baseQuery(
          {
            url: REFRESH_TOKEN_URL,
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions,
        );

        if (res.data) {
          const { access_token: accessToken, refresh_token: refreshToken } = res.data as {
            access_token?: string;
            refresh_token?: string;
          };

          tokensStorage.setTokens(accessToken, refreshToken);

          result = await _baseQuery(args, api, extraOptions);
        } else {
          tokensStorage.clear();
          console.error('Failed to refresh token');
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await _baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: () => ({}),
});
