import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import '../App.css';
import html2canvas from "html2canvas";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            title:{
                display:true,
                text:this.props.titulo,   /* se extrae de de app el titulo del grafico*/
                fontSize:20
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
           <button role="button" class="btn btn-outline-secondary btn-lg btn-iconed btn-rounded" onClick={() => console.log("") || this.descargarImagen(identificador)}>
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

            data: [dias]
          }
        ]
      };

    return data;


}


export default GraficoDiasSinMujeres;