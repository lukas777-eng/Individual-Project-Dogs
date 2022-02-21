import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { postDog, GetTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

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
    const [input,setInput] = useState({
        name: '',
        weight: '',
        height: '',
        life_span: '',
        image: '',
        temperaments: [],
    });

    function handleChange(e){
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
            name: '',
            weight: '',
            height: '',
            life_span: '',
            image: '',
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
            <Link to= '/DogHome'><button>Back to Home</button></Link>
            <h1>Create a Dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} />
                    {errors.name && ( <p>{errors.name}</p>)}
                    <label>weight:</label>
                    <input type="text" value={input.weight} name="weight" onChange={handleChange} />
                    {errors.weight && ( <p>{errors.weight}</p>)}
                    <label>height:</label>
                    <input type="text" value={input.height} name="wheight" onChange={handleChange} />
                    {errors.height && ( <p>{errors.height}</p>)}
                    <label>Life-span:</label>
                    <input type="text" value={input.life_span} name="life_span" onChange={handleChange} />
                    {errors.life_span && ( <p>{errors.life_span}</p>)}
                    <label> image:</label>
                    <input type="text" value={input.image} name="image" onChange={handleChange}/>
                    <select onChange={e => handleSelect(e)} >
                        <option value='selected' >Temperaments</option>
                       {temperament?.map((elem) => (
                    <option value={elem.name} key={elem.id}>{elem.name}</option>
                    ))}
                    </select>

                    {input.temperaments.map(el => {
                        return (
                            
                                <ul className='allTemps' key={el}>
                                    <li>
                                        <p className='temp'><strong>{el}</strong></p>
                                        <button onClick={() => handleDeleteTemperament(el)} className='x' >X</button>
                                    </li>
                                </ul>
                            
                        )
                    })}
                </div>
                <button type="submit">Create Dog</button>
            </form>
        </div>
    )
}