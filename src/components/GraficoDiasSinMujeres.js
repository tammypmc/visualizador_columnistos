import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import '../App.css';

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

      render(){
        var datos = ObtenerVariables(this.props.enlace);
        console.log(datos.datasets.data)
        return (
            <div className="App">
            <header className="App-header">
            
            </header>
            <article className="canvas-container">
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
           
        </article>
            
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