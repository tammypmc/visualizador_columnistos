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

const dominioAPI = "https://apicolumnistos.tedic.net/";
const pais = "Paraguay";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      primerFecha: "2020-05-04",
      segundaFecha: "2020-05-10",
      anio: "2020"
    };
  }

  /* obtiene fechas y da el formato necesario para la consulta del api */
  manejoDeFechas = (fecha) => {

    var fecha1 = formatDate(fecha[0].toString().split(" ", 4));
    var fecha2 = formatDate(fecha[1].toString().split(" ", 4));
    this.setState({primerFecha: fecha1});
    this.setState({segundaFecha: fecha2});
    document.getElementById("overlayGraficoBarraSemana").style.display = "initial";
    document.getElementById("overlayGraficoBarra").style.display = "initial";


  }
  manejoDeAnio = (anio_dropdown) => {

    this.setState({anio: anio_dropdown});
    document.getElementById("overlayGraficoBarraSemana").style.display = "block";
    document.getElementById("overlayGraficoBarra").style.display = "block";
    console.log(document.getElementsByTagName("bar").data);

  }

  render() {
    var aniosDisponibles = dominioAPI + "api/anios_disponibles";
    var artDisponibles = dominioAPI + "api/cantidad_articulos";
    var autoresDisponibles = dominioAPI + "api/total_autores";
    var mesesDisponibles = dominioAPI + "api/cantidad_meses";
    var mediosDisponibles = dominioAPI + "api/cantidad_medios";
    var promediosGenerales = dominioAPI + "api/periodicos";
    var graficoSemanaPeriodico = dominioAPI + "api/distribucion_semana_periodico_rango/" + this.state.primerFecha + "/" + this.state.segundaFecha;
    var graficoSemana = dominioAPI + "api/distribucion_semana_rango/" + this.state.primerFecha + "/" + this.state.segundaFecha;
    var distribucionMesAnio = dominioAPI + "api/distribucion_mes_anio/" + this.state.anio;
    var distribucionSemanaAnio = dominioAPI + "api/distribucion_semana_anio/" + this.state.anio;
    var diasSinMujeres = dominioAPI + "api/dias_sin_mujeres";
    var diasDisponibles = dominioAPI + "api/dias_disponibles";
    var diasSinMujeresPorMedio = dominioAPI + "api/dias_sin_mujeres_medio/";

    var medios = ["abc", "lanacionpy", "ultimahora"];

    return (<div className="container-fluid  p-0">

      <Navbar seleccionFecha={this.manejoDeFechas} seleccionAnio={this.manejoDeAnio} enlaceAnios={aniosDisponibles}></Navbar>
      <InfoColumnistos seleccionAnio={this.manejoDeAnio} enlaceAnios={aniosDisponibles} pais={pais}/>
      <GeneralInformation enlace1={artDisponibles} enlace2={autoresDisponibles} enlace3={mesesDisponibles} enlace4={mediosDisponibles}/>

      <div className="container">
        <div className="row  m-auto py-5 justify-content-center">
          <div className="col-m-auto">
            <div className="shadow p-3 ">
              <GraficoPromedioGeneral id="graficogeneral" enlace={promediosGenerales} titulo="Promedios generales"/>
            </div>
          </div>
        </div>

        <div className="row  m-auto py-5">
            <div className="shadow w-100 p-3 bg-white">

              <div id="overlayGraficoBarraSemana">
                <GraficoBarraSemana id="graficosemana" enlace={graficoSemana} titulo="¿Cómo se distribuyen por dia de la semana?"/>
              </div>
            </div>
          </div>

          <div className="row  m-auto py-5">
            <div className="shadow w-100 p-3 bg-white">
                      <div id="overlayGraficoBarra">
                        <GraficoBarra id="semana" enlace={graficoSemanaPeriodico} titulo="¿Cómo se distribuye por día de la semana por medio?"/>

                        </div>

            </div>

          </div>

          <div className="row  m-auto py-5">
            <div className="shadow w-100 p-3 bg-white">
              <GraficoBarra id="mes" enlace={distribucionMesAnio} titulo="¿Cómo se distribuyen por mes por medio?"/>
            </div>
          </div>

          <div className="row  m-auto py-5">
            <div className="shadow w-100 p-3 bg-white">
              <GraficoStepLine enlace={distribucionSemanaAnio} id="GraficoStepLine"/>
            </div>
          </div>

          <div className="row  m-auto py-5 justify-content-center">
            <div className="col-m-auto ">
              <div className="shadow p-3 bg-white ">
                <GraficoDiasSinMujeres id="diasSinMujeres" enlace={diasSinMujeres} enlaceDias={diasDisponibles} enlaceMedio={diasSinMujeresPorMedio} listaMedios={medios} titulo="Días sin mujeres"/>
              </div>
            </div>
          </div>

      </div>

    </div>)

  }

}

/* brinda el formato de fecha yyyy/mm/dd */
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
