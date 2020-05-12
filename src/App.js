import React, { Component } from 'react';

import GraficoBarra from './components/GraficoBarra';

class App extends Component {

  

  render() {
   return(
    <div className="app container">
    <div className="app container">
  
    <GraficoBarra
    enlace="https://apicolumnistos.tedic.net/api/distribucion_semana_periodico_rango/2020-05-04/2020-05-10"
    titulo="¿Cómo se distribuye por día de la semana por medio?"
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
    enlace="https://apicolumnistos.tedic.net/api/distribucion_mes_anio/2019"
    titulo="¿Cómo se distribuyen por mes por medio?"
    />

    </div>  
 </div>
   )

}

}


export default App;