import { Heroe } from "../../core/interfaces/Heroe";


export const initialState : HeroesState = {
    heroes: null, 
    error: null,
    back: null
};

export interface HeroesState{
    heroes: Heroe[];
    error: any,
    back: string
}