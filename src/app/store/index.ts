import {ApiError, ApiSuccess, ApiGetData, ApiGetError, loadHeroes, loadHeroesSuccess } from './service.actions';
import { ServiceEffects } from './service.effects';
import { apiReducer, heroesReducer } from './service.reducers';
import { getStateError, getStateData } from './service.selector';

export const fromRoot = {
    ApiError,
    ApiSuccess,
    ApiGetData,
    ApiGetError,
    ServiceEffects,
    apiReducer,
    heroesReducer,
    getStateError,
    getStateData,
    loadHeroes,
    loadHeroesSuccess

}