import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { HeroesService } from "../../services/heroes/heroes.service";
import {
  ApiError,
  ApiSuccess,
  ApiGetData,
  ApiGetError,
  loadHeroes,
  loadHeroesSuccess,
} from "./service.actions";

import { catchError, exhaustMap, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Heroe } from "../../core/interfaces/heroe";

@Injectable()
export class ServiceEffects {
  constructor(private actions$: Actions, private serviceApi: HeroesService) {}

  getLoadHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadHeroes),
      exhaustMap((action) => {
        console.log('action', action);
        return this.serviceApi.getHeroesEf(action.search).pipe(
          map((heroes: any) => loadHeroesSuccess({ heroes: heroes as Heroe[] })
          ),
          catchError((error: any) => of(
            ApiError({
              error: error,
            })
          )
          ),
          tap(() => {
            console.log("Service LoadHeroes End");
          })
        );
        })
    )
  });

  getServiceDataEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiGetData),
      tap(() => {
        console.log("Service Api");
      }),
      mergeMap((action) => {
        console.log("service api in process heroe", action);
        return this.serviceApi.getHeroe(action.id).pipe(
          map((res) => ApiSuccess({ data: res })),
          catchError((error) => of(ApiError({ error: error }))),
          tap(() => {
            console.log("Service End");
          })
        );
      })
    );
  });
}
