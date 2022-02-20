import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index.js';
import { useEffect } from 'react';

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    const myDog = useSelector((state) => state.detail)

    return (
        <div>
            {
                myDog.length > 0 ?
                <div>
                    <h1>{myDog[0].name}</h1>
                    <img src= {myDog[0].img? myDog[0].img : myDog[0].image} alt="not found  "/>
                    <h2>{myDog[0].weight}</h2>
                    <h2>{myDog[0].temperament}</h2>
                    <h2>{myDog[0].life_span}</h2>
                </div> : <p>Loading..</p>
            }
            <Link to= '/DogHome'>
                <button>Back</button>
            </Link>
        </div>
    )
}