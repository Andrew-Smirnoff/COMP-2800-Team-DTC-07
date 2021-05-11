import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import FiendForm from './components/FiendForm';
import FiendList from './components/FiendList';


  function App() {
  
  return (
    <div className="App">
      <header>
        <h1>FiendList ;)</h1>
        <FiendForm  />
      </header>
    </div>
  );
}


export default App;
