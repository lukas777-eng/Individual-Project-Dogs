import React from 'react'
import './dogCard.css';

export default function DogCard({ image, name, temperament, weight, height, life_span }) {
    return(
        <div className="card">
        <h3 className='nameCard'>{name}</h3>
        <img className="cardImg" src={image} alt="pic Not Found" width="200px" height="250px" />
            <h3>weight:{weight}</h3>
            <h3>Height: {height}</h3>
            <h3>Life Span: {life_span}</h3>
            <h3>Temperament: {temperament}</h3>


        </div>
    )
}