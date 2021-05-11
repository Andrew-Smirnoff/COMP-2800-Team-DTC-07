import React, {useState} from 'react'
import {v4 as uuidv4} from "uuid";

function FiendForm({ props }) {
    const [fiend, setFiend] = useState('');

    const handleChange = e => {
        setFiend(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        //props.onSubmit({
        //    id: uuidv4(),
        //    text: fiend
        //})

        setFiend('');
    };
   
    return (
        <form onSubmit={handleSubmit}>
            <input
            className = "fiendForm"
            name="text"
            type="text"
            placeholder="Add your friend's name!"
            value={fiend}
            onChange={handleChange}/>
            <button className="fiendButton" type="submit">
                SUBMIT
            </button>
        </form>
    )
}

export default FiendForm
