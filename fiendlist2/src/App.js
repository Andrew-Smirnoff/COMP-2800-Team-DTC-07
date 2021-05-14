import './App.css';
import React, { useState } from 'react';
import FiendForm from "./components/FiendForm"
import FiendList from "./components/FiendList"


function App() {
  const [fiends, setFiends] = useState([]);

  function addFiend(fiend) {
    setFiends({fiend, ...fiends});
  }

  return (
    <div className="App">
     <p>React to do</p>
     <FiendForm addFiend={addFiend}/>
     <FiendList fiends={fiends}/>
    </div>
  );
}

export default App;
