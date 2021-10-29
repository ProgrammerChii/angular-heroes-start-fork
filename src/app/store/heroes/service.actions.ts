import { createAction, props } from "@ngrx/store";
import { Heroe } from "../../core/interfaces/Heroe";

export const ApiGetData = createAction('ApiGetData', props<{id : string}>());
export const ApiGetError = createAction('ApiGetError', props<{id : string}>());
export const ApiSuccess = createAction('ApiSuccess', props<{data: any}>());
export const ApiError = createAction('ApiError', props<{error : any}>());
export const loadHeroes = createAction('LoadHeroes', props<{search: string}>());
export const loadHeroesSuccess = createAction('LoadHeroesSuccess', props<{ heroes: Array<Heroe>}>());
export const back = createAction("Back", props<{back: string}>());
    