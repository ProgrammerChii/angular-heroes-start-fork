import { createReducer, on } from "@ngrx/store";

import { ApiError, ApiSuccess, loadHeroesSuccess } from "./service.actions";;
import { initialState } from './heroes.state';
  
export interface ApiState {
  error: any;
  data: any;
}

const initial: ApiState = {
  error: null,
  data: null,
};

const _heroesReducer = createReducer(
  initialState,
  on(loadHeroesSuccess, (state, action) => {
      return {
        ...state,
        heroes: action.heroes,
  };
  }),
);

export function heroesReducer(state, action) {
  return _heroesReducer(state, action);
}


export const apiReducer = createReducer(
  initial,
  on(ApiError, (state, action) => ({ error: action.error, data: null })),
  on(ApiSuccess, (state, action) => ({ data: action.data, error: null })),

  
);
