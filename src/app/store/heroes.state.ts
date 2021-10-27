import { Heroe } from "../core/models/heroe";


export const initialState : HeroesState = {
    heroes: null, 
};

export interface HeroesState{
    heroes: any[];
}