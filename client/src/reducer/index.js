import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    POST_DOG,
    FILTER_BY_NAME,
    FILTER_BY_WEIGHT,
  } from "../actions/index.js";

  const initialState = {
    dogs : [],
    detail: [],
    temperament: [],
    allDogs: [],
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,               //en mi estaod dogs que en un principio es un array vacio manda todo lo que te mande la accion getDogs
                allDogs: action.payload,            //y poné todos lo personajes en allDogs también (esto me sirve para los filtros)
            }

        case 'FILTER_BY_NAME':
            const filterName = action.payload === 'A-Z' ?         //Si el valor es "A-Z"
            state.dogs.sort(function (a, b) {                      //sort compara dos valores, accedemos al name y los compara, y los coloca a la derecha o a la izquierda, antes o despu{es en el arreglo dependiendo si son mas grandes o mas chicos
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0                                             //si son iguales los deja como está
            }) :                                                        // y si no ordeno de Z-A
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                dogs: filterName,
            }

        case 'FILTER_BY_WEIGHT':
            const filterWeight = action.payload === 'asc' ?
            state.dogs.sort(function (a, b) {
                return parseInt(a.weight) - parseInt(b.weight);
            }) :
            state.dogs.sort(function (a, b) {
                return parseInt(b.weight) - parseInt(a.weight);
            });
            return{
                ...state,
                dogs: filterWeight,
            }

        case 'FILTER_CREATED':                           //si el valor de mi acción es created, traigo todos aquellos creados en la DB  
            const allDogs = state.allDogs
            const createdFilter = action.payload === 'created'? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)   //primero siempre filtro el arreglo que tiene todo
            return {                                                                                                                                         //retorno el estado, y si mi acción vale All traigo los de la api y los filtrados
                ...state,
                dogs: createdFilter,
            }

        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload,              //lo renderizo en el array dogs, este es el filtrado de buscar por nombre que hice en el back
            }

        case 'POST_DOG':                    //post dog tiene que estar en el reducer pero no hace nada, porque yo creo un dog en una ruta nueva
            return {
                ...state,
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperament: action.payload,
            }

        case 'GET_DETAIL':                          //al hacer click sobre un perro accedo a sus detalles
            return {
                ...state,
                detail: action.payload,            // a detail que es el estado inicial se le  pasa action.payload
            }

        case 'FILTER_BY_TEMPERAMENT':

            let allDog = state.allDogs;
            let temperamentsFiltered = action.payload === "all"  ? allDog: allDog.filter((elem) =>
              elem.temperament?.includes(action.payload)
            );
              return {
                   ...state,
                    dogs: temperamentsFiltered,
                 };

            default:
                return state;
    }

}

export default rootReducer