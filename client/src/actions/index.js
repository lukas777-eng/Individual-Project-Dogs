import axios from 'axios';



////aca se conecta todo el front y el backend
export function GetDogs(){
    return async function(dispatch){
        var json = await axios.get(`/dogs`);
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}

export function GetTemperaments() {
    return async function (dispatch) {
        var json = await axios.get(`/temperament`, {});
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data,
        })
    }
}

export function FilterDogsByTemperament(payload) {       //lo que llega en payload es lo que le mando desde el componente, el value del select
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

export function FilterCreated(payload) {                  //filtra si son creados o son de la api
    return {
        type: 'FILTER_CREATED',
        payload,
    }
}
export function getDogName(name) {                       //acá traigo del back-end los dogs que coincidan con el nombre pasado por query
    return async function (dispatch){
        try{
            var json = await axios.get(`/dogs?name=` + name);    //mi ruta del back mas lo que el usuario le pase como nombre en la barra de búsqueda
            return dispatch({
                type: 'GET_DOG_NAME',
                payload: json.data
            })
        } catch(error){
            console.name(error)
        }
    }
}

export function postDog(payload){                                                        //esto me va a devolver la información de los dogs que se agregan por post
    return async function(dispatch){
        const response = await axios.post(`/dog`, payload);         // uso axios.post para disparar la accion de crear un dog
        console.log(response);                                                            //en esta ruta quiero hacer el post del payload que llega en el front
        return dispatch({
            type: 'POST_DOG',
            payload: response
        });
    }
}

export function getDetail(id){
    return async (dispatch) => {
            const json = await axios.get(`/dogs/`+ id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        
    }
}


