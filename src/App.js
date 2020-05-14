import React, {Component} from 'react';
import GeneralInformation from './components/GeneralInformation';
import Navbar from './components/Navbar';
//import DropdownDates from './components/DropdownDates';
import GraficoPie from './components/GraficoPie';
import InfoColumnistos from './components/InfoColumnistos';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  render() {
    return (<div className="container-fluid  p-0">

      <Navbar></Navbar>
      <InfoColumnistos/>
      <GeneralInformation enlace1="https://apicolumnistos.tedic.net/api/cantidad_articulos" enlace2="https://apicolumnistos.tedic.net/api/total_autores" enlace3="https://apicolumnistos.tedic.net/api/cantidad_meses" enlace4="https://apicolumnistos.tedic.net/api/cantidad_medios"/>



    </div>)

  }

}

export default App;
