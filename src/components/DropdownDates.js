import React, {Component} from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import '../customCalendar.css';


class DropdownDates extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }


  /* envia al componente navbar el rango de fechas*/
   onChange = date => { 
      this.props.obtenerFecha(date);

 };


 handleId = (e) => {
  this.props.obtenerAnio(e.target.id);
  //console.log(e.target.id);
  //console.log(e.currentTarget.id);
}


  render() {
   
    var listaAnios = ObtenerVariables();
    var items = [];
    for (var i=0; i<listaAnios.length; i++){
      items.push(<button type="button" id={listaAnios[i]} class="btn btn-secondary btn-secondary-custom py-0 " onClick={this.handleId}>{listaAnios[i]}</button>)
    }
    return (
    <div className="container">

      <div className="row pl-2">

        <div className="custom-control custom-radio ">
          <input type="radio" className="custom-control-input" id="selectorAnioRadioButton" name="defaultExampleRadios"/>
          <label className="custom-control-label" for="defaultUnchecked">Seleccionar año</label>
        </div>
      </div>

      <div className="row pl-2">
        <div className="btn-group" role="group" aria-label="Basic example">
          {items}
        </div>

      </div>


      <hr/>

      <div className="row pl-2">

        <div className="custom-control custom-radio">
          <input type="radio" className="custom-control-input" id="selectorRangoRadioButton" name="defaultExampleRadios"/>
          <label className="custom-control-label" for="defaultUnchecked">Seleccionar rango</label>
        </div>
      </div>

      <div className="row pl-2">

          <Calendar
            onChange={this.onChange}
            showNeighboringMonth="false"
            selectRange = "true"
            defaultView = "month"
            locale = "es-419"
            


          />

      </div>
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

export default DropdownDates;
