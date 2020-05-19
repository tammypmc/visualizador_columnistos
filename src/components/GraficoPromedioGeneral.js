import React, {
  Component
} from 'react';
import {
  HorizontalBar
} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import '../App.css';

class GraficoPromedioGeneral extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  render() {
    var datos = ObtenerPromedios(this.props.enlace);

    return ( <
      div className = "App" >
      <
      header className = "App-header" >

      <
      /header> <
      HorizontalBar data = {
        datos
      }
      options = {
        {
          responsive: true,
          events: [],
          title: {
            display: true,
            text: this.props.titulo,
            /* se extrae de de app el titulo del grafico*/
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
            xAxes: [{
              gridLines: {
                display: false
              },
              stacked: true,
              ticks: {
                beginAtZero: true,
                max: 100,
                display: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              },
              stacked: true
            }]
          },
          plugins: {
            datalabels: {
              formatter: function(value, context) {
                return value + ' %';
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
        }
      }
      />


      <
      /div>
    );
  }

}



function ObtenerPromedios(consulta) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', consulta, false);
  httpRequest.send();
  var cons = JSON.parse(httpRequest.response);
  var datos = cons.data;
  var periodicos = [];
  var porcentajes_mujeres = [];
  var porcentajes_hombres = [];

  var totalRegistros = calcularTotalRegistros(datos);

  var totalGeneral = (totalRegistros[1] * 100) / totalRegistros[0];
  periodicos.push("Total");
  porcentajes_mujeres.push(totalGeneral.toFixed());

  for (var i = 0; i < datos.length; i++) {
    var total = (datos[i].articulos_mujeres * 100) / (datos[i].articulos_mujeres + datos[i].articulos_hombres);
    porcentajes_mujeres.push(total.toFixed());
    periodicos.push(datos[i].site)
  }

  for (var i = 0; i < porcentajes_mujeres.length; i++) {
    porcentajes_hombres.push(100 - porcentajes_mujeres[i])
  }

  const data = {
    labels: periodicos,
    datasets: [{
        backgroundColor: 'rgba(165, 76, 120, 1)',
        barThickness: 20,
        data: porcentajes_mujeres,
        datalabels: {
          labels: {

            color: '#4D4F5C'
          }
        }
      },
      {
        backgroundColor: 'rgba(220, 221, 222, 1)',
        barThickness: 20,
        data: porcentajes_hombres,
        datalabels: {
          labels: {
            title: null
          }
        }
      }
    ]
  };

  return data;
}

function calcularTotalRegistros(datos) {
  var total = 0;
  var totalH = 0;
  var totalM = 0
  let totales = [];
  for (var i = 0; i < datos.length; i++) {
    total += datos[i].articulos_mujeres;
    total += datos[i].articulos_hombres;

    totalH += datos[i].articulos_hombres;

    totalM += datos[i].articulos_mujeres;

  }
  totales.push(total);
  totales.push(totalM);
  totales.push(totalH);

  return totales;
}





export default GraficoPromedioGeneral;
