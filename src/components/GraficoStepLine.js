import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
import {descargarImagen} from './utilities'
let myLineChart;

/* para llamar esta clase
         <GraficoStepLine enlace={distribucionSemanaAnio} id="GraficoStepLine"/>
*/
class GraficoStepLine extends Component {

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
      data: []
    };
  }


  componentDidMount() {
    this.obtenerInformacion(this.props.enlace);
  }

  /*cada vez que se actualiza la fecha se vuelve a generar los datos de los graficos*/
  /*  parametro: consulta del api actualizada*/
  componentDidUpdate(prevProps, prevState) {
  if (prevProps.data !== this.props) {
    this.obtenerInformacion(this.props.enlace)
  }
}

/*
divide el resultado de la consulta en 2 listas numero de semana y porcentaje de cada una, cada una corresponde,
al label y el dataset del grafico, genera el gráfico ycon "drawOnChartArea" generamos la linea entre cada punto.
Parametro: enlace-> url de la consulta correspondiente distribucion por semana al año proveniente del API.
*/
  obtenerInformacion(enlace){
    fetch(enlace)
      .then(res => res.json())
      .then(
        (result) => {
            var datos = result.data;

            var semana = [];
            var porcentaje = [];

            for (let index = 0; index < datos.length; index++) {
              for (var key in datos[index]) {
                if (key === "semana") {
                  semana.push(datos[index][key]);
                }
                if (key === "porcentaje") {
                  porcentaje.push(datos[index][key]);
                }

              }

            }

            const myChartRef = this.chartRef.current.getContext("2d");


            if (typeof myLineChart !== "undefined")
              myLineChart.destroy();

            myLineChart = new Chart(myChartRef, {
              type: "line",
              data: {
                labels: semana,
                datasets: [
                  {
                    label: "Porcentaje de mujeres",
                    steppedLine: true,
                    data: porcentaje,
                    borderColor: '#495867',
                    fill: false
                  }
                ]
              },
              options: {
                elements: {
                  point: {
                    radius: 0
                  }
                },
                title: {
                  display: true,
                  text: '¿Cómo se distribuye por semana?',
                  fontSize: 20
                },
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    boxWidth: 20
                  }
                },
                plugins: {
                  datalabels: {
                    display: false
                  }
                },
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        drawOnChartArea: true,
                        categorySpacing: 0
                      }
                    }
                  ],
                  yAxes: [
                    {
                      display: true,
                      gridLines: {
                        display: true,
                        drawOnChartArea: true
                      },
                      ticks: {
                        beginAtZero: true,
                        stepSize: 25,
                        max: 50
                      }
                    }
                  ]
                }
              }
            });

        })

  }


  render() {
    var identificador = this.props.id; /*nombre con el que se descargara la imagen*/
    return (<div className="componente_stephline">
      <div className={identificador}>
        <div className={classes.graphContainer}>
          <canvas id="myChart" ref={this.chartRef}/>
        </div>
      </div>
      <button className="btn btn-outline-secondary btn-sm btn-auto btn-iconed btn-rounded" onClick={() => console.log("ici") || descargarImagen(identificador)}>
        <i className="icon ion-md-arrow-down"></i>
        <span className="spn">Descargar</span>
      </button>
    </div>)
  }

}

export default GraficoStepLine;
