import axios from 'axios';


////aca se conecta todo el fron y el backend en 3 lineas de codigo
export function getDogs(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data

        })
    }
}