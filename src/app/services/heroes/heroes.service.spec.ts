import { TestBed, inject, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ModalPollComponent } from '../../public/home/components/modal-poll/modal-poll.component';
import { HeroProfileComponent } from '../../public/home/components/hero-profile/hero-profile.component';
import { HeroesService } from './heroes.service';
import { HeroServiceMock } from './mock.service';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeroesService', () => {
  let heroesService: HeroesService;
  const storeHeroe = {
    select() {
      return of([{
        id: '1',
        name: 'Spiderman',
        description: 'El hombre que araña',
        modified: '',
        thumbnail:
        {
          'path': 'https://i.pinimg.com/originals/c2/93/56/c293563aa553250601d8cb768c044d4b',
          'extension': 'jpg'
        },
        resourceURI: 'http://gateway.marvel.com/v1/public/characters/1011334',
        teamColor: 'yellow'
      }]);
    }
  };
  beforeEach(() => {
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
        { provide: Store, useValue: storeHeroe }
      ]
    });
  });

  it('should be created', inject([HeroesService], (service: HeroesService) => {
    expect(service).toBeTruthy();
  }));

  // it('should test getHeroesEf function', () => {
  //   heroesService.getHeroesEf = jasmine.createSpy('getHeroesEf').and.callThrough();
  //   heroesService.getHeroesEf();
  //   expect(heroesService.getHeroesEf).toHaveBeenCalled();
  //   expect(heroesService.heroes).toBeDefined();
  // });

});
