import React, { Component } from 'react';
import './App.css';
import GraficoPie from './components/GraficoPie'

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>prueba</h1>
        </header>
        <GraficoPie />
      </div>
    );
  }

}

export default App;
