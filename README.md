# Correr el proyecto
yarn start
## 

### 


NGRX permite trabajar con un patron de diseño para construir aplicaciones y sus componentes. Permite manipular los estados de la aplicacion y entrega ciertos funciones y elementos que nos colaboran a construir la aplicación

ACTION
EFFECT
REDUCER
STATE
SELECTOR
STORE

ACTIONS:  Primero que todo para crear acciones debemos importar la función CreateAction desde la libreria @ngrx/store. En el archivo action se crean las acciones las cuales declaran eventos únicos que ocurren en toda la aplicación y la cual recibe un type el cual describe que accion realizar y es un parametro obligatorio y un payload el cual es la informacion determinada y/o adicional para cada acción.


RECUDER : Es una funcion pura que toma el estado anterior y una acción y devuelve un nuevo estado. A diferencia de las acciones, el reducer nos epecifica como cambio el estado de la aplicación en respuesta a una accion en especifico

STORE Es un objeto que contiene el estado actual de nuestra aplicacion y se encarga de reunir las acciones con los reducers. Funciones del store : Leer el valor del estado actual, Permite crear un nuevo estado, Notifica los cambios realizados en el esatdo por medio de una suscripcion y remueve las suscripciones de los listeners

EFFECTS: Una funcion Reducer modifica una acción. Esta acción puede cambiar el estado de la aplicación o puede ser escuchada por un efecto . Este efecto puede gatillar otra accion o ejecutar un servicio asincrono . Una vez terminada la tarea async/sync , se notifica al efecto y efecto regresa una nueva accion y la accion continua con el reducer y lo demas.
