import React, {Component} from 'react';
import GeneralInformation from './components/GeneralInformation';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import GraficoBarra from './components/GraficoBarra';
import GraficoBarraSemana from './components/GraficoBarraSemana';
import GraficoDiasSinMujeres from './components/GraficoDiasSinMujeres';
import GraficoPromedioGeneral from './components/GraficoPromedioGeneral';
import GraficoStepLine from './components/GraficoStepLine';
import InfoColumnistos from './components/InfoColumnistos';
import {ObtenerAnios} from './components/utilities';


const dominioAPI = process.env.REACT_APP_API_URL;
const pais = process.env.REACT_APP_COUNTRY;
const medios = process.env.REACT_APP_MEDIOS.split(',');
const mediosDB = process.env.REACT_APP_MEDIOS_BD_NAMES.split(',')
const aniosDisponibles = dominioAPI + "api/anios_disponibles";
const artDisponibles = dominioAPI + "api/cantidad_articulos";
const autoresDisponibles = dominioAPI + "api/total_autores";
const mesesDisponibles = dominioAPI + "api/cantidad_meses";
const mediosDisponibles = dominioAPI + "api/cantidad_medios";
const promediosGenerales = dominioAPI + "api/periodicos";
const diasSinMujeres = dominioAPI + "api/dias_sin_mujeres";
const diasDisponibles = dominioAPI + "api/dias_disponibles";
const diasSinMujeresPorMedio = dominioAPI + "api/dias_sin_mujeres_medio/";


class App extends Component {

  constructor(props) {
    super(props);
    this.listaAnios = ObtenerAnios(aniosDisponibles);
    this.state = {
      primerFecha : this.getSunday(),
      segundaFecha : this.getSaturday(),
      anio : new Date().getFullYear()
    };

  }

//  function para obtener el domingo como primer dia de la semana
getSunday(){
  var date = new Date();
  var first = date.getDate() - date.getDay();
  var monday = new Date(date.setDate(first));
  return (formatDate(monday.toString().split(" ", 4)));

}

//funcion sabado como ultimo dia de la semana
getSaturday(){
  var date = new Date();
  var first = date.getDate() - date.getDay();
  var last = first + 6;
  var sunday = new Date(date.setDate(last));
  return (formatDate(sunday.toString().split(" ", 4)));

}

  /* obtiene fechas y da el formato necesario para la consulta del api y lo actualiza en el state
    Parametro : fecha seleccionada desde el calendario de DropdownDates
  */
  manejoDeFechas = (fecha) => {
    var fecha1 = formatDate(fecha[0].toString().split(" ", 4));
    var fecha2 = formatDate(fecha[1].toString().split(" ", 4));

    this.setState({primerFecha: fecha1});
    this.setState({segundaFecha: fecha2});
  }
  /* obtiene fechas y da el formato necesario para la consulta del api y lo actualiza en el state
    Parametro : Año seleccionada desde DropdownDates o desde InfoColumnistos
  */
  manejoDeAnio = (anio_dropdown) => {
    this.setState({anio: anio_dropdown});
  }


  render() {
    var graficoSemanaPeriodico = dominioAPI + "api/distribucion_semana_periodico_rango/" + this.state.primerFecha + "/" + this.state.segundaFecha;
    var graficoSemana = dominioAPI + "api/distribucion_semana_rango/" + this.state.primerFecha + "/" + this.state.segundaFecha;
    var distribucionMesAnio = dominioAPI + "api/distribucion_mes_anio/" + this.state.anio;
    var distribucionSemanaAnio = dominioAPI + "api/distribucion_semana_anio/" + this.state.anio;

    return (<div className="container-auto py-0">

      <Navbar seleccionFecha={this.manejoDeFechas} seleccionAnio={this.manejoDeAnio} listaAnios= {this.listaAnios}></Navbar>
      <InfoColumnistos seleccionAnio={this.manejoDeAnio} listaAnios={this.listaAnios} pais={pais}/>
      <GeneralInformation enlace1={artDisponibles} enlace2={autoresDisponibles} enlace3={mesesDisponibles} enlace4={mediosDisponibles}/>

      <div className="d-flex flex-column justify-content-center">

        <div className="row m-lg-5  justify-content-center">
          <div className="col-lg-4">
            <div className="shadow p-3 Promedios_Generales">
              <GraficoPromedioGeneral id="graficogeneral" periodicos={medios} enlace={promediosGenerales} titulo="Promedios generales"/>
            </div>
          </div>
        </div>

        <div className="row  m-lg-5  justify-content-center">
          <div className="col-lg-7">
            <div className="shadow p-3 ">
                <GraficoBarraSemana id="graficosemana"  enlace={graficoSemana} titulo="¿Cómo se distribuyen por dia de la semana?"/>
            </div>
          </div>
        </div>

        <div className="row  m-lg-5  justify-content-center">
          <div className="col-lg-7">
            <div className="shadow p-3 ">
                <GraficoBarra id="semana" periodicos={medios} enlace={graficoSemanaPeriodico} titulo="¿Cómo se distribuye por día de la semana  por periódico?"/>

            </div>
          </div>
        </div>

        <div className="row  m-lg-5 justify-content-center">
          <div className="col-lg-7">
            <div className="shadow p-3">
              <GraficoBarra id="mes"  periodicos={medios} enlace={distribucionMesAnio} titulo="¿Cómo se distribuyen por mes por periódico?"/>
            </div>
          </div>
        </div>

        <div className="row  m-lg-5 justify-content-center">
          <div className="col-lg-7">
            <div className="shadow p-3">
              <GraficoStepLine enlace={distribucionSemanaAnio} id="GraficoStepLine"/>
            </div>
          </div>
        </div>

        <div className="row m-lg-5 justify-content-center">
          <div className="col-lg-4">
            <div className="shadow p-3 ">
              <GraficoDiasSinMujeres id="diasSinMujeres" enlace={diasSinMujeres} enlaceDias={diasDisponibles} enlaceMedio={diasSinMujeresPorMedio} listaMedios={mediosDB} nombresMedios={medios} titulo="Días sin mujeres"/>
            </div>
          </div>
        </div>

      </div>

    </div>)

  }

}

/* brinda el formato de fecha yyyy/mm/dd
parametro -> fecha */
function formatDate(date) {
  var d = new Date(date),
    month = '' + (
    d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

export default App;
