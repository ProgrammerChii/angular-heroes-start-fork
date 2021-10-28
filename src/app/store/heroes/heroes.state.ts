import { Heroe } from "../../core/interfaces/Heroe";


export const initialState : HeroesState = {
    heroes: null, 
    error: null
};

export interface HeroesState{
    heroes: Heroe[];
    error: any
}