import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import '../App.css';

/* para llamar esta clase por mes
<GraficoBarra
    id="mes"
    enlace="https://apicolumnistos.tedic.net/api/distribucion_mes_anio/2019"
    titulo="¿Cómo se distribuyen por mes por medio?"
/>
*/
/*para llamar esta clase por semana
      <GraficoBarra
                  id="semana"
              enlace="https://apicolumnistos.tedic.net/api/distribucion_semana_periodico_rango/2020-05-04/2020-05-10"
              titulo="¿Cómo se distribuye por día de la semana por medio?"
              />
*/
class GraficoBarra extends Component {

    constructor(props){
        super(props);
        this.chartReference=React.createRef();
      }

      render(){

        var consulta =ObtenerVariables(this.props.enlace); /*retorna los datos dado el api*/

    
        return(
            <div className="App">
            <header className="App-header">
            
            </header>
            <Bar
            data={consulta.data}
            width={null}
            height={null}
            options={{
              title:{
                display:true,
                text:this.props.titulo,   /* se extrae de de app el titulo del grafico*/
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
            
          </div>
          );

      }

}

/*obtiene la consulta, divide en 3 listas el resultado de la consulta entre el nombre del periodico, los meses o semana
y el porcentaje de cada uno,crea el dataset, le asigna los colores y divide los valores de cada barra */
function ObtenerVariables(consulta){
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', consulta,false);  
    httpRequest.send();
    var periodico=JSON.parse(httpRequest.response);
    var lista_periodico =[];
    var valor=[];
    var llave=[];

    for (var y = 0; y < periodico.data.length; y++) {
      
          for(var key in periodico.data[y]){
            if(key==="site"){
              lista_periodico.push(periodico.data[y][key]);
              
            }else if(llave.includes( key )=== false){
              llave.push(key);
              valor.push(parseInt(periodico.data[y][key]));
            }else{
              valor.push(parseInt (periodico.data[y][key]));
            }
          }
    }

    var nuevo={   
      data:{
        labels:llave,
        datasets:[]
      }
    }


    var valor_por_periodico=0;
    var color=0;
    const COLORS = ['#CE796B','#C18C5D','#495867','#A2C3A4','#C4F1BE']
    for (var i = 0; i < lista_periodico.length; i++) {
      
      var lista_data=[]
      for(var j = 0; j < llave.length; j++){
      lista_data.push(valor[valor_por_periodico]);
      
      valor_por_periodico ++;

        
      }
     
      nuevo.data.datasets[i] = {
        label: lista_periodico[i],
        backgroundColor: COLORS[color],
        borderColor: COLORS[color],
        borderWidth: 1,
        hoverBackgroundColor: COLORS[color],
        hoverBorderColor: COLORS[color],
        data:lista_data
      }
      color ++;
    }   

      return nuevo;
}


export default GraficoBarra;