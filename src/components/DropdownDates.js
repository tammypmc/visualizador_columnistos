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
  
}


  render() {

    var listaAnios =  this.props.listaAnios;
    var items = [];
    for (var i=0; i<listaAnios.length; i++){
      items.push(<button type="button"  id={listaAnios[i]} className="btn btn-secondary btn-secondary-custom py-0 " onClick={this.handleId} >{listaAnios[i]}</button>)
    }
    return (
    <div className="container">

      <div className="row pl-2">

        <div className="custom-control custom-radio ">
          <input type="radio" className="custom-control-input" id="selectorAnioRadioButton" name="defaultExampleRadios"/>
          <label className="custom-control-label" htmlFor="defaultUnchecked">Seleccionar año</label>
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
          <label className="custom-control-label" htmlFor="defaultUnchecked">Seleccionar rango</label>
        </div>
      </div>

      <div className="row pl-2">

          <Calendar
            onChange={this.onChange}

            selectRange = "true"
            defaultView = "month"
            locale = "es-419"



          />

      </div>
    </div>

    );
  }
}


export default DropdownDates;
