import React, {Component} from 'react';
import GeneralInformation from './components/GeneralInformation';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import GraficoBarra from './components/GraficoBarra';
import GraficoBarraSemana from './components/GraficoBarraSemana';
import GraficoDiasSinMujeres from './components/GraficoDiasSinMujeres';
import GraficoStepLine from './components/GraficoStepLine';
import InfoColumnistos from './components/InfoColumnistos';


class App extends Component {


constructor(props){
    super(props);
    this.state = {
      primerFecha:"2020-05-04",
      segundaFecha:"2020-05-10",
      anio:"2020"
    };
  }

/*obtiene fechas y da el formato necesario para la consulta del api */
  manejoDeFechas = (fecha) => {
    
    var fecha1 = formatDate(fecha[0].toString().split(" ", 4));
    var fecha2 = formatDate(fecha[1].toString().split(" ", 4));
    this.setState({primerFecha: fecha1});
    this.setState({segundaFecha: fecha2});
  }
  manejoDeAnio=(anio_dropdown) =>{
    console.log(anio_dropdown);
    this.setState({anio: anio_dropdown});
  }
  

  render() {
  	var graficoSemanaPeriodico="https://apicolumnistos.tedic.net/api/distribucion_semana_periodico_rango/"+ this.state.primerFecha+"/"+this.state.segundaFecha;
    var graficoSemana= "https://apicolumnistos.tedic.net/api/distribucion_semana_rango/"+ this.state.primerFecha+"/"+this.state.segundaFecha;
    var distribucionMesAnio= "https://apicolumnistos.tedic.net/api/distribucion_mes_anio/"+ this.state.anio;
    var distribucionSemanaAnio= "https://apicolumnistos.tedic.net/api/distribucion_semana_anio/"+this.state.anio;
    return (<div className="container-fluid  p-0">

      <Navbar seleccionFecha={this.manejoDeFechas} seleccionAnio={this.manejoDeAnio}></Navbar>
      <InfoColumnistos/>

      <GeneralInformation enlace1="https://apicolumnistos.tedic.net/api/cantidad_articulos" enlace2="https://apicolumnistos.tedic.net/api/total_autores" enlace3="https://apicolumnistos.tedic.net/api/cantidad_meses" enlace4="https://apicolumnistos.tedic.net/api/cantidad_medios"/>

      <div class="container w-100">

        <div class="row  m-5">
          <div class="shadow w-100 p-3 bg-white">
            <GraficoBarraSemana id="graficosemana" enlace={graficoSemana} titulo="¿Cómo se distribuyen por dia de la semana?"/>
          </div>
        </div>

        <div class="row  m-5">
          <div class="shadow w-100 p-3 bg-white">
            <GraficoBarra id="semana" enlace={graficoSemanaPeriodico} titulo="¿Cómo se distribuye por día de la semana por medio?"/>
          </div>
        </div>

        <div class="row  m-5">
          <div class="shadow w-100 p-3 bg-white">
            <GraficoBarra id="mes" enlace={distribucionMesAnio} titulo="¿Cómo se distribuyen por mes por medio?"/>
          </div>
        </div>
     
        <div class="row  m-5">
          <div class="shadow w-100 p-3 bg-white">
            <GraficoStepLine enlace={distribucionSemanaAnio} id="GraficoStepLine"/>

          </div>
        </div>

        <div className="row  m-5">
          <div className="col-md-6 offset-md-3">
            <div className="shadow p-3 bg-white ">
              <GraficoDiasSinMujeres id="diasSinMujeres" enlace="https://apicolumnistos.tedic.net/api/dias_sin_mujeres" titulo="Días sin mujeres"/>
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
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export default App;
