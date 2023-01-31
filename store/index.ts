import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector,
} from 'react-redux';
import user from './user';
import common from './common';

const rootReducer = combineReducers({
  common: common.reducer,
  user: user.reducer,
});

/** 스토어 타입 */
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

/** 타입 지원되는 커스텀 useSelector 만들기 */
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

const makeStore = () => {
  const middleware = getDefaultMiddleware();
  const store = configureStore({
    reducer: rootReducer,
    middleware,
    /* custom middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(사용자 정의)  */
    devTools: true,
  });
  return store;
};

export const wrapper = createWrapper(makeStore);
