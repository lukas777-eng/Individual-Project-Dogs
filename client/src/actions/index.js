import axios from 'axios';


////aca se conecta todo el fron y el backend en 3 lineas de codigo
export function GetDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs", {

        });
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}

export function GetTemperaments() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperament', {});
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data,
        })
    }
}

export function FilterDogsByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function FilterDogsByBreed(payload) {
    return {
        type: 'FILTER_BY_BREED',
        payload,
    }
}

export function FilterByName(payload) {
    return {
        type: 'FILTER_BY_NAME',
        payload,
    }
}

export function FilterByWeight(payload) {
    return {
        type: 'FILTER_BY_WEIGHT',
        payload,
    }
}

export function FilterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload,
    }
}


