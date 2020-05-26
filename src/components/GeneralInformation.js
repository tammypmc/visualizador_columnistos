import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class GeneralInformation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      info: []
    };
  }

  componentDidMount() {
    this.ObtenerVariables(this.props.enlace1, this.props.enlace2, this.props.enlace3, this.props.enlace4);
  }

  render() {
    return (<div className="d-flex flex-row justify-content-center mb-5">
      <ul className="list-group list-group-horizontal-sm shadow bg-white rounded">
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.info[0]}</b>
          <br></br>
          Notas recolectadas
        </li>
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.info[1]}</b>
          <br></br>
          Autores/as recolectados
        </li>
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.info[2]} meses</b>
          <br></br>
          Tiempo de observación
        </li>
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.info[3]} medios</b>
          <br></br>
          Plataformas en observación
        </li>
      </ul>
    </div>)
  }

  ObtenerVariables(consulta1, consulta2, consulta3, consulta4) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', consulta1, false);
    httpRequest.send();
    var cons1 = JSON.parse(httpRequest.response);
    var cantArticulos = cons1.data[0].cantidad_articulos;

    httpRequest.open('GET', consulta2, false);
    httpRequest.send();
    var cons2 = JSON.parse(httpRequest.response);
    var cantAutores = cons2.data[0].cant_autores;

    httpRequest.open('GET', consulta3, false);
    httpRequest.send();
    var cons3 = JSON.parse(httpRequest.response);
    var cantMeses = cons3.data[0].Meses;

    httpRequest.open('GET', consulta4, false);
    httpRequest.send();
    var cons4 = JSON.parse(httpRequest.response);
    var cantMedios = cons4.data[0].medios;

    this.setState({
      info: [cantArticulos, cantAutores, cantMeses, cantMedios]
    })
  }

}

export default GeneralInformation;
