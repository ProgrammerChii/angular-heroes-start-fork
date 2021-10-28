import { Component, OnInit, ViewChild } from "@angular/core";
import { Heroe } from "../../../../core/models/heroe";
import { HeroesService } from "../../../../services/heroes/heroes.service";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as actions from "../../../../store/contador.actions";
import * as actionHeroes from "../../../../store/heroes/service.actions";
import { fromRoot } from "../../../../store";

interface AppState {
  count: number;
}

@Component({
  selector: "app-listado-de-heroes",
  templateUrl: "./listado-de-heroes.component.html",
  styleUrls: ["./listado-de-heroes.component.css"],
})
export class ListadoDeHeroesComponent implements OnInit {
  count$: Observable<number>;
  heroes$: Array<Heroe> = [];

  public title = "Tutorial de Angular - Héroes de Marvel";
  public searchString;
  // heroes$ : Observable<Heroe[]>;
  // The child component : spinner
  @ViewChild("spi", { static: true }) spinner;
  dataHeroes:  Array<Heroe> = [];;
  /* public heroes: Array<Heroe> = []; */

  constructor(
    public heroesService: HeroesService,
    private router: Router,
    private store: Store<AppState>,
    private apiStore: Store<{ apiState }>,
    private apiStoreV2: Store<{ apiSt }>
  ) {
    this.count$ = store.select("count");
    this.store.subscribe((state) => state);
  }

  submitSearch() {
    this.getApiData();
  }

  prevPage() {
    this.decrement();
    this.getApiData();
  }

  nextPage() {
    this.increment();
    this.getApiData();
  }

  go_to(id) {
    this.router.navigateByUrl("/heroe/" + id);
  }

  increment() {
    this.spinner.toggle_spinner();
    this.store.dispatch(actions.inc());
    setTimeout(() => {
      this.spinner.toggle_spinner();
    }, 1000);
  }

  decrement() {
    this.spinner.toggle_spinner();
    this.store.dispatch(actions.dec());
    setTimeout(() => {
      this.spinner.toggle_spinner();
    }, 1000);
  }

  ngOnInit() {
    this.count$ = this.store.pipe(select("count"));
    this.getApiData();
  }
  
  getApiData() {
   this.apiStoreV2.dispatch(fromRoot.loadHeroes({search: this.searchString}));
    this.apiStoreV2.subscribe(
      (resp) => {
        this.dataHeroes=resp?.apiSt?.heroes?.data?.results;
      },
      (error) => {
        console.log("error", error);
      }
    );
  }

  getApiProfile(_id) {
    this.apiStore.dispatch(fromRoot.ApiGetData({ id: _id }));
  }
}
