/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addListener,
  combineReducers,
  configureStore,
  createAction,
  createListenerMiddleware,
  Slice,
  UnknownAction,
} from '@reduxjs/toolkit';

import { baseApi } from '../api';

export const listenerMiddleware = createListenerMiddleware();

const appReducer = combineReducers({
  app: (store = {}) => store,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: (state, action) => appReducer(state, action),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: [],
      },
    })
      .prepend(listenerMiddleware.middleware)
      .concat(baseApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();

export const addAppListener = addListener.withTypes<RootState, AppDispatch>();

export const useAppSelector = useSelector;
export const useAppDispatch = (): AppDispatch => {
  return useDispatch();
};

export const createBaseSelector = <S, N extends string>(slice: Slice<S, any, N>) => {
  return (store: unknown) => {
    const anyStore = store as Record<string, unknown>;
    return anyStore[slice.name] as S;
  };
};

export const useAction = <T, A extends Parameters<AppDispatch>[0]>(
  factory: (p: T) => A,
) => {
  const dispatch = useAppDispatch();

  return useCallback(
    (params: T) => {
      return dispatch(factory(params));
    },
    [dispatch, factory],
  );
};

export const useActionWithDeps = <
  T extends { deps: unknown },
  A extends Parameters<AppDispatch>[0],
>(
  factory: (p: T) => A,
  deps: T['deps'],
) => {
  const dispatch = useAppDispatch();
  return useCallback(
    (params: Omit<T, 'deps'>) => {
      return dispatch(factory({ deps, ...params } as T));
    },
    [dispatch, factory, deps],
  );
};

const slicesSet = new Set<Slice>();

export const registerSlice = (slices: Slice[]) => {
  slices.forEach((slice) => {
    slicesSet.add(slice);
  });

  store.replaceReducer(
    combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      ...Array.from(slicesSet).reduce(
        (acc, slice) => {
          acc[slice.name] = slice.reducer;
          return acc;
        },
        {} as Record<string, any>,
      ),
    }),
  );
};

export const resetSlices = () => {
  store.replaceReducer(
    combineReducers({
      [baseApi.reducerPath]: baseApi.reducer,
      ...Array.from(slicesSet).reduce(
        (acc, slice) => {
          acc[slice.name] = (state: any, action: UnknownAction) => {
            switch (action.type) {
              case 'RESET_STORE':
                return slice.getInitialState();
              default:
                return slice.reducer(state, action);
            }
          };
          return acc;
        },
        {} as Record<string, any>,
      ),
    }),
  );
  store.dispatch(createAction('RESET_STORE')());
};
