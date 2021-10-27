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

import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ServiceEffects {
  constructor(private actions$: Actions, private serviceApi: HeroesService) {}

 

  getDataEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadHeroes),
      tap(() => {
        console.log("Service Api asasdsasad");
      }),
      mergeMap((action) => {
        console.log("service api in process");
        return this.serviceApi.getHeroes().pipe(
          map((res) => loadHeroesSuccess({ heroes: res })),
          catchError((error) => of(ApiError({ error: error }))),
          tap(() => {
            console.log("Service End");
          })
        );
      })
    );
  });

  getServiceDataEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ApiGetData),
      tap(() => {
        console.log("Service Api");
      }),
      mergeMap((action) => {
        console.log("service api in process");
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

