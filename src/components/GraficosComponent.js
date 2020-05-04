import React, { Component } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

class GraficosComponent extends Component {

    constructor(props){
      super(props);
      this.chartReference=React.createRef();
    }
    render() {
      const data = {
        labels: [
          '10/04/2018', '10/05/2018',
          '10/06/2018', '10/07/2018',
          '10/08/2018', '10/09/2018',
          '10/10/2018', '10/11/2018',
          '10/12/2018', '10/13/2018',
          '10/14/2018', '10/15/2018'
        ],
        datasets: [
          {
            label: 'Temperature',
            data: [22,19,27,23,22,24,17,25,23,24,20,19],
            fill: false,          // Don't fill area under the line
            borderColor: 'green'  // Line color
          }
        ]
      }

      return (
          <article className="canvas-container">
            <Line data={data} />
          </article>
      );
    }

    componentDidMount() {
      axios.get( "https://cors-anywhere.herokuapp.com/" +"https://apicolumnistos.tedic.net/api/fecha_actual/")
        .then(res => {
          let obj = res.data.data[0];
          console.log(obj["cantidad_articulos_hombres"]);
        })
    }
}
export default GraficosComponent;
