import React, {Component} from 'react';

class InfoColumnistos extends Component {

  constructor(props){
    super(props);
    this.anio = 2020;
  }
  handleId = (e) => {
    this.props.seleccionAnio(e.target.id);
    this.anio = e.target.id;
  }

  render() {

    var listaAnios = ObtenerVariables(this.props.enlaceAnios);
    var items = [];
    for (var i = 0; i < listaAnios.length; i++) {
      items.push(<button className="dropdown-item" id={listaAnios[i]} type="button" onClick={this.handleId}>{listaAnios[i]}</button>);
    }

    return (<div className="container p-3">
      <div className="row m-auto justify-content-center">
      <p class="h1">ColumnistOS</p>
      </div>

      <div className="row m-auto justify-content-center">
        <div className="col-auto ">
          <div className="form-group form-inline">
            <p class="h3">¿Cuántas mujeres hay opinando en los medios de {this.props.pais} desde
            </p>

            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.anio}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                {items}
              </div>
            </div>
            <p class="h3">?</p>
          </div>
        </div>
      </div>

      <div className="row m-auto justify-content-center">
        <p class="h6 text-justify mx-5 px-auto">Bot Colmunistos es un programa informático que recorre las secciones de opinión de los sitios Web de medios paraguayos. En su recorrido, recoge todos los artículos publicados solo en esas secciones y arma una base de datos. El programa trata de identificar qué artículos son escritos por mujeres y cuáles por hombres. Cuando no logra diferenciar, porque el nombre es neutro o por algún otro motivo, envía un mensaje a alguien de TEDIC que “le da una mano” para decidir. El bot fue desarrollado por Economía Feminista, una organización amiga de Argentina. Los programadores de TEDIC se encargaron de adaptarlo para que funcione con los medios de difusión de Paraguay.</p>
      </div>
    </div>);
  }
}

function ObtenerVariables(consulta) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', consulta, false);
  httpRequest.send();
  var cons = JSON.parse(httpRequest.response);
  var listaAnios = [];
  for (var i = 0; i < cons.data.length; i++) {
    listaAnios.push(cons.data[i].anios);
  }

  return listaAnios;
}

export default InfoColumnistos;
