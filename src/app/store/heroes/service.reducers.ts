import { createReducer, on } from "@ngrx/store";

import { ApiError, ApiSuccess, loadHeroesSuccess, resetStore } from "./service.actions";;
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
  on(resetStore, (state, action) => {
    console.log("state" , state)
    console.log("action" , action)
    return {
      ...state,
      heroes: initialState,
};
}),
);

export function heroesReducer(state, action) {
  return _heroesReducer(state, action);
}

// export const heroesReducer = createReducer(
//   initialState,
//   on(loadHeroesSuccess, (state, action) => ({ heroes: action.heroes, error:null})),
// );


export const apiReducer = createReducer(
  initial,
  on(ApiError, (state, action) => ({ error: action.error, data: null })),
  on(ApiSuccess, (state, action) => ({ data: action.data, error: null })),

  
);
