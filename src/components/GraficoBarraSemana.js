import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import '../App.css';
import {descargarImagen} from './utilities'

/* para llamar esta clase
         <GraficoBarraSemana id="graficosemana"  enlace={graficoSemana} titulo="¿Cómo se distribuyen por dia de la semana?"/>
*/
class GraficoBarraSemana extends Component {

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
    //dentro del state se guardaran los datasets del grafico
    this.state = {
      data: { datasets:[], labels:[] }
    };
  }

  componentDidMount() {
    this.ObtenerVariables(this.props.enlace);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props) {
      this.ObtenerVariables(this.props.enlace)
    }
  }

  render() {
    var identificador = this.props.id;

    return (<div className="componente_barra_semana">

      <div className={identificador}>
        <Bar data={this.state.data} options={{
            events: [],
            title: {
              display: true,
              text: this.props.titulo,
              /* se extrae de de app el titulo del grafico */
              fontSize: 20,
              padding: 20
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
                    drawOnChartArea: false,
                    categorySpacing: 0
                  },
                  stacked: true
                }
              ],
              yAxes: [
                {
                  display: false,
                  gridLines: {
                    display: false,
                    drawOnChartArea: false
                  },
                  stacked: true,
                  ticks: {
                    beginAtZero: true,
                    stepSize: 10,
                    max: 100
                  }
                }
              ]
            },
            plugins: {
              datalabels: {
                formatter: function(value, context) {
                  return value + ' %';
                },
                display: true,
                align: 'start',
                offset : '-20',
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
      <button className="btn btn-outline-secondary btn-sm btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(identificador)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>

    </div>);
  }

  /*
  Realiza la consulta al API de los promedios por semana
  Parametro: Consulta -> url de la consulta correspondiente a distribucion por semana
  Modifica el state
  */
  ObtenerVariables(consulta) {
    fetch(consulta)
      .then(res => res.json())
      .then(
        (result) => {
          var datos = result.data;
          //listaDias se utiliza como referencia para ordenar los datos,
          //ademas como labels del grafico
          var listaDias = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado"
          ];
          //lista que tendra el orden de los dias en la respuesta del API
          var lis = [];
          for (var i = 0; i < datos.length; i++) {;
            lis.push(datos[i].dia);
          }

          //si la respuesta del api no incluye algun dia, se inserta con un 0
          for (var j = 0; j < listaDias.length; j++) {
            if (lis.includes(listaDias[j]) === false) {
              datos.push({dia: listaDias[j], numero: 0});
              lis.push(listaDias[j]);
            }
          }
          //se intercambian los nombres de los dias en la respuesta del api
          //por su correspondiente orden en la semana
          for (var x = 0; x < datos.length; x++) {
            switch (datos[x].dia) {
              case "Domingo":
                datos[x].dia = 0
                break;
              case "Lunes":
                datos[x].dia = 1
                break;
              case "Martes":
                datos[x].dia = 2
                break;
              case "Miercoles":
                datos[x].dia = 3
                break;
              case "Jueves":
                datos[x].dia = 4
                break;
              case "Viernes":
                datos[x].dia = 5
                break;
              case "Sabado":
                datos[x].dia = 6
                break;

            }
          }
          //lista que se utilizara para ordenar los dias de la semana
          var datos_final = [
            0,
            1,
            2,
            3,
            4,
            5,
            6
          ];
          //se ordena la lista por numero de dia
          for (var y = 0; y < datos.length; y++) {
            datos_final[datos[y].dia] = datos[y];
          }

          const data = {
            labels: listaDias,
            datasets: [
              {
                label: "mujeres",
                backgroundColor: 'rgba(165, 76, 120, 1)',
                barThickness: 50,
                data: [
                  datos_final[0].numero.toFixed(0),
                  datos_final[1].numero.toFixed(0),
                  datos_final[2].numero.toFixed(0),
                  datos_final[3].numero.toFixed(0),
                  datos_final[4].numero.toFixed(0),
                  datos_final[5].numero.toFixed(0),
                  datos_final[6].numero.toFixed(0)
                ]
              }, {
                label: "hombres",
                backgroundColor: 'rgba(220, 221, 222, 1)',
                barThickness: 50,
                data: [100,100,100,100,100,100,100],
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

}

export default GraficoBarraSemana;
