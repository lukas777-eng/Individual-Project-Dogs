import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { postDog, GetTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './createDog.css';

function validate(input) {
    let errors = {};                                                       //genero un objeto errores
    if (!input.name){                                                     //input es mi estado local, si en mi estadolocal.name no hay nada, 
        errors.name = 'Name is require';                                 //entonces en mi objeto.name pongo un string que diga se requiere un nombre
    } else if (input.name.length > 30) {
        errors.name = 'Very Long Name';
    } else if (!input.weight) {
        errors.weight = 'weight is require'
    }  else if (isNaN(parseInt(input.weight))) {                           //convierto el peso que me viene en string en un entero para compararlo
        errors.weight = 'Weight should be a number';
    } else if (input.weight < 1) {
        errors.weight = 'Minimum weight required is 1';
    } else if (input.weight > 100) {
        errors.weight = 'Maximum weight cant be more than 100kg';
    } else if (!input.height) {
        errors.height = 'Height is require'
    }  else if (isNaN(parseInt(input.height))) {
        errors.height = 'Height should be a number';
    } else if (input.height < 15) {
        errors.height = 'Minimum height required is 15';
    } else if (input.height > 100) {
        errors.height = 'Maximum height cant be more than 100cm';
    } else if (!input.life_span) {
        errors.life_span = 'Life span is require'
    }  else if (isNaN(parseInt(input.life_span))) {
        errors.life_span = 'Life span should be a number';
    } else if (input.life_span < 0) {
        errors.life_span = 'Minimum year cant be less than 0';
    } else if (input.life_span > 20) {
        errors.life_span = 'Maximum year cant be more than 20 years';
    } else if (!input.image){
        errors.image = 'It has to be a valid url';
    }
    return errors;
};


export default function CreateDog(){
    const dispatch = useDispatch();
    const history = useHistory();                                                       // mètodo del router que me redirige a la ruta que yo le diga 
    const allTemperaments = useSelector((state) => state.temperament);
    const [errors, setErrors] = useState({});                                           //genero un estado local errors y setErrors que va ser un objeto vacío 
    const [input, setInput] = useState({                                                  //acá me guardo en un estado local los datos del formulario y le paso lo que necesita el post
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "",
        temperament: [],                                                                 //temperament va a ser un arreglo porque quiero poner mas de uno (un string no me serviría)
    });

    function handleChange(e){                                                        //todos los inputs del formulario van a necesitar tener la prop handleChange
        e.preventDefault();
        setInput({                                                                 //quiero ir guardando las cosas que el usuario escriba en el input en mi estado input
            ...input,
            [e.target.name] : e.target.value                                      //seteame el e.target.name en e.target.value (agregame el e.target.value de lo que esté modificando, el target.name se lo fui pasando en el formulario, si esta modificando el  name, va a tomar el target.value de name, si esta modificando life span, va a tomar el target.value de name='life_span'
        })                                                                       //a medida que va modificando me va llenando ese estado
        setErrors(validate({                                                      //seteame mi estado errores, pasándole la función validate de más arriba,
            ...input,                                                             //con el estado input y el e.target.name en el e.target.value
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){                                                //el handleSubmit lo voy a usar para submitear el formulario
        e.preventDefault();                                                 //e.preventDefault() me permite prevenir el comportamiento por default de un submit (el comportamiento predeterminado) que en este caso es el envío del formulario
        dispatch(postDog(input))                                            //si no salió por ninguna de las validaciones incorrectas, entonces envío el formulario
        alert("Doggy created successfully")
        setInput({                                                         //seteo el input en cero otra vez
            name: "",
            weight: "",
            height: "",
            life_span: "",
            image: "",
            temperament: [],
        })
        history.push('/DogHome')                                               //cuando termine de hacer esto mandáme al home (porque ya creé mi dog)
    } 

    function handleSelect(e) {
       // if (!input.temperament.includes(e.target.value)) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            });
            e.target.value = 'default'

      //  }
    }


    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)        //Me devuelve el estado nuevo sin ese elemento que yo clikee
        }) 
    }



    useEffect(() => {
        dispatch(GetTemperaments())
    }, [dispatch]);

    return (
        <div>
            <div className='buttons'>
            <Link to= '/DogHome'><button className='buttonCreate'>Back to Home</button></Link>
            </div>
            <form onSubmit={(e) => handleSubmit (e)}>
                <h1 className='titleCreate'>Create a Dog</h1>
                <div className="inputs">
                    <label className='inputTitle'>NAME:
                    <input className='inputCreate' type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                    {errors.name && ( <p>{errors.name}</p>)}
                    </label>
                    <label className='inputTitleWeight'>WEIGHT:
                    <input className='inputCreate' type="text" value={input.weight} name="weight" onChange={(e) => handleChange(e)} />
                    {errors.weight && ( <p>{errors.weight}</p>)}
                    </label>
                    <label className='inputTitleHeight'>HEIGHT:
                    <input className='inputCreate' type="text" value={input.height} name="height" onChange={(e) => handleChange(e)} />
                    {errors.height && ( <p>{errors.height}</p>)}
                    </label>
                    <label className='inputTitleLife'>LIFE SPAN:
                    <input  className='inputCreate' type="text" value={input.life_span} name="life_span" onChange={(e) => handleChange(e)} />
                    {errors.life_span && ( <p>{errors.life_span}</p>)}
                    </label>
                    <label className='inputTitle'> IMAGE:
                    <input className='inputCreate' type="text" value={input.image} name="image" onChange={(e) => handleChange(e)}/>
                    {errors.image && ( <p>{errors.image}</p>)}
                    </label>
                    <p  className='inputTitle'> temperament</p>
                    <select className="selectCreate" onChange={handleSelect} >Temperament
                       {allTemperaments?.map((elem) => { return (                            //agarro el estado que me traje con el useSelector
                    <option value={elem.name} key={elem.id}>{elem.name}</option>)}           //obtengo el temperamento y lo renderizo
                    )}
                    </select>
                    


                    {input.temperament.map(el => {
                        return (
                            <div className='divtemp' key={el}>
                                <ul className='ul' key={el}>
                                    <li className='allTemps'>
                                        <p className='temperament'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >X</button>
                                    </li>
                                </ul>
                            </div>
                        )
                    })}
                </div>
                            <button className='buttonCreate5' type="submit">Create Dog</button>

            </form>
        </div>
    )
}