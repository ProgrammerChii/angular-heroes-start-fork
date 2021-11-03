# Correr el proyecto
yarn && yarn start
## 

### 


NGRX permite trabajar con un patron de diseño para construir aplicaciones y sus componentes. Permite manipular los estados de la aplicacion y entrega ciertos funciones y elementos que nos colaboran a construir la aplicación

ACTIONS
EFFECTS
REDUCERS
SELECTORS
STORE

ACTIONS:  Primero que todo para crear acciones debemos importar la función CreateAction desde la libreria @ngrx/store. En el archivo action se crean las acciones las cuales declaran eventos únicos que ocurren en toda la aplicación y la cual recibe un type que describe que accion realizar y es obligatorio. Ademas un payload el cual es la informacion determinada y/o adicional para cada acción.

//El primer paso importacion de la funcion createAction recibe como parametro un String que debe ser una descripcion  del tipo de accion y opcionalmente parametos (payload).

import { createAction } from "@ngrx/store";

// Definición de la variable a la cual pasaremos como parametro a la funcion createAction
export const LOAD_MOVIES = '[Load Movies] load Movies';
export const LOAD_MOVIES_SUCCESS = '[Load Movies] load Movies success';

// creamos la accion pasandole el nombre que definimos anteriormente
export const loadMovies = createAction(LOAD_MOVIES);
export const loadMoviesSuccess = createAction(
    LOAD_MOVIES_SUCCESS, ----> type (tipo de accion)
    props<{ movies: Movie[] }>() ----> payload
    );

NOTA: en la accion loadMoviesSuccess retornamos en este evento un arreglo de la interfaz Movie en los props

Las acciones estas correlacionadas con los effects que veremos ahora cual es la rol de esta funcion de estos en nuestra aplicación

EFFECTS: Una funcion Reducer modifica una acción. Esta acción puede cambiar el estado de la aplicación o puede ser escuchada por un efecto . Este efecto puede gatillar otra accion o ejecutar un servicio asincrono . Una vez terminada la tarea async/sync , se notifica al efecto y efecto regresa una nueva accion y la accion continua con el reducer y su respectivo flujo.


Los effects se ejecutan posterior a la carga del AppModule para garantizar que estén escuchando todas las acciones disponibles.


Desde la libreria @ngrx/effects importaremos la funcion Actions, createEffect y ofType.
import { Actions, createEffect, ofType } from '@ngrx/effects';


En el constructor de la clase declaramos una variable que referencia a la funcion de Actions y tambien declararemos otra variable para acceder a nuestro servicio.

 constructor(private actions$: Actions, private moviesService: moviesService) {}

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMovies), // pasamos como parametro nuestra action loadMovies
      mergeMap((action) => {
        return this.moviesService.getMovies().pipe( // retornamos el response de nuestro servicio para mapear esa respuesta que deberia ser un arreglo de nuestra interfaz Movie y retornar 
          map((movies) => {                       // otra accion de tipo loadMoviesSuccess con el arreglo que acabamos de mapear de nuestro servicio
            return loadMoviesSuccess({ movies });
          })
        );
      })
    );
  });
  
  

RECUDER : Es una funcion pura que toma el estado anterior y una acción y devuelve un nuevo estado. A diferencia de las acciones, el reducer nos epecifica como cambio el estado de la aplicación en respuesta a una accion en especifico.


import { loadMoviessSuccess } from './movies.action'; // importamos la accion loadMoviesSuccess
import { createReducer, on } from '@ngrx/store'; 
import { initialState } from './movies.state'; 

Cada reductor al crearse debe tener un estado inicial (InitialState)
  
  const _moviesReducer = createReducer(
    initialState,
    on(loadMoviesSuccess, (state, action) => {
        return {
          ...state,
          movies: action.moviess,
    };
    })
  );
  
  export function moviesReducer(state, action) {
    return _moviesReducer(state, action);
  }

SELECTORS: Los selectors son funciones que se utilizan para obtener segmentos del STATE en el STORE.

Para usar los selectores se debe importar createFeatureSelector y createSelector desde '@ngrx/store';

import { MoviesState } from './movies.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const MOVIES_STATE_NAME = 'movies'; // Definir una  constante con el mismo nombre para identificar cual es el state que queremos retornar

const getMoviesState = createFeatureSelector<MoviesState>(MOVIES_STATE_NAME); // definimos una constante auxiliar que hara referencia a la funcion createFeatureSelector pasamos como parametro la variable MOVIES_STATE_NAME definida anteriormente.

// La funcion createSelector realiza  una llamada el cual pasaremos como parametro a getMoviesState que hace referencia a createFeatureSelector el que obtendra el state movies del objeto "MoviesState" de nuestro archivo STATE
export const getMovies = createSelector(getMoviesState, (state: MoviesState) => {
  return state.movies; // retornamos el state movies y con esto retornariamos la informacion que necesita nuestro componente
});


STORE Es un objeto que contiene el estado actual de nuestra aplicacion y se encarga de reunir las acciones con los reducers. Funciones del store : Leer el valor del estado actual, Permite crear un nuevo estado, Notifica los cambios realizados en el esatdo por medio de una suscripcion y remueve las suscripciones de los listeners


