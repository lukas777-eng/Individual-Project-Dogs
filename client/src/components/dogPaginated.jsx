import React from 'react'
import './dogPaginated.css';

export default function Paginated ({dogsPerPage, allDogs, paginated}){
    const pageNumbers = [];

    for(let i = 0; i<= Math.ceil(allDogs/dogsPerPage); i++){                     //el numero redondo que resulta de dividir todos los dogs x la cant de dogs x página
        pageNumbers.push(i + 1);
    }

    return(
        <nav >
            <ul className="pagin">
                {pageNumbers && pageNumbers.map(number =>(                                        //si tengo ese arreglo, mapeálo y devolveme cada número que te devuelva el paginado  || number es cada una de las páginas que necesito para renderizar todos mis dogs
                    <li key={number}>                                                                          
                    <button className='buttonPaginated' onClick={() => paginated(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}