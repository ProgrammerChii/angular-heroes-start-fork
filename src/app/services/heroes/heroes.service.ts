import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Heroe } from "../../core/models/heroe";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Store, select } from '@ngrx/store';
import * as actions from '../../store/contador.actions';

@Injectable()
export class HeroesService {
  count$: Observable<number>;
  private protocol = "https:";
  private ApiUrl = "//gateway.marvel.com:443/v1/public/";
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

  constructor(private http: HttpClient, private store: Store<{count: number}>) {}

  resetPager() {
    this.page = 0;
  }

  getHeroes(nameStartsWith?: string) {
    this.count$ = this.store.pipe(select('count'));
    this.store.subscribe(state => state);

   let nub = this.store.pipe(select('count')).subscribe(
      s => this.page = s
   );

   console.log(nub);
    console.log("TEAMS");
    console.log(Array.from(this.teams));
    if (this.page || this.page === 0) {
      this.page
    }
    const url =
      this.protocol +
      this.ApiUrl +
      "characters?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b" +
      "&offset=" +
      this.page * this.step +
      (nameStartsWith ? "&nameStartsWith=" + nameStartsWith : "");

    this.http.get<any>(url).subscribe((data) => {
      this.heroes = [];
      this.total = Math.ceil(data.data.total / this.step);
      data.data.results.forEach(
        ({ id, name, description, modified, thumbnail, resourceURI }) => {
          this.heroes.push(
            new Heroe(
              id,
              name,
              description,
              modified,
              thumbnail,
              resourceURI,
              this.getTeamColor(id)
            )
          );
        }
      );
    });
  }

  getHeroe(id: string): Observable<any> {
    const url =
      this.protocol +
      this.ApiUrl +
      "characters/" +
      id +
      "?apikey=56d2cc44b1c84eb7c6c9673565a9eb4b";
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
