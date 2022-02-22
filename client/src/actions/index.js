import axios from 'axios';


////aca se conecta todo el front y el backend
export function GetDogs(){
    return async function(dispatch){
        var json = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}

export function GetTemperaments() {
    return async function (dispatch) {
        let json = await axios.get(`http://localhost:3001/temperament`, {});
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data,
        })
    }
}

export function FilterDogsByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
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
////devuelve el name en la barra de busqueda
export function getDogName(name) {
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogs?name=` + name);
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            })
        } catch(error){
            console.name(error)
        }
    }
}

export function postDog(payload){
    return async function(dispatch){
        const response = await axios.post(`http://localhost:3001/dog`, payload);
        console.log(response);
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/dogs/`+ id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        }catch(error){
            console.log(error)
    }
    }
}


