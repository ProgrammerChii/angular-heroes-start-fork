import { createSelector, createFeatureSelector} from '@ngrx/store';
import { ApiState } from './service.reducers';
import { HeroesState } from './heroes.state';

const getError = (state: ApiState): string =>  state.error;
const getData = (state: ApiState): any =>  state.data;

export const getStateError = createSelector(
  (state: any) => state.rootState,
  getError
)

export const getStateData = createSelector(
  (state: any) => state.rootState,
  getData
)

const getHeroesState = createFeatureSelector<HeroesState>('heroes');

export const getHeroes = createSelector(getHeroesState, (state: HeroesState) => {
  return state.heroes;
});

