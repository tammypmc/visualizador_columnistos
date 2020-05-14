import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
import html2canvas from "html2canvas";
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import 'bootstrap/dist/css/bootstrap.min.css';
var CanvasJSChart = CanvasJSReact.CanvasJSChart; 


class Stepline extends Component {


	descargarImagen(id){
		domtoimage.toBlob(window.document.getElementsByClassName(id)[0])
		.then(function(blob) {
		  window.saveAs(blob, id+'.png');
		});
	  }

	

	render() {

		var consulta=ObtenerVariables(this.props.enlace);
		
		const options = {
			theme: "light2",
			animationEnabled: true,
			title:{
				text: this.props.titulo,
				fontSize:20
			},
			axisY:{
				
				includeZero: false
			},
			data: [{
				type: "stepLine",
				xValueFormatString: "porcentaje",
				markerSize: 5,
				dataPoints: consulta
			}]
		}
		var identificador =this.props.id;

		return (
			<div >
				<div className={this.props.id}>
					<div>
					<CanvasJSChart options = {options} 
					/>
					</div>
			
				</div>

				<div>
				
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
    httpRequest.open('GET',consulta,false);  
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


	for(var i=0;i<semana.length;i++) {    
		lista_datos.push({ "semana" : semana[i],"y"  : porcentaje[i] });
	}
	
	
	return lista_datos;

}



export default Stepline;                           