import React, { Component } from 'react';
import { Pie} from 'react-chartjs-2';
import '../App.css';

class GraficoPie extends Component {

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
      }

      render(){
      var consulta= ObtenerVariables(this.props.enlace);


          return(

            <article className="canvas-container">
            <Pie
              data={consulta}
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

          );

      }



}


function ObtenerVariables(consulta){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',  "https://cors-anywhere.herokuapp.com/" +consulta,false);
    httpRequest.send();
    var generoHoy=JSON.parse(httpRequest.response);
    var mujeres =generoHoy.data[0].cantidad_articulos_mujeres;
    var hombres=generoHoy.data[0].cantidad_articulos_hombres;
    var variable = {
        labels: ['Cantidad de Mujeres', 'Cantidad de hombres'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#00A6B4',
              '#6800B4'
            ],
            hoverBackgroundColor: [

            '#003350',
            '#35014F'
            ],
            data: [mujeres, hombres]
          }
        ]
      }
      return variable;


}



export default GraficoPie;
