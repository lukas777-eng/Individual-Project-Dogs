import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogName } from '../actions'
import './searchDogBar.css';

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState('');      //lo que está tipeando el usuario va a ser mi estado local name

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)                     //el value del input que ingresa por búsqueda va a setear el value del state
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogName(name))                 //acá lo que tipea el usuario le llega desde el estado local a la función que llama al back con ese name
        setName('');                                    //para que cuando ya se hizo la busqueda no me siga mostrando el nombre ingresado, seteo el nombre en comillas
 
    }

    return(
        <div className="searchBar">
            <input className="search" type="text" placeholder="Insert Name..." onChange= { (e) => handleInputChange(e)} value={name} />
            <button className="buttonSearchBar" type="submit" title="submit your search" onClick= { (e) => handleSubmit(e)}>Search</button>
        </div>
    )
}