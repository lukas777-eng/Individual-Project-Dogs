import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from '../components/dogCard.jsx';
import Paginated from './dogPaginated';

export default function DogHome(){
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)
    const [currentDogPage, setCurrentDogPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentDogPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginated = (pageNumber) => {
        setCurrentDogPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }
    return (
        <div>
            <Link to="/dogs">create doggy</Link>
            <h1> doggy</h1>
            <button onClick={e => {handleClick(e)}}> reload dogs</button>
            <div>
                <select>
                    <option value='selected'>sortByName</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select>
                    <option value='selected'>SortByWeight</option>
                    <option value='asc'>Lighter to heavier</option>
                    <option value='desc'>Heavier to lighter</option>
                </select>
                <select>
                    <option value='all'>All breeds</option>
                    <option value='api'>Existent breeds</option>
                    <option value='created'>Created breeds</option>
                </select>
                <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
                {currentDogs?.map( (el) => {
                    return(
                        <Fragment>
                           <Link to={"/DogHome/" + el.id}>
                              <DogCard image={el.image} name={el.name} temperament={el.temperament} weight={el.weight} key={el.id} />
                           </Link>
                        </Fragment>
                    );
                    })}
            </div>
        </div>
    )
}