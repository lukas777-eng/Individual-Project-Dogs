import React from 'react'

export default function DogCard({ image, name, temperament, weight, life_span }) {
    return(
        <div>
            <img src={image} alt="pic Not Found" width="200px" height="250px" />
            <h3>{name}</h3>
            <h3>{temperament}</h3>
            <h3>{weight}</h3>
            <h3>{life_span}</h3>
        </div>
    )
}