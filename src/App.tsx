import React from 'react';
import logo from './logo.svg';
import './App.css';
import EvenOddGame from "./component/EvenOddGame";
const  App: React.FC = () =>{
  return (
    <div className='container-main'>
      <div className="App">
        <EvenOddGame />
      </div>
    </div>
  );
}

export default App;
