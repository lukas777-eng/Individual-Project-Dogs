import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetDogs, GetTemperaments, FilterDogsByTemperament, FilterByName, FilterByWeight, FilterCreated } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from '../components/dogCard.jsx';
import Paginated from './dogPaginated';
import SearchBar from './searchDogBar';

export default function DogHome(){
    const dispatch = useDispatch();
    const allDogs = useSelector ((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);
    const [currentDogPage, setCurrentDogPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentDogPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const [order, setOrder] = useState('');

    const paginated = (pageNumber) => {
        setCurrentDogPage(pageNumber)
    }

    useEffect(() => {
        dispatch(GetDogs())
    },[dispatch]);

    useEffect(() => {
        dispatch(GetTemperaments())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(GetDogs());
    }

    function handleFilterTemperaments(e) {
        e.preventDefault();
        setCurrentDogPage(1);
        dispatch(FilterDogsByTemperament(e.target.value))
    }

    function handleFilterByName(e) {
        e.preventDefault();
        dispatch(FilterByName(e.target.value));
        setCurrentDogPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleFilterByWeight(e) {
        e.preventDefault();
        dispatch(FilterByWeight(e.target.value));
        setCurrentDogPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleFilterCreated(e) {
        dispatch(FilterCreated(e.target.value))
    }


    return (
        <div>
            <Link to="/createDog">create doggy</Link>
            <h1> doggy</h1>
            <button onClick={e => {handleClick(e)}}> reload dogs</button>
            <div>
                <select onChange={e => handleFilterByName(e)}>
                    <option value='default'>sortByName</option>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
                <select onChange={e => handleFilterByWeight(e)} >
                    <option value='default'>SortByWeight</option>
                    <option value='asc'>Lighter to heavier</option>
                    <option value='desc'>Heavier to lighter</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>All breeds</option>
                    <option value='api'>Existent breeds</option>
                    <option value='created'>Created breeds</option>
                </select>
                <select onChange={e => handleFilterTemperaments(e)}  >
                    <option key={0} value='all'>All temperaments</option>
                    {allTemperaments?.sort(function (a, b) {
                         if (a.name < b.name) return -1;
                         if (a.name > b.name) return 1;
                         return 0;
                      }).map(el => {
                         return (
                     <option key={el.id} value={el.name}>{el.name}</option>
                                )
                     })}
                </select>
                <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
                <SearchBar/>
                {currentDogs && currentDogs?.map( (el) => {
                    return(
                        <Fragment>
                           <Link to={'/dogs/' + el.id}>
                              <DogCard image={el.image} name={el.name} temperaments={el.temperaments} weight={el.weight} key={el.id} />
                           </Link>
                        </Fragment>
                    );
                    })}
            </div>
        </div>
    )
}