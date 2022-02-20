import React from 'react'

export default function Paginated ({dogsPerPage, allDogs, paginated}){
    const pageNumbers = [];

    for(let i = 0; i<= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i + 1);
    }

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                    <button onClick={() => paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}