import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index.js';
import { useEffect } from 'react';
import './dogDetail.css';

export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch]);

    const myDog = useSelector((state) => state.detail)

    return (
        <div >
            {
                myDog.length > 0 ?
                <div className='detail'>
                    <div>
                    <img className="imgDetail"src= {myDog[0].img? myDog[0].img : myDog[0].image} alt="not found  "/>
                    </div>
                    <div className='detailInfo'>
                    <h1>{myDog[0].name}</h1>
                    <h2>Weight:{myDog[0].weight}</h2>
                    <h2>Life span:{myDog[0].life_span}</h2>
                    <h2>Temperament:{myDog[0].temperament}</h2>

                    <Link to= '/DogHome'>
                <button className='back'>Back</button>
            </Link>
                    </div>
                </div> : <p>Loading..</p>
            }
            
        </div>
    )
}