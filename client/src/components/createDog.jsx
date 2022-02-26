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
    } else if (!input.weight) {
        errors.weight = 'weight is require'
    } 
    return errors;
};

export default function CreateDog(){
    const dispatch = useDispatch();
    const history = useHistory();
    const temperament = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        image: "",
        temperaments: [],
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
        console.log(input)
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
            temperaments: [],
        })
        history.push('/DogHome')
    }

    function handleSelect(e) {
        if (!input.temperaments.includes(e.target.value)) {
            setInput({
                ...input,
                temperaments: [...input.temperaments, e.target.value]
            });
            console.log(input);
        }
    }


    function handleDeleteTemperament(el) {
        setInput({
            ...input,
            temperaments: input.temperaments.filter(temp => temp !== el)
        })
    }



    useEffect(() => {
        dispatch(GetTemperaments());
    }, [dispatch]);

    return (
        <div>
            <div className='buttons'>
            <Link to= '/DogHome'><button className='buttonCreate'>Back to Home</button></Link>
            <button className='buttonCreate' type="submit">Create Dog</button>
            </div>
            <form onSubmit={(e) => handleSubmit (e)}>
                <h1 className='titleCreate'>Create a Dog</h1>
                <div className="inputs">
                    <label className='inputTitle'>NAME:
                    <input className='inputCreate' type="text" value={input.name} name="name" onChange={handleChange} />
                    {errors.name && ( <p>{errors.name}</p>)}
                    </label>
                    <label className='inputTitleWeight'>WEIGHT:
                    <input className='inputCreate' type="text" value={input.weight} name="weight" onChange={handleChange} />
                    {errors.weight && ( <p>{errors.weight}</p>)}
                    </label>
                    <label className='inputTitleHeight'>HEIGHT:
                    <input className='inputCreate' type="text" value={input.height} name="height" onChange={handleChange} />
                    {errors.height && ( <p>{errors.height}</p>)}
                    </label>
                    <label className='inputTitleLife'>LIFE SPAN:
                    <input  className='inputCreate' type="text" value={input.life_span} name="life_span" onChange={handleChange} />
                    {errors.life_span && ( <p>{errors.life_span}</p>)}
                    </label>
                    <label className='inputTitle'> IMAGE:
                    <input className='inputCreate' type="text" value={input.image} name="image" onChange={handleChange}/>
                    </label>
                    <select className="selectCreate" onChange={e => handleSelect(e)} >
                        <option value='selected' >TEMPERMENTS</option>
                       {temperament?.map((elem) => (
                    <option value={elem.name} key={elem.id}>{elem.name}</option>
                    ))}
                    </select>
                   

                    {input.temperaments.map(el => {
                        return (
                            <div className='divtemp'>
                                <ul className='ul' key={el}>
                                    <li className='allTemps'>
                                        <p className='temperment'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >X</button>
                                    </li>
                                </ul>
                            </div>
                            
                        )
                    })}
                </div>
            </form>
        </div>
    )
}