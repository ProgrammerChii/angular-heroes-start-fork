import {ApiError, ApiSuccess, ApiGetData, ApiGetError } from './service.actions';
import { ServiceEffects } from './service.effects';
import { apiReducer } from './service.reducers';
import { getStateError, getStateData } from './service.selector';

export const fromRoot = {
    ApiError,
    ApiSuccess,
    ApiGetData,
    ApiGetError,
    ServiceEffects,
    apiReducer,
    getStateError,
    getStateData

}