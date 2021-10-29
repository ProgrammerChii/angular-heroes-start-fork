import { createReducer, on } from "@ngrx/store";
import {inc, dec, reset } from "./contador.actions";

export const initial = 0;

const _counterReducer = createReducer(
  initial,
  on(inc, state => state + 1),
  on(dec, state => state - 1),
  on(reset, state => 0),
  
);

export function counterReducer(state, action){
    return _counterReducer(state, action);
}