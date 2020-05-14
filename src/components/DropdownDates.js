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

   onChange = date => {
     console.log(date);
     this.setState({ date })

 };



  render() {
    return (<div className="container">

      <div className="row pl-2">

        <div className="custom-control custom-radio ">
          <input type="radio" className="custom-control-input" id="selectorAnioRadioButton" name="defaultExampleRadios"/>
          <label className="custom-control-label" for="defaultUnchecked">Seleccionar año</label>
        </div>
      </div>

      <div className="row pl-2">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary btn-secondary-custom py-0 ">2017</button>
          <button type="button" class="btn btn-secondary btn-secondary-custom py-0">2018</button>
          <button type="button" class="btn btn-secondary btn-secondary-custom py-0">2019</button>
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
    </div>);
  }
}
export default DropdownDates;
