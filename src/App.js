import React, {Component} from 'react';
import GeneralInformation from './components/GeneralInformation';
import Navbar from './components/Navbar';
//import DropdownDates from './components/DropdownDates';
import GraficoBarra from './components/GraficoBarra';
import GraficoDiasSinMujeres from './components/GraficoDiasSinMujeres';
import GraficoStepLine from './components/GraficoStepLine';
import InfoColumnistos from './components/InfoColumnistos';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {

  render() {
    return (
    <div className="container-fluid  p-0">

      <Navbar></Navbar>
      <InfoColumnistos/>
      <br/>
      <br/>
      <br/>
      <GeneralInformation enlace1="https://apicolumnistos.tedic.net/api/cantidad_articulos" enlace2="https://apicolumnistos.tedic.net/api/total_autores" enlace3="https://apicolumnistos.tedic.net/api/cantidad_meses" enlace4="https://apicolumnistos.tedic.net/api/cantidad_medios"/>
      <br/>
      <br/>
      <br/>
      <div class="container">

        <div class="row  m-5">
          <div class="col-md-6 offset-md-3">
            <div class="shadow p-1 bg-white ">
            <GraficoBarra
            id="mes"
            enlace="https://apicolumnistos.tedic.net/api/distribucion_mes_anio/2019"
            titulo="¿Cómo se distribuyen por mes por medio?"
            />
            </div>
            
          </div>
        </div>
        <div class="row  m-5">
          <div class="col-md-6 offset-md-3">
            <div class="shadow p-1 bg-white ">
            <GraficoBarra
                id="semana"
            enlace="https://apicolumnistos.tedic.net/api/distribucion_semana_periodico_rango/2020-05-04/2020-05-10"
            titulo="¿Cómo se distribuye por día de la semana por medio?"
            />
            </div>
            
          </div>
        </div>
        <div class="row  m-5">
          <div class="col-md-6 offset-md-3">
            <div class="shadow p-1 bg-white ">
            

            <GraficoStepLine
        enlace ="https://apicolumnistos.tedic.net/api/distribucion_semana_anio/2019"
        id="GraficoStepLine" />
        

            </div>
            
          </div>
        </div>
        <div class="row  m-5">
          <div class="col-md-6 offset-md-3">
            <div class="shadow p-1 bg-white ">
            <GraficoDiasSinMujeres
            id="GraficoDiasSinMujeres"
            enlace="https://apicolumnistos.tedic.net/api/dias_sin_mujeres"
            titulo= "Dias sin mujeres"
            />
            </div>
            
          </div>
        </div>
       
      </div>
    </div>)

  }

}

export default App;
