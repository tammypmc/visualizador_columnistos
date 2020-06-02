import React, {Component} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/* para llamar esta clase
          <GeneralInformation enlace1={artDisponibles} enlace2={autoresDisponibles} enlace3={mesesDisponibles} enlace4={mediosDisponibles}/>
*/
class GeneralInformation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notas:0,
      autores: 0,
      tiempo:0,
      medios:0
    };
  }

  componentDidMount() {
    this.ObtenerVariables(this.props.enlace1, this.props.enlace2, this.props.enlace3, this.props.enlace4);

  }

  render() {
    return (
      <div className="d-flex flex-row justify-content-center mb-5">
      <ul className="list-group list-group-horizontal-sm shadow bg-white rounded">
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.notas}</b>
          <br></br>
          Notas recolectadas
        </li>
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.autores}</b>
          <br></br>
          Autores/as recolectados
        </li>
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.tiempo} meses</b>
          <br></br>
          Tiempo de observación
        </li>
        <li className="list-group-item text-secondary border-right-0">
          <b>{this.state.medios} medios</b>
          <br></br>
          Plataformas en observación
        </li>
      </ul>
    </div>)
  }
  /*
    Obtiene los datos de informacion general en la base de datos por medio de consultas al API
    Parametro -> consulta1 -> Url del api correspondiente a cantidad de articulos
                 consulta2 -> Url del api correspondiente a cantidad de autores
                 consulta3 -> Url del api correspondiente a cantidad de meses registrados
                 consulta4 -> Url del api correspondiente a cantidad de medios registrados
    Modifica el state con los resultados
  */
  ObtenerVariables(consulta1, consulta2, consulta3, consulta4) {
    Promise.all([
            fetch(consulta1),
            fetch(consulta2),
            fetch(consulta3),
            fetch(consulta4)
        ])
        .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(),res3.json(), res4.json()]))
        .then(([data1, data2, data3, data4]) => this.setState({
            notas: data1.data[0].cantidad_articulos,
            autores: data2.data[0].cant_autores,
            tiempo: data3.data[0].Meses,
            medios: data4.data[0].medios
        }));
    }

}

export default GeneralInformation;
