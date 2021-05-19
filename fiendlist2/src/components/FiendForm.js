import React from 'react'
import {v5 as uuidv5} from "uuid"
import { useState } from 'react';

function FiendForm( addFiend ) {
    const [fiend, setFiend] = useState({
        id: "",
        name: "",
        deleted: false
    });

    function handleTaskInputChange(e) {
        setFiend({...fiend, name: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(fiend.name.trim()) {
            addFiend({...fiend, id: (Math.floor(Math.random() * 10000))});
            setFiend({...fiend, name: ""});
        }
    }
    
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="text"
                type="text"
                value={fiend.name}
                onChange={handleTaskInputChange}
            />
            <button type="submit"/>
        </form>
    )
}

export default FiendForm
