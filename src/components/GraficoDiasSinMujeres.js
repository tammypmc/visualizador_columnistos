import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import '../App.css';
import domtoimage from 'dom-to-image';

/* para llamar esta clase
         <GraficoDiasSinMujeres
         enlace="https://apicolumnistos.tedic.net/api/dias_sin_mujeres"
         titulo= "Dias sin mujeres"
         />
*/
class GraficoDiasSinMujeres extends Component{

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
      }


      descargarImagen(id){
        domtoimage.toBlob(window.document.getElementsByClassName(id)[0])
        .then(function(blob) {
          window.saveAs(blob, id+'.png');
        });
      }

      render(){
        var datos = ObtenerVariables(this.props.enlace);
        var identificador =this.props.id;
        return (
            <div className="App">
            <header className="App-header">
            
            </header>
            <div className= {identificador}>
        <HorizontalBar 
        data={datos} 
        options= {{
          events: [],
            title:{
                display:true,
                text:this.props.titulo,   /* se extrae de de app el titulo del grafico*/
                fontSize:20
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
                    drawOnChartArea: false,
                    categorySpacing: 0
                  },
                  ticks: {
                    beginAtZero: true,
                    stepSize: 50,
                    max: 777
                  }
                }],
                yAxes: [{
                  gridLines: {
                    drawOnChartArea: false
                  }
                }]
              }      
        }}/>

        </div>
        <button role="button" class="btn btn-outline-secondary btn-lg btn-iconed btn-rounded" onClick={() => console.log("ici") || this.descargarImagen(identificador)}>
                  <i class="icon ion-md-arrow-down"></i> <span class="spn">Descargar</span>
            </button>

            
            </div>
          );
      }

}
function ObtenerVariables(consulta){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',  consulta,false);
    httpRequest.send();
    var cons =JSON.parse(httpRequest.response);
    var dias = cons.data[0].dias_sin_mujeres;
    
    const data = {
        labels:["Total de días"],
        datasets: [
          {
            label: 'Total de días: ',
            backgroundColor: 'rgba(165, 76, 120, 1)',
            barThickness: 25,
            data: [dias]
          }
        ]
      };

    return data;


}


export default GraficoDiasSinMujeres;