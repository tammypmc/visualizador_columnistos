import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import '../App.css';
import {descargarImagen} from './utilities'

/* para llamar esta clase
         <GraficoDiasSinMujeres
         enlace="https://apicolumnistos.tedic.net/api/dias_sin_mujeres"
         titulo= "Dias sin mujeres"
         />
*/
class GraficoDiasSinMujeres extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      temp: 0,
      data: [],
      dias: this.ObtenerDias(this.props.enlaceDias)
    };
  }

  componentDidMount() {
    var listaEnlaces = [];
    var enlace = this.props.enlaceMedio;
    for (var i = 0; i < this.props.listaMedios.length; i++) {
      listaEnlaces.push(enlace.concat(this.props.listaMedios[i]));
    }
    var datos = this.ObtenerVariables(this.props.enlace, listaEnlaces, this.props.listaMedios);
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
      <button role="button" className="btn btn-outline-secondary btn-sm  btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(identificador)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>

    </div>);
  }

  ObtenerVariables(consulta, listaEnlaces, listaMedios) {
    var dias = []
    var httpRequest = new XMLHttpRequest();
  
   /* httpRequest.open('GET', consulta, false);
    httpRequest.send();
    var cons = JSON.parse(httpRequest.response);
    dias.push(cons.data[0].dias_sin_mujeres);
    console.log(cons.data);*/

    fetch(consulta)
      .then(res => res.json())
      .then(
        (result) => {
          return dias.push(result.data[0].dias_sin_mujeres);
        }
      )
      //console.log(dias);

  
    for (var i = 0; i < listaEnlaces.length; i++) {
      /*httpRequest.open('GET', listaEnlaces[i], false);
      httpRequest.send();
      var cons = JSON.parse(httpRequest.response);
      dias.push(cons.data[0].dias_sin_mujeres);*/

      fetch(listaEnlaces[i])
      .then(res => res.json())
      .then(
        (result) => {
          return dias.push(result.data[0].dias_sin_mujeres);
        }
      )
    }

    var lista = dias;
  console.log("dias", lista);
    var titulos = ["Total"].concat(listaMedios);
    console.log(dias);
    const data = {
      labels: titulos,
      datasets: [
        {
          label: 'Total: ',
          backgroundColor: 'rgba(165, 76, 120, 1)',
          barThickness: 15,
          data: lista
        }
      ]
    };
  
    return data;
  
  }
  
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
