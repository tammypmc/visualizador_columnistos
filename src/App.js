import React, { Component } from 'react';
import GraficoPie from './components/GraficoPie';

class App extends Component {

  

  render() {
   return(
    <div className="app container">
    <div className="app container">
    <p className="lead text-center"> Bot Columnistos</p>
    <GraficoPie
    enlace="https://apicolumnistos.tedic.net/api/fecha_actual"
    />
    <GraficoPie
    enlace="https://apicolumnistos.tedic.net/api/record_anual"
    />
    </div>  
 </div>
   )

}

}


export default App;