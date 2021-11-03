import { Observable, of } from "rxjs";
import { HeroesService } from "./heroes.service";
import { delay } from 'rxjs/operators';

let heroesService: HeroesService;
 const HEROE_OBJECT ={
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
   teamColor:'yellow'};
 
export class HeroServiceMock {
   public teams = new Map().set("1","yellow");

   public getHeroe(){
     return of({data:{results:HEROE_OBJECT}}).pipe(delay(1000));
   }

   public getTeamColor(){
     return "yellow";
   }
 }