import React, {Component} from 'react';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../App.css';
import '../customCalendar.css';


class DropdownDates extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.items = [];
    this.listaAnios = this.props.listaAnios;
  }


  /* envia al componente navbar el rango de fechas*/
   onChange = date => {
      this.props.obtenerFecha(date);
   };


   handleId = (e) => {
    this.props.obtenerAnio(e.target.id);

   }

  componentDidMount(){
      for (var i=0; i<this.listaAnios.length; i++){
        this.items.push(<button type="button"  id={this.listaAnios[i]} className="btn btn-secondary btn-secondary-custom py-0 " onClick={this.handleId} key={this.listaAnios[i]} >{this.listaAnios[i]}</button>)
      }
  }


  render() {
    return (
    <div className="container">

      <div className="row p-2 pl-3 justify-content-left">
        <p className = "h6">Seleccionar año</p>
      </div>

      <div className="row pl-2">
        <div className="btn-group" role="group" aria-label="Basic example">
          {this.items}
        </div>

      </div>


      <hr/>

      <div className="row p-2 pl-3  justify-content-left">
        <p className = "h6">Seleccionar fecha</p>
      </div>

      <div className="row pl-2">

          <Calendar
            onChange={this.onChange}

            selectRange = {true}
            defaultView = {'month'}
            locale = {"es-419"}



          />

      </div>
    </div>

    );
  }



}


export default DropdownDates;
