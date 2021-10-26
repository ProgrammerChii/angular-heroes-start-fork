import { createSelector } from '@ngrx/store';
import { ApiState } from './service.reducers';

const getError = (state: ApiState): string =>  state.error;
const getData = (state: ApiState): any =>  state.data;

const getStateError = createSelector(
  (state: any) => state.rootState,
  getError
)

const getStateData = createSelector(
  (state: any) => state.rootState,
  getData
)

export { getStateError, getStateData};