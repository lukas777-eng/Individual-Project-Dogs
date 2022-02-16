import React from 'react'

export default function Card({ image, name, temperament, weight }) {
    return(
        <div>
            <img src={image} alt="pic Not Found" width="200px" height="250px" />    
            <h3>{name}</h3>
            <h3>{temperament}</h3>
            <h3>{weight}</h3>
        </div>
    )
}