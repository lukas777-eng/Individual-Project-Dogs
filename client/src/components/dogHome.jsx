import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from '../components/dogCard.jsx';

export default function DogHome(){
    const dispatch = useDispatch()
    const allDogs = useSelector ((state) => state.dogs)

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
                {allDogs?.map( (el) => {
                    return(
                        <Fragment>
                           <Link to={"/dogHome/" + el.id}>
                              <DogCard image={el.img} name={el.name} temperament={el.temperament} weight={el.weight} />
                           </Link>
                        </Fragment>
                    );
                    })}
            </div>
        </div>
    )
}