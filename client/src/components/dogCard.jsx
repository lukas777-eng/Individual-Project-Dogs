import React from 'react'
import './dogCard.css';

export default function DogCard({ image, name, weight, temperament, temperaments}) {
    return(
        <div className="card">
        <h3 className='nameCard'>{name}</h3>
        <img className="cardImg" src={ image } alt="Cant find the Image" />
            <h3>weight:    {weight}  kg</h3>
            <h3>Temperament: {temperament}</h3>


        </div>
    )
}