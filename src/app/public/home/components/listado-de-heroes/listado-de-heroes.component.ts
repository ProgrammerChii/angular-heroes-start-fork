import { Component, OnInit, ViewChild } from "@angular/core";
import { Heroe } from "../../../../core/interfaces/heroe";
import { HeroesService } from "../../../../services/heroes/heroes.service";
import { Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as actions from "../../../../store/contador.actions";
import { fromRoot } from "../../../../store";
import { getHeroes } from "../../../../store/heroes/service.selector";

interface AppState {
  count: any;
  backUtil: string;
}

@Component({
  selector: "app-listado-de-heroes",
  templateUrl: "./listado-de-heroes.component.html",
  styleUrls: ["./listado-de-heroes.component.css"],
})
export class ListadoDeHeroesComponent implements OnInit {
  heroes$: Array<Heroe> = [];
  public countTs;
  public title = "Héroes de Marvel";
  public searchString: string;
  public back: string;

  public group_colors = {
    azul: "#1f8ff7",
    violeta: "#a43de3",
    naranjo: "#df5c0f",
    verde: "#0ea521",
  };

  // heroes$ : Observable<Heroe[]>;
  // The child component : spinner
  @ViewChild("spi", { static: true }) spinner;
  dataHeroes: Array<Heroe> = [];
  /* public heroes: Array<Heroe> = []; */

  constructor(
    public heroesService: HeroesService,
    private router: Router,
    private store: Store<AppState>,
    private apiStore: Store<{ apiState }>,
    private apiStoreV2: Store<{ apiSt }>
  ) {
    this.store.subscribe((state) => state);
  }

  submitSearch() {
    this.store.dispatch(fromRoot.backUt({ backUtil: this.searchString }));
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
  reset() {
    this.store.dispatch(actions.reset());
  }
  getCount() {
    this.store.pipe().subscribe((s) => (this.countTs = s.count));
  }
  increment() {
    this.getCount();
    this.spinner.toggle_spinner();
    this.store.dispatch(actions.inc(this.countTs));
    setTimeout(() => {
      this.spinner.toggle_spinner();
    }, 1000);
  }

  decrement() {
    this.getCount();
    this.spinner.toggle_spinner();
    this.store.dispatch(actions.dec(this.countTs));
    setTimeout(() => {
      this.spinner.toggle_spinner();
    }, 1000);
  }

  ngOnInit() {
    this.getApiData();
  }

  getApiData() {

    
    this.store.pipe(select("count")).subscribe((s) => (this.countTs = s.count));

    this.store.pipe().subscribe((s) => {
 
       if (s.count.backUtil?.length > 0) {
         this.searchString = s.count.backUtil;
       }
    });

    this.apiStoreV2.dispatch(
      fromRoot.loadHeroes({ search: this.searchString })
    );

    let aux: any = [];
    this.apiStoreV2.select(getHeroes).subscribe((s) => {
      aux = s;
      this.dataHeroes = aux?.data?.results;
    });
  }

  getApiProfile(_id) {
    this.apiStore.dispatch(fromRoot.ApiGetData({ id: _id }));
  }

  getColor(id) {
    let string = this.heroesService.getTeamColor(id);
    return this.group_colors[string];
  }
}
