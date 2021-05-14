import React from 'react';
import Fiend from "./Fiend"

function FiendList({fiends}) {
    return (
        <ul>
            {fiends.map(fiend => (
                <Fiend key={fiend.id} fiend={fiend}/>
            ))}
        </ul>
    )
}

export default FiendList;