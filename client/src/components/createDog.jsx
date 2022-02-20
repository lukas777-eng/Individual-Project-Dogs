import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { postDog, GetTemperaments } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CreateDog(){
    const dispatch = useDispatch()
    const history = useHistory()
    const temperament = useSelector((state) => state.temperament)
    const [input,setInput] = useState({
        name: "",
        weight: "",
        temperament: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
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
        temperaments: []
        })
        history.push('/DogHome')
    }

    useEffect(() => {
        dispatch(GetTemperaments());
    }, []);

    return (
        <div>
            <Link to= '/dogHome'><button>Back</button></Link>
            <h1>Create a Dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>nombre:</label>
                    <input type="text" value={input.name} name="name" onChange={handleChange} />
                    <label>weight:</label>
                    <input type="text" value={input.weight} name="weight" onChange={handleChange} />
                    <label>temperament:</label>
                    <input type="text" value={input.temperament} name="temperament" onChange={handleChange} />
                    <label> image:</label>
                    <input type="text" value={input.image} name="image" onChange={handleChange}/>
                </div>
                <button type="submit">Create Dog</button>
            </form>
        </div>
    )
}