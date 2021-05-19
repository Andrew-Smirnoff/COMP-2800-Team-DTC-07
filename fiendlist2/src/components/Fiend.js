import React from 'react'

function Fiend({fiend}) {
    return (
        <div>
            <input type="checkbox"/>
            <li>{fiend.name}</li>
            <button>X</button>
        </div>
    )
}

export default Fiend
