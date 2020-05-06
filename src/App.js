import React, { Component } from 'react';
import GraficoPie from './components/GraficoPie';
import GraficoBarra from './components/GraficoBarra';

class App extends Component {

  

  render() {
   return(
    <div className="app container">
    <div className="app container">
    <p className="lead text-center"> Bot Columnistos</p>

    <GraficoPie
    enlace="https://apicolumnistos.tedic.net/api/historico_genero"
    />
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
    <GraficoPie
    enlace="https://apicolumnistos.tedic.net/api/fecha_actual"
    />
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
    <GraficoBarra
    enlace="https://apicolumnistos.tedic.net/api/periodicos"
    />
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>
 <br/>

    <GraficoBarra
    enlace="https://apicolumnistos.tedic.net/api/record_anual"
    />

    </div>  
 </div>
   )

}

}


export default App;