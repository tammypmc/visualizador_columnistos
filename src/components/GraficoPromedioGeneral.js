import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import '../App.css';
import {descargarImagen} from './utilities'


/* para llamar esta clase
         <GraficoPromedioGeneral
         enlace="https://apicolumnistos.tedic.net/api/periodicos"
         titulo= "Dias sin mujeres"
         />
*/
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

  /*
  Realiza la consulta al API y genera los porcentajes dados los numeros retornados por la consulta.
  Prepara los datos para el grafico y actualiza el state.
  Parametro: Consulta -> url de la consulta correspondiente a promedios generales
  */
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
              /*totalRegistros es una lista de 3 elementos, en la primera posicion tiene el total de registros general, en la segunda posicion
              tiene el total de registros de mujeres y en la tercera de hombres.
              */

              var totalGeneral = (totalRegistros[1] * 100) / totalRegistros[0];
              periodicos.push("Total");
              porcentajes_mujeres.push(totalGeneral.toFixed());

              for (var i = 0; i < datos.length; i++) {
                var total = (datos[i].articulos_mujeres * 100) / (datos[i].articulos_mujeres + datos[i].articulos_hombres);
                porcentajes_mujeres.push(total.toFixed());
                periodicos.push(this.props.periodicos[i])
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

  /*
  Se calcula la cantidad de registros por mujeres, por hombres y en total.
  Parametro: datos -> variable obtenida desde la consulta del API
  Retorno -> totales -> variable que contiene una lista con las cantidades totales de registros de hombres,mujeres y en general
  */
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
