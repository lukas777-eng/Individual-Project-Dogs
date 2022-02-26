import React from 'react'
import './dogPaginated.css';

export default function Paginated ({dogsPerPage, allDogs, paginated}){
    const pageNumbers = [];

    for(let i = 0; i<= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i + 1);
    }

    return(
        <nav >
            <ul className="pagin">
                {pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                    <button className='buttonPaginated' onClick={() => paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}