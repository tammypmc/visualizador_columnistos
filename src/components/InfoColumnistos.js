import React, { Component } from 'react';

class InfoColumnistos extends Component {


  render() {
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
            <button className="dropdown-item" type="button">2019</button>
            <button className="dropdown-item" type="button">2018</button>
            <button className="dropdown-item" type="button">2017</button>
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
export default InfoColumnistos;
