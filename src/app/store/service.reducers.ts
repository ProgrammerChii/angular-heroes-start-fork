import { createReducer, on } from "@ngrx/store";

import { ApiError, ApiSuccess } from "./service.actions";

export interface ApiState {
  error: any;
  data: any;
}

const initialState: ApiState = {
  error: null,
  data: null,
};

export const apiReducer = createReducer(
  initialState,
  on(ApiError, (state, action) => ({ error: action.error, data: null })),
  on(ApiSuccess, (state, action) => ({ data: action.data, error: null }))
);
