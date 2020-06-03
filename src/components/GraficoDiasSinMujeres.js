import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import '../App.css';
import {descargarImagen} from './utilities'

/* para llamar esta clase
        <GraficoDiasSinMujeres id="diasSinMujeres" enlace={diasSinMujeres}
        enlaceDias={diasDisponibles} enlaceMedio={diasSinMujeresPorMedio}
        listaMedios={mediosDB} nombresMedios={medios} titulo="Días sin mujeres"/>
*/
class GraficoDiasSinMujeres extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      data: { datasets:[], labels:[] },
      dias: this.ObtenerDias(this.props.enlaceDias) //se obtienen la cantidad total de dias por medio del API
    };
  }

  componentDidMount() {
    var listaEnlaces = [];
    var enlace = this.props.enlaceMedio;
    //se crea la lista de enlaces del API con los nombres de los medios que hay que buscar
    //cada enlace tiene forma de {Dominio}/api/dias_sin_mujeres_medio/{medio}
    for (var i = 0; i < this.props.listaMedios.length; i++) {
      listaEnlaces.push(enlace.concat(this.props.listaMedios[i]));
    }
    var datos = this.ObtenerVariables(this.props.enlace, listaEnlaces, this.props.nombresMedios);
    this.setState({data: datos});
  }

  render() {

    var identificador = this.props.id;
    return (<div className="componente_sin_mujeres">

      <div className={identificador}>
        <HorizontalBar data={this.state.data} options={{
            events: [],
            title: {
              display: true,
              text: this.props.titulo,
              /* se extrae de de app el titulo del grafico */
              fontSize: 20
            },
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem) {
                  return tooltipItem.yLabel;
                }
              }
            },
            scales: {
              xAxes: [
                {
                  display: false,
                  gridLines: {
                    display: false,
                    drawOnChartArea: false,
                    categorySpacing: 0
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 50,
                    max: this.state.dias
                  }
                }
              ],
              yAxes: [
                {
                  scaleShowLabels: false,
                  gridLines: {
                    drawOnChartArea: false
                  }
                }
              ]
            },
            plugins: {
              datalabels: {
                formatter: function(value, context) {
                  return value + ' días';
                },
                display: true,
                align: 'end',
                anchor: 'end',
                font: {
                  family: 'Montserrat',
                  style: 'normal',
                  display: 'swap',
                  weight: '500'
                }
              }
            }
          }}/>

      </div>
      <br/>

      <button className="btn btn-outline-secondary btn-sm  btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(identificador)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>

    </div>);
  }
  /*
    Obtiene los dias sin mujeres en la base de datos por medio de consultas al API
    Parametro -> consulta -> Url del api correspondiente a dias totales sin mujeres en la BD
                 listaEnlaces -> lista que contiene los enlaces de cada consulta a cada medio
                 nombresMedios -> lista de los nombres reales de los medios para los labels
    Retorno -> los datasets del grafico
  */
  ObtenerVariables(consulta, listaEnlaces, nombresMedios) {
    var dias = []
    var httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', consulta, false);
    httpRequest.send();
    var cons = JSON.parse(httpRequest.response);
    dias.push(cons.data[0].dias_sin_mujeres);

    for (var i = 0; i < listaEnlaces.length; i++) {
      httpRequest.open('GET', listaEnlaces[i], false);
      httpRequest.send();
      cons = JSON.parse(httpRequest.response);
      dias.push(cons.data[0].dias_sin_mujeres);
    }

    var titulos = ["Total"].concat(nombresMedios);
    const data = {
      labels: titulos,
      datasets: [
        {
          label: 'Total: ',
          backgroundColor: 'rgba(165, 76, 120, 1)',
          barThickness: 15,
          data: dias
        }
      ]
    };

    return data;

  }
  /*
    Obtiene los dias disponibles en la base de datos por medio de una consulta al API
    Parametro -> consulta -> Url del api correspondiente a dias totales en la BD
    Retorno -> cantidad de dias registrados en la BD
  */
  ObtenerDias(consulta) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', consulta, false);
    httpRequest.send();
    var cons = JSON.parse(httpRequest.response);
    var dias = cons.data[0].dias_disponibles;

    return dias;
  }

}


export default GraficoDiasSinMujeres;
