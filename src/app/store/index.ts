import {ApiError, ApiSuccess, ApiGetData, ApiGetError, loadHeroes, loadHeroesSuccess, back } from './heroes/service.actions';
import { ServiceEffects } from './heroes/service.effects';
import { apiReducer, heroesReducer } from './heroes/service.reducers';
import { getStateError, getStateData } from './heroes/service.selector';

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
    loadHeroesSuccess,
    back
}