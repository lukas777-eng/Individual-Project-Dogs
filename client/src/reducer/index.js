const initialState = {
    dogs : [],
    detail: [],
    temperaments: [],
    allDogs: [],
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
            }

        case 'FILTER_BY_NAME':
            const filterName = action.payload === 'asc' ?
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0
            }) :
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

        case 'FILTER_CREATED':
            const allDogs = state.allDogs
            const createdFilter = action.payload === 'created'? state.allDogs.filter(el => el.createdInDb) : state.allDogs.filter(el => !el.createdInDb)
            return {
                ...state,
                dogs: createdFilter,
            }

        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload,
            }

        case 'POST_DOG':
            return {
                ...state,
            }

        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload,
            }

        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload,
            }

        case 'FILTER_BY_TEMPERAMENT':

            const allDog = state.allDogs; // Al usar state.allDogs en lugar de state.dogs, cada vez que aplique un filtro, state.dogs va a cambiar, pero voy a seguir teniendo guardados todos los perros en mi state.allDogs, entonces voy a poder cambiar de filtro sin tener que volver a cargar la página.
            const temperamentFiltered = action.payload === 'all' ? allDog : allDog.filter(el => {
            if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
            if (Array.isArray(el.temperaments)) {
            let temps = el.temperaments.map(el => el.name);
                return temps.includes(action.payload);
            }
                return true;
            });
                return {
                    ...state,
                    dogs: temperamentFiltered,
                }

            default:
                return state;
    }

}

export default rootReducer