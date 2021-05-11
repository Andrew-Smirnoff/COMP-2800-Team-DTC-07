import React from 'react'

function Fiend({ fiend }) {
    return (
        <div style ={{display: "flex"}}>
            <input type="checkbox"/>
            <li>
                style = {{
                    color: "white",
                    textDecoration: fiend.completed ? "line-through" : null
                }}
                {fiend.name}
            </li>
            <button type="button" className="btn btn-primary">PRIMARY</button>
        </div>
    )
}

export default Fiend
