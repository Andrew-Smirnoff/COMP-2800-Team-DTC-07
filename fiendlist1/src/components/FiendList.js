import React, {useState} from 'react'
import FiendForm from './FiendForm'

function FiendList({ }) {
    
    return (
        <ul>
            {fiends.map(fiend => (
                <Fiend key={fiend.id} fiend={fiend}/>
            ))}
        </ul>
    )
}

export default FiendList
