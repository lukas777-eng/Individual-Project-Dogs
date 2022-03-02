import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetDogs, GetTemperaments, FilterDogsByTemperament, FilterByName, FilterByWeight, FilterCreated } from '../actions';
import { Link } from 'react-router-dom';
import DogCard from '../components/dogCard.jsx';
import Paginated from './dogPaginated';
import SearchBar from './searchDogBar';
import './dogHome.css';

const divStyle = {
    textDecoration: "none",
}
export default function DogHome(){
    const dispatch = useDispatch();                                                 //declaro la const dispatch para despachar mis acciones, con el hook useDispatch
    const allDogs = useSelector ((state) => state.dogs);                            // este hook es lo mismo que usar el mapStateToProps. Con useSelector traeme en esa constante todo lo que esta en el estado de dogs me trae desde el reducer el estado dogs donde están todos los perros 
    const allTemperaments = useSelector((state) => state.temperament);
    const [currentDogPage, setCurrentDogPage] = useState(1);                            //le paso el estado local con la primer página que se renderiza
    const [dogsPerPage, setDogsPerPage] = useState(8);                                  //cuántos personajes quiero por página
    const indexOfLastDog = currentDogPage * dogsPerPage;                              //cuando empieza será 8 
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;                              // 0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);              //slice toma una porción del arreglo dependiendo lo que le estoy pasando por parámetro
    const [order, setOrder] = useState('');

    const paginated = (pageNumber) => {                                           //acá el paginado va a setear la pagina en el numero de pagina que se vaya clickeando
        setCurrentDogPage(pageNumber)                                               //cuando setea la página los índices cambian y el slide se va modificando   
    }

    useEffect(() => {                                                              //con useEffect me traigo del estado los dogs cuando el componente se monta
        dispatch(GetDogs())                                                         //este dispatch es lo mismo que hacer el mapDispatchToProps, despacho la accion getDogs
    },[dispatch]);

    useEffect(() => {
        dispatch(GetTemperaments())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        setCurrentDogPage(1);
        dispatch(GetDogs());                                                     //esto me lo resetea la pagina para que no se buguee, lo que hace es despachar el getDogs
    }

    function handleFilterTemperaments(e) {
        console.log(e.target.value)
        e.preventDefault();
        setCurrentDogPage(1);
        dispatch(FilterDogsByTemperament(e.target.value))
    }

    function handleFilterByName(e) {
        e.preventDefault();
        dispatch(FilterByName(e.target.value));
        setCurrentDogPage(1);
        setOrder(`Ordinate ${e.target.value}`);
    }

    function handleFilterByWeight(e) {
        e.preventDefault();
        dispatch(FilterByWeight(e.target.value));
        setCurrentDogPage(1);
        setOrder(`Ordinate ${e.target.value}`);
    }

    function handleFilterCreated(e) {                                            //declaro una función que es un handle del filter del dog creado o de api
        e.preventDefault();                                                      //esta funcion es la que paso en el select y cuando (e) se modifique ejecuta esta función
        setCurrentDogPage(1);                                                     //despacho la acción llamada FilterCreated y accedo al valor de cada una de las opcioneS
        dispatch(FilterCreated(e.target.value))                                     //de value con el e.target.value - dependiendo de cuál clickea el usuario
    }

   

    return (
        <div >
          <div className='topHome'>
          <button className='buttonCreate3' onClick={e => handleClick(e)}> Reload dogs </button>
            <SearchBar/>
            <Link  to="/dog">
                <button className='buttonCreate2'>Create New Dog</button>
            </Link>
            </div>
          <div className='Filters'>
                <select onChange={e => handleFilterByName(e)}>
                    <option value='default'>Sort by Name</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select onChange={e => handleFilterByWeight(e)} >
                    <option value='default'>Sort by Weight</option>
                    <option value='asc'>Lighter to heavier</option>
                    <option value='desc'>Heavier to lighter</option>
                </select>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>All Dogs</option>
                    <option value='api'>Existent Dogs</option>
                    <option value='created'>Created Dogs</option>
                </select>
                <select  onChange={(e) => handleFilterTemperaments(e)}>
                    <option value="all">All Temperaments</option>
                    {allTemperaments?.map((elem) => (
                    <option value={elem.name} key={elem.id}>{elem.name}</option>
                    ))}
                </select>
            </div>
            <div className='dogHome'>
                { currentDogs?.map( (el) => {
                    return(
                        <div key={el.id}>
                           <Link style={divStyle} to={'/dogs/' + el.id}>
                              <DogCard image={el.image} name={el.name} temperament={el.temperament? el.temperament: el.temperaments && el.temperaments.map((el) => el.name.concat(" "))} weight={el.weight}  key={el.id} />
                           </Link>
                        </div>
                    );
                    })}
             </div>
             <Paginated dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginated={paginated} />
        </div>
    )
}