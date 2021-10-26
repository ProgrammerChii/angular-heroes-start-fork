import { Component, OnInit, ViewChild } from '@angular/core';
import { Heroe } from '../../../../core/models/heroe';
import { HeroesService } from '../../../../services/heroes/heroes.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as actions from '../../../../store/contador.actions';

interface AppState {
  count: number;
}

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.css']
})
export class ListadoDeHeroesComponent implements OnInit {
  count$: Observable<number>;

  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString;
  // The child component : spinner
  @ViewChild('spi', { static: true }) spinner;
  /* public heroes: Array<Heroe> = []; */

  constructor(public heroesService: HeroesService, private router:Router, private store: Store<AppState>) {
    this.count$ = store.select('count');
    this.store.subscribe(state => console.log(state));
   }

  submitSearch() {
    this.reset();
    this.heroesService.getHeroes(this.searchString);
  }

  prevPage() {
    this.decrement();
    this.heroesService.getHeroes(this.searchString);
  }

  nextPage() {
    this.increment();
    this.heroesService.getHeroes(this.searchString);
  }

  go_to(id){
    this.router.navigateByUrl('/heroe/'+id);
  }

  reset(){
    this.store.dispatch(actions.reset());
  }
  increment() {
    this.store.dispatch(actions.inc());
  }
  
  decrement() {
    this.store.dispatch(actions.dec());
  }
  ngOnInit() {
    
    this.count$ = this.store.pipe(select('count'));
    this.spinner.toggle_spinner();
    this.heroesService.getHeroes();
    this.spinner.toggle_spinner();

  }

}
