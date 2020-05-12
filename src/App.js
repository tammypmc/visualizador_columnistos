import React, {Component} from 'react';
import GraficoPie from './components/GraficoPie';
import Navbar from './components/Navbar';

//import GeneralInformation from'./components/GeneralInformation';

class App extends Component {

  render() {
    return (<div className="container-fluid p-0" >
      <Navbar></Navbar>

      <GraficoPie enlace="https://apicolumnistos.tedic.net/api/historico_genero"/>
      <GraficoPie enlace="https://apicolumnistos.tedic.net/api/historico_genero"/>
      <GraficoPie enlace="https://apicolumnistos.tedic.net/api/historico_genero"/>




    </div>)

  }

}

export default App;
