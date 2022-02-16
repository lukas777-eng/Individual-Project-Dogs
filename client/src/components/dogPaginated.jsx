import React from 'react'

export default function Paginated ({dogsPerPage, allDogs, paginated}){
    const pageNumbers = []

    for(let i = 0; i<= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li>
                    <a onClick={() => paginated(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}