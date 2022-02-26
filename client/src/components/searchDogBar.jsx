import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDogName } from '../actions'
import './searchDogBar.css';

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogName(name))
        setName('');

    }

    return(
        <div className="searchBar">
            <input className="search" type="text" placeholder="Insert Name..." onChange= { (e) => handleInputChange(e)} value={name} />
            <button className="buttonSearchBar" type="submit" title="submit your search" onClick= { (e) => handleSubmit(e)}>Search</button>
        </div>
    )
}