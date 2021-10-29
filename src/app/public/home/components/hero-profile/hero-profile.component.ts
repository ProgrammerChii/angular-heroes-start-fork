import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Heroe } from '../../../../core/interfaces/heroe';
import { HeroesService } from '../../../../services/heroes/heroes.service';
import { Location } from '@angular/common';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Store } from '@ngrx/store';
import { fromRoot } from '../../../../store';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.css']
})
export class HeroProfileComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal;
  private id;
  public heroe: Heroe;
  public question_modal: string;
  public team:string = "";

  constructor(private route: ActivatedRoute, private heroesService: HeroesService, private _location: Location,  private apiStore: Store<{ apiState }>,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getApiProfile(this.id) 

      this.apiStore.subscribe(
        ({apiState: {data}}) => {
              this.heroe=data?.data?.results[0];
        },
        (error) => {
          console.log("error", error);
        }
      );
    });
    
  }

  goBack() {
    this._location.back();
  }

  getTeam(team):void{
    console.log("Color: "+team);
    this.team = team;
    this.heroesService.teams.set(this.heroe.id, this.team);
  }

  launchModal():void{
    //this.question_modal="¿Dónde ubicarías a tu súper héroe?";
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }

  getApiProfile(_id) {
    this.apiStore.dispatch(fromRoot.ApiGetData({ id: _id }));
  }


  getColor(id){
    let string = this.heroesService.getTeamColor(id)
    return string;
  }

}
