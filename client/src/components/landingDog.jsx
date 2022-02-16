import React from 'react';
import { Link } from 'react-router-dom';

export default function LandinDog(){
    return (
        <div>
            <h1> Welcome to the Dogpage</h1>
            <Link to=" /dogHome">
                <button>log in</button>
            </Link>
        </div>
    )
}