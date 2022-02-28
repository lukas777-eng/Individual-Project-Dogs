import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { postDog, GetTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './createDog.css';

function validate(input) {
    let errors = {};
    if (!input.name){
        errors.name = 'Name is require';
    } else if (input.name.length > 30) {
        errors.name = 'Very Long Name';
    } else if (!input.weight) {
        errors.weight = 'weight is require'
    }  else if (isNaN(parseInt(input.weight))) {
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
    const history = useHistory();
    const allTemperaments = useSelector((state) => state.temperament);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "",
        temperament: [],
    });

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postDog(input))
        alert("Doggy created successfully")
        setInput({
            name: "",
            weight: "",
            height: "",
            life_span: "",
            image: "",
            temperament: [],
        })
        history.push('/DogHome')
    }

    function handleSelect(e) {
        if (!input.temperament.includes(e.target.value)) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            });
            console.log(input);
        }
    }


    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }



    useEffect(() => {
        dispatch(GetTemperaments())
    }, []);

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
                    <select className="selectCreate" onChange={handleSelect} >
                        <option value='selected' hidden>TEMPERAMENTS</option>
                       {allTemperaments?.map((elem) => { return (
                    <option value={elem.name} key={elem.id}>{elem.name}</option>)}
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
                            <button className='buttonCreate' type="submit">Create Dog</button>

            </form>
        </div>
    )
}