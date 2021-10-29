import { createReducer, on } from "@ngrx/store";
import {inc, dec, reset, backUt } from "./contador.actions";


export const initialState = {
  backUtil: null,
  count: 0,
  
};

const _counterReducer = createReducer(
  initialState,
  on(inc, (state, action) => ({...state, count: action.count + 1})),
  on(dec, (state, action) => ({...state, count: action.count - 1})),
  on(reset, (state, action) => ({...state,count: 0})),
  on(backUt, (state, action) => ({...state,backUtil: action.backUtil})),
);

export function counterReducer(state, action){
    return _counterReducer(state, action);
}