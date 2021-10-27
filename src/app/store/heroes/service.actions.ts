import { createAction, props } from "@ngrx/store";
import { Heroe } from "../../core/models/heroe";

export const ApiGetData = createAction('ApiGetData', props<{id : string}>());
export const ApiGetError = createAction('ApiGetError', props<{id : string}>());

export const ApiSuccess = createAction('ApiSuccess', props<{data: any}>());
export const ApiError = createAction('ApiError', props<{error : any}>());

export const loadHeroes = createAction('LoadHeroes');
export const loadHeroesSuccess = createAction(
    'LoadHeroesSuccess', 
    props<{ heroes: any }>()
    );

    