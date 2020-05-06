import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import '../App.css';
class GraficoBarra extends Component {

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
      }

      render(){

        var consulta =ObtenerVariables(this.props.enlace);

        const options = {
            responsive: true,
            legend: {
              display: false
            },
            type: "bar"
         
          };



        return(
            <div className="App">
            <header className="App-header">
            
            </header>
            <article className="canvas-container">
            <Bar
            data={consulta.data}
            width={null}
            height={null}
            options={{
              title:{
                display:true,
                text:'Porcentajes de hoy',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
           
            </article>
            
          </div>
          );

      }

}


function ObtenerVariables(consulta){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',  "https://cors-anywhere.herokuapp.com/" +consulta,false);
    httpRequest.send();
    var generoHoy=JSON.parse(httpRequest.response);
    var lista =[];
    var mujer=[];
    var hombre=[];

    for (var i = 0; i < generoHoy.data.length; i++) {
          for(var key in generoHoy.data[i]){
            if(key=="site" || key== "year"){
              lista.push(generoHoy.data[i][key]);
              
            }else if(key=="articulos_mujeres"|| key== "cantidad_articulos_mujeres"){
              mujer.push(generoHoy.data[i][key]);
            }else{
              hombre.push(generoHoy.data[i][key]);
            }
          }
    }

    var variables = {
        data: {
          labels: lista,
          datasets: [
            {
              label: "Cantidad de Mujeres",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: mujer
            },
  
            {
              label: "Cantidad de Hombres",
              backgroundColor: "rgba(155,231,91,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: hombre
            }
          ]
        }
      };



      return variables;
}



export default GraficoBarra;