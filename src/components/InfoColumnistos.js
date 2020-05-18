import React, { Component } from 'react';

class InfoColumnistos extends Component {


  handleId = (e) => {
    this.props.seleccionAnio(e.target.id);
    //console.log(e.target.id);
    //console.log(e.currentTarget.id);
  }
  

  render() {

    var listaAnios = ObtenerVariables();
    var items = [];
    for (var i=0; i<listaAnios.length; i++){
      items.push(<button className="dropdown-item" id={listaAnios[i]} type="button"  onClick={this.handleId}>{listaAnios[i]}</button>);
    }

    return (

  <div className="container">
    <h1 className="text-center ">ColumnistOS</h1>

    <div className="col-md-12">
      <div className="form-group form-inline">
        <h3>¿Cuántas mujeres hay opinando en los medios de Argentina desde </h3>

        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            2020
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            {items}
          </div>
        </div>

        <h3>?</h3>

      </div>
      </div>

      <p className=" text-justify .texto-informativo mx-5">Bot Colmunistos es un programa informático que recorre las secciones de opinión de los sitios Web de medios paraguayos. En su recorrido, recoge todos los artículos publicados solo en esas secciones y arma una base de datos. El programa trata de identificar qué artículos son escritos por mujeres y cuáles por hombres. Cuando no logra diferenciar, porque el nombre es neutro o por algún otro motivo, envía un mensaje a alguien de TEDIC que “le da una mano” para decidir. El bot fue desarrollado por Economía Feminista, una organización amiga de Argentina. Los programadores de TEDIC se encargaron de adaptarlo para que funcione con los medios de difusión de Paraguay.</p>

  </div>

    );
  }
}

function ObtenerVariables(){
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', 'https://apicolumnistos.tedic.net/api/anios_disponibles',false);
  httpRequest.send();
  var cons =JSON.parse(httpRequest.response);
  var listaAnios = [];
  for (var i=0; i<cons.data.length; i++){
      listaAnios.push(cons.data[i].anios);
  }

  return listaAnios;
}


export default InfoColumnistos;
