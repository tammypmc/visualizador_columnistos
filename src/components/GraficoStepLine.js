import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import html2canvas from "html2canvas";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from "chart.js";
import classes from "./LineGraph.module.css";
let myLineChart;

class GraficoStepLine extends Component {

    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    componentDidUpdate() {
        this.buildChart();
    }

    
    descargarImagen(id){
        domtoimage.toBlob(window.document.getElementsByClassName(id)[0])
        .then(function(blob) {
          window.saveAs(blob, id+'.png');
        });
      }

    buildChart = () => {

        var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET',this.props.enlace,false);  
        httpRequest.send();
        var datos=JSON.parse(httpRequest.response);
        var lista_datos =[];
        var semana =[];
        var porcentaje =[];
      
    
    
        for (let index = 0; index < datos.data.length; index++) {
            for(var key in datos.data[index]){
                if(key==="semana"){
                    semana.push(datos.data[index][key]);
                }
                if(key==="porcentaje"){
                    porcentaje.push(datos.data[index][key]);
                    }
        
            }
            
        }
        console.log(semana);
        console.log(porcentaje);
        const myChartRef = this.chartRef.current.getContext("2d");
        const { data, average, labels } = this.props;

        if (typeof myLineChart !== "undefined") myLineChart.destroy();

        myLineChart = new Chart(myChartRef, {
            type: "line",
            data: {
                labels: semana,
                datasets: [{
                    label: "Porcentaje de mujeres",
                    steppedLine: true,
                    data: porcentaje,
                    borderColor: '#495867',
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: '¿Cómo se distribuye por semana?',
                }
            }
        });

    }

    render() {
        var identificador =this.props.id;
        return (
            <div className="App">
                <div className= {identificador}>
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
            </div>
            <button role="button" class="btn btn-outline-secondary btn-lg btn-iconed btn-rounded" onClick={() => console.log("ici") || this.descargarImagen(identificador)}>
           <i class="icon ion-md-arrow-down"></i> <span class="spn">Descargar</span>
		</button>
            </div>
        )
    }
  

}



export default GraficoStepLine;     