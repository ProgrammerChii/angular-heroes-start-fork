import { Component, OnInit, ViewChild } from "@angular/core";
import { Heroe } from "../../../../core/models/heroe";
import { HeroesService } from "../../../../services/heroes/heroes.service";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as actions from "../../../../store/contador.actions";
import * as actionHeroes from "../../../../store/heroes/service.actions"

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
  heroes$ : Array<Heroe> = [];


 
  public title = "Tutorial de Angular - Héroes de Marvel";
  public searchString;
    // heroes$ : Observable<Heroe[]>;
  // The child component : spinner
  @ViewChild("spi", { static: true }) spinner;
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
    this.reset();
    this.heroesService.getHeroes(this.searchString);
  }

  prevPage() {
    this.decrement();
    this.getApiData();
    // this.heroesService.getHeroes(this.searchString);
  }

  nextPage() {
    
    this.increment();
    this.reset();
    this.getApiData();
    // this.heroesService.getHeroes(this.searchString);
  }

  go_to(id) {
    this.router.navigateByUrl("/heroe/" + id);
  }

  reset() {
    // this.store.dispatch(actions.reset());
    this.apiStoreV2.dispatch(actionHeroes.resetStore());
  }
  increment() {
    this.spinner.toggle_spinner();
    this.store.dispatch(actions.inc());
    setTimeout(() => {
      this.spinner.toggle_spinner();
    }, 500);
  }

  decrement() {
    this.spinner.toggle_spinner();
    this.store.dispatch(actions.dec());
    setTimeout(() => {
      this.spinner.toggle_spinner();
    }, 500);
  }
  ngOnInit() {
    this.count$ = this.store.pipe(select("count"));
    this.getApiData()
    // this.heroesService.getHeroes();
  }
  getApiData(){
    console.log("herosgap", this.heroes$);
    this.reset();
    this.heroes$.length = 0;
    this.heroes$.splice(0,this.heroes$.length)

    this.apiStoreV2.dispatch(fromRoot.loadHeroes());
    
    this.apiStoreV2.subscribe(({apiSt: {heroes}}) => heroes?.data?.results.forEach((object) => { this.heroes$.push(object)}));
  }
 
  getApiProfile(_id){
    this.apiStore.dispatch(fromRoot.ApiGetData({ id : _id}))
    // this.apiStoreV2.subscribe(a => console.log("fran",a));
  }
}
