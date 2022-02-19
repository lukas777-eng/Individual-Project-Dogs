const initialState = {
    dogs : [],
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
                dogs: createdFilter
            }

        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload
            }

            default:
                return state;
    }

}

export default rootReducer