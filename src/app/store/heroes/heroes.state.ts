import { Heroe } from "../../core/models/heroe";


export const initialState : HeroesState = {
    heroes: [], 
};

export interface HeroesState{
    heroes: any[];
}