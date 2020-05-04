import React, { Component } from 'react';
import './App.css';
import GraficosComponent from './components/GraficosComponent'

class App extends Component {

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>prueba</h1>
        </header>
        <GraficosComponent />
      </div>
    );
  }

}

export default App;
