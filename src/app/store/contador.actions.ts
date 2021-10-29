
import { createAction, props } from "@ngrx/store";

export const inc = createAction("Incremento", props<{count : number}>());
export const dec = createAction("Decremento", props<{count : number}>());
export const reset = createAction("Reset");
export const backUt = createAction("BackUt", props<{backUtil: string}>());
    