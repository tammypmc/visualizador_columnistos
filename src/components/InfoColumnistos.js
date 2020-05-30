import React, {Component} from 'react';

class InfoColumnistos extends Component {

  constructor(props) {
    super(props);
    this.anio = 2020;
    this.listaAnios = this.props.listaAnios;
  }

  handleId = (e) => {
    this.props.seleccionAnio(e.target.id);
    this.anio = e.target.id;
  }

  render() {
    var items = [];
    for (var i = 0; i < this.listaAnios.length; i++) {
      items.push(<button className="dropdown-item" id={this.listaAnios[i]} type="button" onClick={this.handleId} key={this.listaAnios[i]}>{this.listaAnios[i]}</button>);
    }

    return (<div className="container p-3">
      <div className="row m-auto justify-content-center">
        <p className="h1">ColumnistOS</p>
      </div>

      <div className="row m-auto justify-content-center">

        <div className="form-group form-inline">
          <p className="h4">¿Cuántas mujeres hay opinando en los medios de {this.props.pais} desde </p>

          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              {this.anio}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              {items}
            </div>
          </div>

          <p className="h4"> ?</p>
        </div>

      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <p className="h6 text-justify">Bot Colmunistos es un programa informático que recorre las secciones de opinión de los sitios Web de medios paraguayos. En su recorrido, recoge todos los artículos publicados solo en esas secciones y arma una base de datos. El programa trata de identificar qué artículos son escritos por mujeres y cuáles por hombres. Cuando no logra diferenciar, porque el nombre es neutro o por algún otro motivo, envía un mensaje a alguien de TEDIC que “le da una mano” para decidir. El bot fue desarrollado por Economía Feminista, una organización amiga de Argentina. Los programadores de TEDIC se encargaron de adaptarlo para que funcione con los medios de difusión de Paraguay.</p>
        </div>
      </div>
    </div>);
  }


}

export default InfoColumnistos;
