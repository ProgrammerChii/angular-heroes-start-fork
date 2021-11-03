import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroProfileComponent } from './hero-profile.component';
import { AppComponent } from '../../../../app.component';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import {RouterTestingModule} from '@angular/router/testing';
import { HeroesService } from '../../../../services/heroes/heroes.service';
import { HeroServiceMock } from '../../../../services/heroes/mock.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

describe('HeroProfileComponent', () => {
  let component: HeroProfileComponent;
  let fixture: ComponentFixture<HeroProfileComponent>;
  let heroesService: HeroesService;

  const storeHeroe = {
    select() {
      return of([{
        id:'1',
        name:'Spiderman',
        description: 'El hombre que araña',
        modified:new Date(1518417160),
        thumbnail:
          {
            'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
            'extension': 'jpg'
          },
        resourceURI:'http://gateway.marvel.com/v1/public/characters/1011334',
        teamColor:'yellow'}]);
    }
  };

  class LocationMock {
    back():void {}
  }

  beforeEach((() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        AppComponent,
        ModalPollComponent,
        HeroProfileComponent
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: HeroesService, useClass: HeroServiceMock },
        { provide: Store, useValue: storeHeroe },
        { provide: Location, useClass: LocationMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(async() => {
    heroesService = TestBed.get(HeroesService);
    fixture = TestBed.createComponent(HeroProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('Debería traer el heroe', () => {
  //   const spy = spyOn(heroesService, 'getHeroe').and.callThrough();
  //   component.ngOnInit();
  //   expect(spy).toHaveBeenCalled();
  // });  
  
});
