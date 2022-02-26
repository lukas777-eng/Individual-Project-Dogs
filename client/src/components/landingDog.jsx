import React from 'react';
import { Link } from 'react-router-dom';
import './landingDog.css';


export default function LandinDog(){
    return (
        <div className='div'>
            <h1 className='h1'> Welcome to the Dogpage</h1>
            <Link to='/DogHome'>
                <button className='button'>login</button>
            </Link>
        </div>
    )
}