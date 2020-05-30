import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import '../App.css';
import {descargarImagen} from './utilities'

class GraficoPromedioGeneral extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    this.state = {
      data: { datasets:[], labels:[] }
    };
  }

  componentDidMount() {
    this.ObtenerPromedios(this.props.enlace);
  }

  render() {
    var identificador = this.props.id;
    return (<div className="componente_general">
      <div className={identificador}>

        <HorizontalBar data={this.state.data} options={{
            responsive: true,
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
                  gridLines: {
                    display: false
                  },
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                    max: 100,
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    display: false
                  },
                  stacked: true
                }
              ]
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
          }}/>

      </div>
      <button className="btn btn-outline-secondary btn-sm btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(identificador)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>
    </div>);
  }

  ObtenerPromedios(consulta) {
    fetch(consulta)
          .then(res => res.json())
          .then(
            (result) => {
              var datos = result.data;

              var periodicos = [];
              var porcentajes_mujeres = [];
              var porcentajes_hombres = [];

              var totalRegistros = this.calcularTotalRegistros(datos);

              var totalGeneral = (totalRegistros[1] * 100) / totalRegistros[0];
              periodicos.push("Total");
              porcentajes_mujeres.push(totalGeneral.toFixed());

              for (var i = 0; i < datos.length; i++) {
                var total = (datos[i].articulos_mujeres * 100) / (datos[i].articulos_mujeres + datos[i].articulos_hombres);
                porcentajes_mujeres.push(total.toFixed());
                periodicos.push(datos[i].site)
              }

              for (var j = 0; j < porcentajes_mujeres.length; j++) {
                porcentajes_hombres.push(100 - porcentajes_mujeres[j])
              }

              const data = {
                labels: periodicos,
                datasets: [
                  {
                    label : 'mujeres',
                    backgroundColor: 'rgba(165, 76, 120, 1)',
                    barThickness: 20,
                    data: porcentajes_mujeres,
                    datalabels: {
                      labels: {
                        color: '#4D4F5C'
                      }
                    }
                  }, {
                    label : 'hombres',
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

              this.setState({data: data});
            }
          )
  }

  calcularTotalRegistros(datos) {
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

}

export default GraficoPromedioGeneral;
