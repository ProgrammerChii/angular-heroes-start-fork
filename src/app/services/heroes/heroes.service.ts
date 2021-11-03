import { Injectable, ViewChild } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Heroe } from "../../core/models/heroe";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import * as actions from "../../store/contador.actions";
import { environment  } from '../../../environments/environment';

@Injectable()
export class HeroesService {
  count$: Observable<number>;
  private apiKey = environment.apiKey;
  private apiUrl = environment.hostURL;
  public heroes: Array<Heroe> = [];

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  public page = 0;
  public step = 20;
  public total = 0;

  public group_colors = {
    azul: "#1f8ff7",
    violeta: "#a43de3",
    naranjo: "#df5c0f",
    verde: "#0ea521",
  };

  public teams = new Map();

  constructor(
    private http: HttpClient,
    private store: Store<{ count: any, apiSt: any }>
  ) {}

  resetPager() {
    this.page = 0;
  }

  getHeroesEf(nameStartsWith?: string): Observable<any> {

    console.log(Array.from(this.teams));
    this.count$ = this.store.pipe(select("count"));
    this.store.pipe(select("count")).subscribe((s) => (console.log("service", s)));
    this.store.pipe(select("count")).subscribe((s) => (this.page = s.count));
    this.store.pipe(select("apiSt")).subscribe((s) => (this.total = Math.ceil(s?.heroes?.data?.total / this.step)));

    if (this.page || this.page === 0) {
      this.page;
    }
  
    const url =
      this.apiUrl +
      "characters" +
      "?apikey=" + this.apiKey +
      "&offset=" +
      this.page * this.step +
      (nameStartsWith ? "&nameStartsWith=" + nameStartsWith : "");

    return this.http.get<any>(url);
  }

  getHeroe(id: string): Observable<any> {
    const url = this.apiUrl + "characters/" + id + "?apikey=" + this.apiKey;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  getTeamColor(id): string {
    if (this.teams.get(id) != undefined) {
      return this.teams.get(id);
    } else {
      return "";
    }
  }
}
