import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetDogs, GetTemperaments, FilterDogsByTemperament, FilterByName, FilterByWeight, FilterCreated } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from '../components/dogCard.jsx';
import Paginated from './dogPaginated';
import SearchBar from './searchDogBar';
import './dogHome.css';


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
        setCurrentDogPage(1);
        dispatch(GetDogs());
    }

    function handleFilterTemperaments(e) {
        console.log(e.target.value)
      //  e.preventDefault();
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
        e.preventDefault();
        setCurrentDogPage(1);
        dispatch(FilterCreated(e.target.value))
    }


    return (
        <div >
          <div className='topHome'>

            <SearchBar/>
            <Link to="/dog">
                <button className='buttonCreate'>Create New Dog</button>
            </Link>
            </div>
          <div className='Filters'>
                <select onChange={e => handleFilterByName(e)}>
                    <option value='default'>Sort by Name</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select onChange={e => handleFilterByWeight(e)} >
                    <option value='default'>Sort by Weight</option>
                    <option value='asc'>Lighter to heavier</option>
                    <option value='desc'>Heavier to lighter</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>All Dogs</option>
                    <option value='api'>Existent Dogs</option>
                    <option value='created'>Created Dogs</option>
                </select>
                <select  onChange={(e) => handleFilterTemperaments(e)}>
                    <option value="all">All Temperaments</option>
                    {allTemperaments?.map((elem) => (
                    <option value={elem.name} key={elem.id}>{elem.name}</option>
                    ))}
                </select>
            </div>
            <div className='dogHome'>
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
             <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
        </div>
    )
}