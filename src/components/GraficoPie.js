import React, { Component } from 'react';
import { Pie} from 'react-chartjs-2';
import '../App.css';
class GraficoPie extends Component {

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
      }
      render(){

        var generoHoy=JSON.parse(ObtenerGeneroHoy());
        var mujeres =generoHoy.data[0].cantidad_articulos_mujeres;
        var hombres=generoHoy.data[0].cantidad_articulos_hombres;
        const state = {
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
          return(
            <div className="App">
            <header className="App-header">
              <h1>prueba</h1>
            </header>
            <article className="canvas-container">
            <Pie
              data={state}
              options={{
                title:{
                  display:true,
                  text:'Cantidad de mujeres y hombres el día de hoy',
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

function ObtenerGeneroHoy() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET',  "https://cors-anywhere.herokuapp.com/" +"https://apicolumnistos.tedic.net/api/fecha_actual",false);
    httpRequest.send();
    return httpRequest.response;
  }

export default GraficoPie;